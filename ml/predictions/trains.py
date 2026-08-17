import pandas as pd
import joblib

from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score


# ==========================================
# 1. LOAD DATA
# ==========================================


BASE_DIR = Path(__file__).resolve().parents[2]

DATA_PATH = BASE_DIR / "data" / "simulation" / "train.delays.csv"

print("Dataset path:", DATA_PATH)
print("File exists:", DATA_PATH.exists())

df = pd.read_csv(DATA_PATH)

print("======================================")
print("TRAIN DELAY PREDICTION MODEL")
print("======================================")

print("\nDataset loaded successfully!")
print("Number of rows:", len(df))

print("\nFirst 5 rows:")
print(df.head())


# ==========================================
# 2. SELECT FEATURES
# ==========================================

features = [
    "current_delay",
    "historical_delay",
    "weather",
    "congestion"
]

X = df[features]

# Target we want to predict
y = df["final_delay"]


# ==========================================
# 3. SPLIT DATA
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# ==========================================
# 4. CREATE ML MODEL
# ==========================================

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)


# ==========================================
# 5. TRAIN MODEL
# ==========================================

print("\nTraining model...")

model.fit(X_train, y_train)

print("Model trained successfully!")


# ==========================================
# 6. TEST MODEL
# ==========================================

predictions = model.predict(X_test)


# ==========================================
# 7. EVALUATE MODEL
# ==========================================

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\n======================================")
print("MODEL PERFORMANCE")
print("======================================")

print("Mean Absolute Error:", round(mae, 2), "minutes")
print("R2 Score:", round(r2, 2))


# ==========================================
# 8. SAVE MODEL
# ==========================================

MODEL_PATH = "model.pkl"

joblib.dump(model, MODEL_PATH)

print("\n======================================")
print("MODEL SAVED")
print("======================================")

print("Saved as:", MODEL_PATH)