# Multimodal Chatbot

AI chatbot with text and image support using GPT-4 Vision.

## Tech Stack
- FastAPI + Python 3.9+
- React 18 + TypeScript
- OpenAI GPT-4 Vision
- SQLite Database

## Setup

### Backend
```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add OPENAI_API_KEY
python run.py
```

### Frontend
```
cd frontend
npm install
npm start
```

## URLs
- Frontend: http://localhost:3000
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
