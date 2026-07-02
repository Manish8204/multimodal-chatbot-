from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import MessageRequest, MessageResponse
from app.models import ChatMessage, ChatSession
from app.database import get_db
from app.services.openai_service import process_message
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.post("/message", response_model=MessageResponse)
async def send_message(request: MessageRequest, db: Session = Depends(get_db)):
    session_id = request.session_id or str(uuid.uuid4())
    session = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
    if not session:
        session = ChatSession(session_id=session_id)
        db.add(session)
        db.commit()
    user_msg = ChatMessage(session_id=session_id, role="user", content=request.message, image_url=request.image_url)
    db.add(user_msg)
    db.commit()
    try:
        response = await process_message(request.message, request.image_url, session_id)
        assistant_msg = ChatMessage(session_id=session_id, role="assistant", content=response)
        db.add(assistant_msg)
        db.commit()
        return MessageResponse(role="assistant", content=response, created_at=datetime.utcnow())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{session_id}")
async def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    session = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    messages = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).all()
    return {"session_id": session_id, "messages": messages}

@router.post("/new-session")
async def create_new_session():
    return {"session_id": str(uuid.uuid4())}
