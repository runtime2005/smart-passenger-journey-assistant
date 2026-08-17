from fastapi import FastAPI
import joblib
import pandas as pd
from pathlib import Path


# ==========================================
# CREATE FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="Smart Passenger Journey Assistant",
    description="Train delay prediction API",
    version="1.0"
)


# ==========================================
# FIND MODEL
# ==========================================

MODEL_PATH = Path(__file__).resolve().parent.parent / "model.pkl"


# ==========================================
# LOAD TRAINED MODEL
# ==========================================

model = joblib.load(MODEL_PATH)


# ==========================================
# HOME ENDPOINT
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Train Delay ML API is running",
        "status": "success"
    }


# ==========================================
# PREDICT DELAY
# ==========================================

@app.post("/predict-delay")
def predict_delay(data: dict):

    # Create input DataFrame

    input_data = pd.DataFrame([
        {
            "current_delay": data["current_delay"],
            "historical_delay": data["historical_delay"],
            "weather": data["weather"],
            "congestion": data["congestion"]
        }
    ])


    # Make prediction

    prediction = model.predict(input_data)[0]


    # Round prediction

    predicted_delay = round(float(prediction), 2)


    # Return response

    return {
        "current_delay": data["current_delay"],
        "predicted_delay": predicted_delay,
        "unit": "minutes"
    }