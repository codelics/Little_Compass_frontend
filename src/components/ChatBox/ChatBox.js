import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

function ChatBox({ onFirstMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSentFirst, setHasSentFirst] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { text: input.trim(), sender: "user" };
    setMessages(prev => [...prev, newMessage]);

    if (!hasSentFirst) {
      setHasSentFirst(true);
      onFirstMessageSent?.(input.trim());
    }

    setLoading(true);
    setInput("");

    try {
      const base = process.env.REACT_APP_API_URL;    // e.g. "https://little-compass-backend.onrender.com"
      const response = await fetch(`${base}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.text }),
      });


      const data = await response.json();
      const botMessage = { text: data.reply, sender: "bot" };
      setLoading(false);
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching bot response:", error);
      setLoading(false);
      const errorMessage = { text: "Sorry, something went wrong.", sender: "bot" };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <div
              className={`message ${msg.sender}`}
              dangerouslySetInnerHTML={{
                __html: msg.text.replace(/\n/g, "<br />")
              }}
            />
          </div>
        ))}

        {loading && (
          <div className="message-row bot">
            <div className="message bot">
              Please wait, Little Compass is formulating an answer…
            </div>
          </div>
        )}
      </div>

      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
