import { useState } from "react";
import "./App.css"; // CSSを別ファイルにまとめる想定

type Message = {
  id: number;
  sender: "user" | "assistant";
  text: string;
};

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (sender: "user" | "assistant", text: string) => {
    if (text.trim() === "") return;
    setMessages((prev) => [...prev, { id: Date.now(), sender, text }]);
    setText(""); // 入力欄をクリア
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === "user" ? "user" : "assistant"}`}
          >
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メッセージを入力してください。"
        />
        <button onClick={() => addMessage("user", text)}>送信</button>
      </div>
    </div>
  );
}

export default App;
