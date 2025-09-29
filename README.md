
# 📄 README.md


# AI Chat App (React + FastAPI)

A simple ChatGPT-like application built with **React** (frontend) and **FastAPI** (backend).  
Currently supports:
- Chat history
- Typing indicator
- Sending messages between frontend and backend

Planned extensions:
- AI integration (OpenAI API / AWS Bedrock)
- Improved UI/UX (auto-scroll, error handling)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-chat-app.git
cd ai-chat-app
````

### 2. Backend (FastAPI)

```bash
cd chat-backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install fastapi uvicorn pydantic

uvicorn main:app --reload
```

Server runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 3. Frontend (React)

```bash
cd ../chat-frontend
npm install
npm start
```

App runs at: [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tech Stack

* **Frontend:** React, TypeScript, CSS
* **Backend:** FastAPI, Pydantic
* **Language:** Python 3.10+, Node.js 18+

---

## 📌 Future Plans

* Integrate AI (OpenAI GPT or AWS Bedrock)
* Store chat history in a database
* Deploy to AWS (ECS/Fargate, Lambda, API Gateway)


