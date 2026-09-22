from datetime import datetime


def time_to_minutes(time_string):
    """
    Convert HH:MM into minutes from midnight.
    """

    time = datetime.strptime(time_string, "%H:%M")

    return time.hour * 60 + time.minute


def calculate_option_score(
    eta,
    fare,
    deadline,
    budget,
    predicted_delay=0
):
    """
    Calculate a score for a travel option.
    Higher score = better option.
    """

    eta_minutes = time_to_minutes(eta)
    deadline_minutes = time_to_minutes(deadline)

    score = 100

    # Arrival deadline
    if eta_minutes > deadline_minutes:
        score -= 60
    else:
        early_minutes = deadline_minutes - eta_minutes
        score += min(early_minutes, 30)

    # Budget
    if fare > budget:
        score -= 30
    else:
        score += 10

    # Delay penalty
    score -= predicted_delay * 0.5

    return score


def recommend_journey(train, bus, user):

    train_score = calculate_option_score(
        eta=train["eta"],
        fare=train["fare"],
        deadline=user["deadline"],
        budget=user["budget"],
        predicted_delay=train["predicted_delay"]
    )

    bus_score = calculate_option_score(
        eta=bus["eta"],
        fare=bus["fare"],
        deadline=user["deadline"],
        budget=user["budget"],
        predicted_delay=0
    )

    deadline = user["deadline"]

    if train_score >= bus_score:

        recommended = "TRAIN"

        reason = (
            f"Your train is expected to arrive at {train['eta']} "
            f"with a predicted delay of {train['predicted_delay']} minutes. "
            f"The train is currently the better option for your "
            f"{deadline} deadline."
        )

        score = train_score

    else:

        recommended = "BUS"

        reason = (
            f"Your train is predicted to arrive at {train['eta']} "
            f"with a delay of approximately {train['predicted_delay']} minutes. "
            f"The bus arrives at {bus['eta']}, making it a better option "
            f"for your {deadline} deadline."
        )

        score = bus_score

    return {
        "recommended_mode": recommended,
        "train_score": round(train_score, 2),
        "bus_score": round(bus_score, 2),
        "confidence": round(min(max(score / 100, 0), 1), 2),
        "reason": reason
    }

# Test when running this file directly
if __name__ == "__main__":

    train = {
        "eta": "09:26",
        "predicted_delay": 36,
        "fare": 40
    }

    bus = {
        "eta": "08:50",
        "fare": 30
    }

    user = {
        "deadline": "09:00",
        "budget": 50
    }

    result = recommend_journey(
        train,
        bus,
        user
    )

    print("======================================")
    print("SMART JOURNEY RECOMMENDATION")
    print("======================================")

    print("Recommended:", result["recommended_mode"])
    print("Train Score:", result["train_score"])
    print("Bus Score:", result["bus_score"])
    print("Confidence:", result["confidence"])
    print("Reason:", result["reason"])