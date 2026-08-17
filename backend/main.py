from fastapi import FastAPI
from data import trains, buses
from disruption import find_disruptions

app = FastAPI(title="Smart Passenger Journey Assistant")


@app.get("/")
def home():
    return {
        "message": "Smart Passenger Journey Assistant API is running"
    }


@app.get("/journey")
def get_journey(source: str, destination: str):

    train_options = [
        train for train in trains
        if train["source"].lower() == source.lower()
        and train["destination"].lower() == destination.lower()
    ]

    bus_options = [
        bus for bus in buses
        if bus["source"].lower() == source.lower()
        and bus["destination"].lower() == destination.lower()
    ]

    return {
        "source": source,
        "destination": destination,
        "trains": train_options,
        "buses": bus_options
    }
@app.get("/disruptions")
def get_disruptions():
    disruptions = find_disruptions(trains, buses)

    return {
        "count": len(disruptions),
        "disruptions": disruptions
    }
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "Smart Passenger Journey Assistant"
    }