from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from app.database import init_db
from app.routes import chat, health

load_dotenv()

app = FastAPI(title="Multimodal Chatbot API", version="1.0.0")

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in cors_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()
app.include_router(health.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "Multimodal Chatbot API", "docs": "/docs"}
