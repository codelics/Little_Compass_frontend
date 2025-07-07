// src/components/MenuButton.js
import React, { useState, useRef, useEffect } from 'react';
import './MenuButton.css';

export default function MenuButton({ options, onSelect }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  // close if user clicks outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOption = (option) => {
    setOpen(false);
    onSelect(option);
  };

  return (
    <div className="menu-wrapper" ref={buttonRef}>
      <button
        className="menu-button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open menu"
      >
        <span className="hamburger-icon">☰</span>
        <span className="menu-label">Menu</span>
      </button>
      {open && (
        <ul role="menu" className="menu-list">
          {options.map(opt => (
            <li
              key={opt}
              role="menuitem"
              tabIndex="0"
              onClick={() => handleOption(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
