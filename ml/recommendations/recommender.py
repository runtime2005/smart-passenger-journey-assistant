from datetime import datetime, timedelta


def time_to_minutes(time_string):
    """
    Convert HH:MM into minutes from midnight.
    """
    time = datetime.strptime(str(time_string).strip(), "%H:%M")
    return time.hour * 60 + time.minute


def minutes_to_time(minutes):
    """
    Convert minutes from midnight back to HH:MM.
    """
    total_minutes = int(round(float(minutes))) % (24 * 60)

    hours = total_minutes // 60
    mins = total_minutes % 60

    return f"{hours:02d}:{mins:02d}"


def format_duration(minutes):
    """
    Format minute count into human-readable duration (e.g. '1 hr 49 min' or '35 min').
    """
    total = int(round(abs(minutes)))
    hrs = total // 60
    mins = total % 60
    if hrs > 0 and mins > 0:
        return f"{hrs} hr {mins} min"
    elif hrs > 0:
        return f"{hrs} hr"
    else:
        return f"{mins} min"


def calculate_option_score(
    eta,
    fare,
    deadline,
    budget,
    predicted_delay=0.0
):
    """
    Calculate a normalized 0-100 score for a travel option.
    Higher score = better option.
    """
    eta_minutes = time_to_minutes(eta)
    deadline_minutes = time_to_minutes(deadline)
    fare = float(fare)
    budget = float(budget)
    predicted_delay = float(predicted_delay)

    predicted_arrival = eta_minutes + predicted_delay

    raw_score = 100.0

    # 1. Punctuality relative to deadline
    if predicted_arrival <= deadline_minutes:
        early_minutes = deadline_minutes - predicted_arrival
        raw_score += min(early_minutes * 0.5, 15.0)
    else:
        late_minutes = predicted_arrival - deadline_minutes
        # Continuous lateness penalty without arbitrary low cap
        raw_score -= (30.0 + late_minutes * 0.8)

    # 2. Budget
    if fare > budget:
        over = fare - budget
        raw_score -= (20.0 + over * 1.5)
    else:
        savings = budget - fare
        raw_score += min(savings * 0.3, 10.0)

    # 3. Delay volatility penalty
    raw_score -= min(predicted_delay * 0.25, 15.0)

    # Normalize to 0..100
    if raw_score >= 100.0:
        normalized = 99.0
    elif raw_score >= 0.0:
        normalized = 20.0 + (raw_score / 100.0) * 79.0
    else:
        normalized = 20.0 / (1.0 + abs(raw_score) / 40.0)

    return round(normalized, 2)


