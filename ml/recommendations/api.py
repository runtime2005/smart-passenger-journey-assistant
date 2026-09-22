from fastapi import FastAPI
from .recommender import recommend_journey


app = FastAPI(
    title="Smart Passenger Recommendation API",
    description="Personalized travel recommendation service",
    version="1.0"
)


@app.get("/")
def home():

    return {
        "message": "Recommendation API is running",
        "status": "success"
    }


@app.post("/recommend")
def recommendation(data: dict):

    train = data["train"]

    bus = data["bus"]

    user = data["user"]

    result = recommend_journey(
        train=train,
        bus=bus,
        user=user
    )

    return result