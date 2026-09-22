from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field
import joblib
import pandas as pd

import warnings
warnings.filterwarnings("ignore", category=UserWarning)

from .recommender import recommend_journey


app = FastAPI(
    title="Smart Passenger Recommendation API",
    description="Personalized travel recommendation service with train delay ML predictions",
    version="1.0"
)

# -----------------------------------------
# CORS Middleware
# -----------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------
# Load ML model
# -----------------------------------------
MODEL_PATH = Path(__file__).resolve().parent.parent / "model.pkl"
model = joblib.load(MODEL_PATH)


# -----------------------------------------
# Request & Response Schemas
# -----------------------------------------
class TrainDetails(BaseModel):
    model_config = ConfigDict(extra="allow")

    eta: str = Field(default="09:26", description="Scheduled train arrival time (HH:MM)")
    fare: float = Field(default=40.0, description="Train ticket fare")
    current_delay: float = Field(default=10.0, description="Current delay in minutes")
    historical_delay: float = Field(default=15.0, description="Historical average delay in minutes")
    weather: float = Field(default=0.0, description="Weather severity condition (e.g. 0.0=clear, 1.0=rain/storm)")
    congestion: float = Field(default=1.0, description="Route congestion level (e.g. 0=low, 1=medium, 2=high)")
    predicted_delay: Optional[float] = Field(default=None, description="Optional pre-computed delay; if omitted, ML model predicts it")


class BusDetails(BaseModel):
    model_config = ConfigDict(extra="allow")

    eta: str = Field(default="08:50", description="Scheduled bus arrival time (HH:MM)")
    fare: float = Field(default=30.0, description="Bus ticket fare")
    predicted_delay: Optional[float] = Field(default=0.0, description="Bus delay in minutes")


class UserPreferences(BaseModel):
    model_config = ConfigDict(extra="allow")

    deadline: str = Field(default="09:00", description="Passenger arrival deadline (HH:MM)")
    budget: float = Field(default=50.0, description="Maximum travel budget")


class JourneyRecommendationRequest(BaseModel):
    model_config = ConfigDict(
        extra="allow",
        json_schema_extra={
            "example": {
                "train": {
                    "eta": "09:26",
                    "fare": 40.0,
                    "current_delay": 10.0,
                    "historical_delay": 15.0,
                    "weather": 0.0,
                    "congestion": 1.0
                },
                "bus": {
                    "eta": "08:50",
                    "fare": 30.0
                },
                "user": {
                    "deadline": "09:00",
                    "budget": 50.0
                }
            }
        }
    )

    train: TrainDetails = Field(default_factory=TrainDetails)
    bus: BusDetails = Field(default_factory=BusDetails)
    user: UserPreferences = Field(default_factory=UserPreferences)


class JourneyRecommendationResponse(BaseModel):
    recommended_mode: str = Field(..., description="Recommended travel mode ('TRAIN' or 'BUS')")
    predicted_train_delay: float = Field(..., description="Estimated train delay in minutes")
    predicted_train_arrival: str = Field(..., description="Estimated arrival time of train (HH:MM)")
    train_score: float = Field(..., description="Calculated score for train option")
    bus_score: float = Field(..., description="Calculated score for bus option")
    confidence: float = Field(..., description="Confidence score between 0.0 and 1.0")
    reason: str = Field(..., description="Detailed explanation of the recommendation")


# -----------------------------------------
# Endpoints
# -----------------------------------------
@app.get("/")
def home():
    return {
        "message": "Recommendation API is running",
        "status": "success",
        "docs_url": "/docs"
    }


@app.post("/recommend", response_model=JourneyRecommendationResponse)
def recommendation(payload: JourneyRecommendationRequest = JourneyRecommendationRequest()):
    try:
        train_data = payload.train.model_dump()
        bus_data = payload.bus.model_dump()
        user_data = payload.user.model_dump()

        # If predicted_delay was not provided, compute it using the trained ML model
        if train_data.get("predicted_delay") is None:
            features_df = pd.DataFrame([{
                "current_delay": float(train_data.get("current_delay", 0.0)),
                "historical_delay": float(train_data.get("historical_delay", 0.0)),
                "weather": float(train_data.get("weather", 0.0)),
                "congestion": float(train_data.get("congestion", 0.0))
            }])
            predicted_delay = float(model.predict(features_df)[0])
            train_data["predicted_delay"] = predicted_delay

        result = recommend_journey(
            train=train_data,
            bus=bus_data,
            user=user_data
        )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "error": str(e),
                "error_type": type(e).__name__
            }
        )