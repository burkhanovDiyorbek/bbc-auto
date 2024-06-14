// src/Chat.js
import { useState, useEffect } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const ws = new WebSocket("ws://localhost:5174/chat");

  useEffect(() => {
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ws.send(input);
    // setInput("");
    // const handleSend = () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("jde");
    } else if (ws.readyState === WebSocket.CONNECTING) {
      // Ulanishni kutish, qo'shimcha ishlash uchun
      ws.addEventListener("open", () => {
        ws.send("jdek");
      });
    } else {
      // Boshqa holatlar uchun
      console.log("WebSocket hali ulanmagan");
    }
  };

  return (
    <div className="App">
      <h1>Chat tizimi</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="Xabarni kiriting..."
        />
        <button type="submit">Yuborish</button>
      </form>
    </div>
  );
}

export default Chat;
