import React from 'react';
import './styles.css';

export const metadata = {
  title: "Template",
  description: "Placeholder.",
  id: "level-5"
};

const Minigame5: React.FC = () => {
  return (
    <div className="minigame-level4-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Template</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Template Game Loaded ✓</p>
    </div>
  );
};

export default Minigame5;
