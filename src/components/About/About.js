// src/components/About.js
import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <img
        src="/assets/about-image-1.png"
        alt="About illustration 1"
        className="about-image"
      />
      <img
        src="/assets/about-image-2.png"
        alt="About illustration 2"
        className="about-image"
      />
    </div>
  );
}
