def plan_journey(source, destination, arrival_before):

    # SIMULATED DATA FOR PROTOTYPE
    return {
        "source": source,
        "destination": destination,
        "arrival_before": arrival_before,

        "train": {
            "status": "Delayed",
            "delay_minutes": 35,
            "predicted_delay_minutes": 42,
            "eta": "09:27"
        },

        "alternative": {
            "mode": "Bus",
            "eta": "08:47",
            "cost": "35"
        },

        "recommendation": {
            "mode": "Bus",
            "time_saved_minutes": 40,
            "reason": "Train delay makes the bus faster"
        }
    }
    {
    "type": "function",
    "function": {
        "name": "search_policy",
        "description": "Search railway policy documents for passenger rules, refunds, cancellations, luggage, safety or accessibility information.",
        "parameters": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The passenger's railway policy question"
                }
            },
            "required": ["query"]
        }
    }
}