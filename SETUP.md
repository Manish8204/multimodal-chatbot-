# COMPLETE SETUP & TESTING GUIDE

## ✅ Project Status: READY TO RUN

All 27 files successfully pushed to GitHub.
Repo: https://github.com/Manish8204/multimodal-chatbot-

---

## 🚀 STEP 1: BACKEND SETUP (Python)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate venv
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy env file
cp .env.example .env

# IMPORTANT: Edit .env and add your OpenAI API key
# nano .env  (or use your editor)
# Change: OPENAI_API_KEY=sk-your-actual-key-here
```

### Start Backend Server
```bash
python run.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Test Backend Health
Open in browser or terminal:
```bash
curl http://localhost:8000/health
```

**Expected Response:**
```json
{"status":"healthy","message":"Chatbot running"}
```

### View API Docs
Open: http://localhost:8000/docs

---

## 🚀 STEP 2: FRONTEND SETUP (React)

**In a NEW terminal** (keep backend running):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start dev server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view multimodal-chatbot in the browser.

  Local:            http://localhost:3000
```

Browser will open automatically at: http://localhost:3000

---

## ✅ STEP 3: TEST THE CHATBOT

### Test 1: Simple Text Chat
1. Open http://localhost:3000
2. Type: "Hello! What's your name?"
3. Click Send button (or press Enter)
4. **Expected:** AI responds with a greeting

### Test 2: Image Upload + Analysis
1. Click 📷 (camera icon)
2. Select any image from your computer
3. Type: "What's in this image?"
4. Click Send
5. **Expected:** AI analyzes the image and describes it

### Test 3: Chat History
- All messages stay in chat during session
- Refresh page → Session ID persists (stored in localStorage)
- Open new browser tab → New session ID

### Test 4: API Direct Test
```bash
# Test without image
curl -X POST http://localhost:8000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What is AI?"}'

# Test with image URL
curl -X POST http://localhost:8000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Describe this image",
    "image_url": "https://via.placeholder.com/300"
  }'
```

---

## 🔧 KEY FILES STRUCTURE

```
multimodal-chatbot-/
├── backend/
│   ├── app/
│   │   ├── main.py          (FastAPI app setup)
│   │   ├── models.py        (Database models)
│   │   ├── schemas.py       (Request/Response schemas)
│   │   ├── database.py      (SQLite config)
│   │   ├── routes/
│   │   │   ├── chat.py      (Chat endpoints)
│   │   │   └── health.py    (Health check)
│   │   └── services/
│   │       └── openai_service.py  (GPT-4 Vision logic)
│   ├── run.py               (Entry point)
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx          (Main component)
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx
│   │   │   └── MessageInput.tsx
│   │   ├── store/
│   │   │   └── chatStore.ts (Zustand state)
│   │   ├── api/
│   │   │   └── chatApi.ts   (API calls)
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.tsx        (React entry)
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🔑 ENVIRONMENT VARIABLES

### Backend `.env`
```
OPENAI_API_KEY=sk-xxxxxxxxxxxx  (Required!)
DATABASE_URL=sqlite:///./chat.db
DEBUG=true
PORT=8000
CORS_ORIGINS=http://localhost:3000
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:8000
```

---

## 🛠️ TROUBLESHOOTING

### Backend won't start
**Error:** `OPENAI_API_KEY not set`
- **Fix:** Add your actual OpenAI API key to `backend/.env`
- Get key from: https://platform.openai.com/api-keys

**Error:** `Port 8000 already in use`
- **Fix:** Change PORT in `.env` to 8001, 8002, etc.

### Frontend shows "Cannot reach backend"
- **Check:** Is backend running on http://localhost:8000?
- **Check:** Is `REACT_APP_API_URL` set correctly in frontend `.env`?
- **Fix:** Restart frontend after changing `.env`

### Image upload not working
- **Check:** Image must be < 20MB
- **Check:** Supported formats: JPG, PNG, GIF, WebP

### GPT-4 Vision model not available
- **Error:** `gpt-4-vision-preview not found`
- **Fallback:** Code automatically switches to `gpt-4-turbo`
- **Note:** Ensure your OpenAI account has access to GPT-4

---

## 📊 API ENDPOINTS

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | API status |
| GET | `/health` | Health check |
| POST | `/api/chat/message` | Send message + image |
| GET | `/api/chat/history/{session_id}` | Get chat history |
| POST | `/api/chat/new-session` | Create new session |

---

## 🎯 RESUME BULLET POINTS

✅ Built end-to-end multimodal AI chatbot
✅ Backend: FastAPI, Python, OpenAI GPT-4 Vision API
✅ Frontend: React 18, TypeScript, Zustand state management
✅ Database: SQLite with SQLAlchemy ORM
✅ Features: Text + image chat, session management, error handling
✅ Responsive UI with real-time typing indicators
✅ Production-ready architecture with CORS, proper error handling

---

## ✨ NEXT STEPS (Optional Enhancements)

- [ ] Add file upload to cloud (AWS S3, Cloudinary)
- [ ] Add authentication (JWT tokens)
- [ ] Add message search/filtering
- [ ] Add streaming responses
- [ ] Deploy to Railway/Render/Vercel
- [ ] Add dark mode UI
- [ ] Add voice input support

---

**Everything is ready. Just add your OpenAI API key and run!** 🚀
