def find_disruptions(trains, buses):
    disruptions = []

    for train in trains:
        if train["status"].lower() != "on time":
            disruptions.append({
                "type": "train",
                "service_id": train["id"],
                "service_name": train["name"],
                "status": train["status"],
                "delay_minutes": train["delay_minutes"]
            })

    for bus in buses:
        if bus["status"].lower() != "on time":
            disruptions.append({
                "type": "bus",
                "service_id": bus["id"],
                "service_name": bus["name"],
                "status": bus["status"],
                "delay_minutes": bus["delay_minutes"]
            })

    return disruptions