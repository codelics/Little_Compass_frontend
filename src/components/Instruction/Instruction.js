// src/components/Instruction.js
import React from 'react';
import './Instruction.css';

export default function Instruction() {
  return (
    <div className="instruction-container">
      <div className="instruction-content">
        <h2>How to Use This App</h2>
        <ol>
          <li>Select <strong>Chat</strong> to start a conversation with the bot.</li>
          <li>Type your message and hit <strong>Send</strong> (or ⏎).</li>
          <li>Watch the bot’s replies appear above.</li>
          <li>You can toggle <strong>About</strong> to see the illustrations, or <strong>Instructions</strong> to revisit these steps.</li>
          <li>
            Describe your situation clearly—what happened, where and when it occurred—along with what’s running through your mind: your thoughts, your emotions, and how you perceive those feelings as part of yourself.
          </li>
          <li>
            Be willing to open up so the bot can guide you properly—but it’s okay if you’d rather not share everything; just tell it what you feel comfortable sharing.
          </li>
        </ol>
      </div>
    </div>
  );
}
