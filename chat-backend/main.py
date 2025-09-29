from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Literal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    id: int
    sender: Literal["user", "assistant"]
    text: str


class ChatRequest(BaseModel):
    messages: List[Message]


@app.post("/chat")
def chat(request: ChatRequest):
    last_message = request.messages[-1].text if request.messages else "（空）"
    return  {"reply": f"あなたの最後の発言は「{last_message}」ですね🤖"}