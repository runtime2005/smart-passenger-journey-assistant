import os
import json

from dotenv import load_dotenv
from openai import OpenAI

from tools import plan_journey
from rag import search_policy


load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "plan_journey",
            "description": "Find the best journey option for a passenger.",
            "parameters": {
                "type": "object",
                "properties": {
                    "source": {
                        "type": "string"
                    },
                    "destination": {
                        "type": "string"
                    },
                    "arrival_before": {
                        "type": "string"
                    }
                },
                "required": [
                    "source",
                    "destination",
                    "arrival_before"
                ]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_policy",
            "description": "Search railway policy documents for refunds, cancellations, luggage, accessibility and passenger rules.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string"
                    }
                },
                "required": [
                    "query"
                ]
            }
        }
    }
]


SYSTEM_PROMPT = """
You are a Smart Passenger Journey Assistant.

Your job is to help passengers with travel planning,
disruptions and railway information.

IMPORTANT:
- Never invent train delays, bus timings, costs or ETAs.
- Use plan_journey when the user asks about planning a journey
  or finding an alternative.
- Use search_policy when the user asks about railway rules,
  refunds, cancellations, luggage or passenger policies.
- Tool results are the source of truth.
- After receiving a tool result, explain it naturally.
- Tell the user that transport information is simulated
  when using the prototype data.
"""


def ask_assistant(user_message):

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role": "user",
            "content": user_message
        }
    ]

    # FIRST LLM CALL
    response = client.chat.completions.create(
        model="openrouter/free",
        messages=messages,
        tools=TOOLS,
        tool_choice="auto"
    )

    assistant_message = response.choices[0].message

    # LLM decided to use a tool
    if assistant_message.tool_calls:

        messages.append(assistant_message)

        for tool_call in assistant_message.tool_calls:

            arguments = json.loads(
                tool_call.function.arguments
            )

            # Journey planning tool
            if tool_call.function.name == "plan_journey":

                result = plan_journey(
                    arguments["source"],
                    arguments["destination"],
                    arguments["arrival_before"]
                )

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result)
                })

            # Railway policy RAG tool
            elif tool_call.function.name == "search_policy":

                result = search_policy(
                    arguments["query"]
                )

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": result
                })

        # SECOND LLM CALL
        final_response = client.chat.completions.create(
            model="openrouter/free",
            messages=messages
        )

        return final_response.choices[0].message.content

    # No tool required
    return assistant_message.content