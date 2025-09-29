import './App.css';
import { useState, useEffect, useRef } from "react";

type Message = {
    id: number;
    sender: "user" | "assistant"; 
    text: string;
}
function App() {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); 

    const addMessage = (sender: "user" | "assistant", text: string) =>{
        if (text.trim() === "") return;
        setMessages(prev => [...prev, {id: Date.now(), sender, text}]);
    };

    const handleSend = async () =>{
        if (text.trim() === "") return;

        const newMessage = {id: Date.now(), sender: "user" as const, text };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages)
        setText("");

        try{
            const res = await fetch("http://127.0.0.1:8000/chat", {
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ messages: newMessages}),
            });
            const data = await res.json();
            setIsTyping(true);
            setTimeout(() => {
                addMessage("assistant", data.reply);
                setIsTyping(false);
            }, 1000)
            console.log(messages);
        } catch (err) {
            console.error("APIエラー", err);
            addMessage("assistant", "Something went wrong.");
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg)=>(
                    <div
                        key={msg.id}
                        className={`message ${msg.sender ==="user"? "user" : "assistant"}`}
                        >
                        <div className="bubble">{msg.text}</div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message assistant">
                        <div className="bubble typing">
                            <span></span><span></span><span></span>

                        </div>
                    </div>

                )}
                <div ref={messagesEndRef} />

            </div>
            <div className="input-area">
                <textarea
                value={text}
                onChange={(e)=> setText(e.target.value)}
                placeholder="Type your message here..."
                onKeyDown={(e)=>{
                    if (e.key =="Enter" && e.shiftKey){
                        e.preventDefault();
                        handleSend();
                    }
                }}
                />
                <button onClick={handleSend} >Send</button>
            </div>
        </div>
    )

}
export default App;