def recommend_journey(train, bus, user):
    train_delay = float(train.get("predicted_delay", 0.0))
    bus_delay = float(bus.get("predicted_delay", 0.0))

    train_score = calculate_option_score(
        eta=train["eta"],
        fare=train["fare"],
        deadline=user["deadline"],
        budget=user["budget"],
        predicted_delay=train_delay
    )

    bus_score = calculate_option_score(
        eta=bus["eta"],
        fare=bus["fare"],
        deadline=user["deadline"],
        budget=user["budget"],
        predicted_delay=bus_delay
    )

    train_eta_min = time_to_minutes(train["eta"])
    bus_eta_min = time_to_minutes(bus["eta"])
    deadline_min = time_to_minutes(user["deadline"])

    train_arrival_min = train_eta_min + train_delay
    bus_arrival_min = bus_eta_min + bus_delay

    predicted_train_arrival = minutes_to_time(train_arrival_min)
    predicted_bus_arrival = minutes_to_time(bus_arrival_min)

    train_late = train_arrival_min > deadline_min
    bus_late = bus_arrival_min > deadline_min

    # Decide recommendation based on scores
    if train_score >= bus_score:
        recommended = "TRAIN"
    else:
        recommended = "BUS"

    # Construct contextual, intelligent reason
    deadline_str = user["deadline"]

    if train_late and bus_late:
        # Both options miss deadline
        if recommended == "TRAIN":
            diff = bus_arrival_min - train_arrival_min
            if diff > 0:
                diff_str = format_duration(diff)
                reason = (
                    f"Both options are expected to miss your {deadline_str} deadline, "
                    f"but the train is the best choice because it arrives at {predicted_train_arrival}, "
                    f"getting you there {diff_str} earlier than the bus ({predicted_bus_arrival})."
                )
            else:
                reason = (
                    f"Both options will miss your {deadline_str} deadline. The train is recommended "
                    f"for arriving at {predicted_train_arrival} with a lower fare (${train['fare']} vs ${bus['fare']})."
                )
        else:
            diff = train_arrival_min - bus_arrival_min
            if diff > 0:
                diff_str = format_duration(diff)
                reason = (
                    f"Both options are expected to miss your {deadline_str} deadline, "
                    f"but the bus is the better choice because it arrives at {predicted_bus_arrival}, "
                    f"getting you there {diff_str} earlier than the train ({predicted_train_arrival})."
                )
            else:
                reason = (
                    f"Both options will miss your {deadline_str} deadline. The bus is recommended "
                    f"for arriving at {predicted_bus_arrival} with a lower fare (${bus['fare']} vs ${train['fare']})."
                )

    elif not train_late and bus_late:
        # Train on time, bus late
        reason = (
            f"The train is recommended because it arrives on time at {predicted_train_arrival} "
            f"(before your {deadline_str} deadline), whereas the bus arrives late at {predicted_bus_arrival}."
        )

    elif train_late and not bus_late:
        # Bus on time, train late
        reason = (
            f"The bus is recommended because it arrives at {predicted_bus_arrival} "
            f"before your {deadline_str} deadline, avoiding the train's estimated "
            f"{train_delay:.1f} minute delay (arriving at {predicted_train_arrival})."
        )

    else:
        # Both on time
        if recommended == "TRAIN":
            if train_arrival_min < bus_arrival_min:
                diff_str = format_duration(bus_arrival_min - train_arrival_min)
                reason = (
                    f"Both options arrive before your {deadline_str} deadline. "
                    f"The train arrives {diff_str} earlier at {predicted_train_arrival} (bus arrives at {predicted_bus_arrival})."
                )
            else:
                reason = (
                    f"Both options arrive on time before {deadline_str}. "
                    f"The train is recommended as the better overall choice for fare and schedule."
                )
        else:
            if bus_arrival_min < train_arrival_min:
                diff_str = format_duration(train_arrival_min - bus_arrival_min)
                reason = (
                    f"Both options arrive before your {deadline_str} deadline. "
                    f"The bus arrives {diff_str} earlier at {predicted_bus_arrival} (train arrives at {predicted_train_arrival})."
                )
            else:
                reason = (
                    f"Both options arrive on time before {deadline_str}. "
                    f"The bus is recommended for saving on fare (${bus['fare']} vs ${train['fare']})."
                )

    # Confidence calculation based on score difference
    margin = abs(train_score - bus_score)
    confidence = round(min(0.50 + (margin / 50.0) * 0.45, 0.99), 2)

    return {
        "recommended_mode": recommended,
        "predicted_train_delay": round(train_delay, 2),
        "predicted_train_arrival": predicted_train_arrival,
        "train_score": train_score,
        "bus_score": bus_score,
        "confidence": confidence,
        "reason": reason
    }


if __name__ == "__main__":
    sample_train = {
        "eta": "09:26",
        "predicted_delay": 35.07,
        "fare": 40
    }

    sample_bus = {
        "eta": "11:50",
        "fare": 30
    }

    sample_user = {
        "deadline": "09:00",
        "budget": 50
    }

    result = recommend_journey(
        sample_train,
        sample_bus,
        sample_user
    )

    print("======================================")
    print("USER TEST CASE (TRAIN SHOULD WIN)")
    print("======================================")
    print("Recommended:", result["recommended_mode"])
    print("Train Score:", result["train_score"])
    print("Bus Score:", result["bus_score"])
    print("Predicted Arrival:", result["predicted_train_arrival"])
    print("Confidence:", result["confidence"])
    print("Reason:", result["reason"])