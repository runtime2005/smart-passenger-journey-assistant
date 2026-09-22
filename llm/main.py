from llm_service import ask_assistant


print("🚆 Smart Passenger Journey Assistant")
print("Type 'exit' to stop.\n")


while True:

    user_message = input("You: ")

    if user_message.lower() == "exit":
        break

    answer = ask_assistant(user_message)

    print("\nAssistant:")
    print(answer)
    print()