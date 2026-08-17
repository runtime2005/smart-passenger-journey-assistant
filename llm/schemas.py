from typing import Optional
from pydantic import BaseModel


class PassengerIntent(BaseModel):
    intent: str
    source: Optional[str] = None
    destination: Optional[str] = None
    arrival_before: Optional[str] = None
    train_id: Optional[str] = None