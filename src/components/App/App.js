// src/components/App/App.js
import React, { useState } from 'react';

// component-scoped styles
import './App.css';

// assets (go up two levels: components/App → src)
import illustration from '../../assets/images/compass.png';
import meditation   from '../../assets/images/meditation.png';
import smile        from '../../assets/images/smile.png';

// global fonts (go up two levels into src/styles/)
import '../../styles/fonts.css';

// sibling components (go up one level into src/components/)
import ChatBox     from '../ChatBox/ChatBox';
import MenuButton from '../MenuButton/MenuButton';
import Instruction from '../Instruction/Instruction';

function App() {
  // Track which menu option is selected ('Chat' | 'About' | 'Instruction')
  const [selectedOption, setSelectedOption] = useState('Chat');
  // Show the hero intro until the first chat message is sent
  const [showIntro, setShowIntro] = useState(true);
  // Counter to force-remount ChatBox on each Chat-click
  const [chatResetKey, setChatResetKey] = useState(0);

  const showChat        = selectedOption === 'Chat';
  const showAbout       = selectedOption === 'About';
  const showInstruction = selectedOption === 'Instruction';

  return (
    <div className="App">
      <header className="App-header">
        {/* Menu button with Chat, About, Instruction */}
        <MenuButton
          options={['Chat', 'About', 'Instruction']}
          onSelect={opt => {
            setSelectedOption(opt);

            // 1) Show intro splash whenever we switch back to Chat
            setShowIntro(opt === 'Chat');

            // 2) Force ChatBox to remount (clearing its messages)
            if (opt === 'Chat') {
              setChatResetKey(k => k + 1);
            }
          }}
        />

        {/* Fixed-position decorations: always visible */}
        <div className="FixedDecorations">
          <img
            src={meditation}
            alt="Woman doing meditation"
            className="meditation_img"
          />
          <img
            src={smile}
            alt="Smiling man"
            className="smile_img"
          />
        </div>

        {showInstruction ? (
          /* INSTRUCTION PANEL */
          <Instruction />
        ) : showAbout ? (
          /* ABOUT PANEL */
          <div className="about-info">
            <p>
              Little Compass was founded by Niko Santos, an AI developer dedicated to integrating
              spiritual principles with advanced machine learning. Drawing on this unique blend,
              Little Compass offers thoughtful guidance and emotional support to individuals
              navigating life’s challenges or seeking greater clarity.
            </p>
            <p>
              Designed to function as a compassionate companion, Little Compass listens attentively,
              reflects insights you might overlook, and gently empowers you to discover new
              perspectives and pathways forward.
            </p>
          </div>
        ) : showChat ? (
          /* CHAT VIEW (intro + chat) */
          <>
            {/* Intro area (only visible until first chat message) */}
            <div className={`IntroArea ${showIntro ? '' : 'hidden'}`}>
              <div className="Hero">
                <img
                  src={illustration}
                  alt="Compass illustration representing Little Compass app"
                  className="illustration"
                />
                <h1 className="visually-hidden">Little Compass</h1>
                <h2 className="tagline">
                  An AI-powered reflection and clarity companion that helps you
                  explore your thoughts, recognize what matters to you, and gently
                  chart your path forward.
                </h2>
              </div>
            </div>

            {/* Chat box */}
            <div className="ChatContainer">
              <ChatBox
                key={chatResetKey}           // ← Force a full remount on each Chat-click
                onFirstMessageSent={() => {
                  setShowIntro(false);
                }}
              />
            </div>
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App;
