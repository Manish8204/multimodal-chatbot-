from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    image_url: Optional[str] = None

class MessageResponse(BaseModel):
    role: str
    content: str
    image_url: Optional[str] = None
    created_at: datetime

class HealthResponse(BaseModel):
    status: str
    message: str
