import React from 'react';
import './styles.css';

export const metadata = {
  title: "Savings Challenge",
  description: "PlaceHolder",
  id: "level-3"
};

const Minigame3: React.FC = () => {
  return (
    <div className="minigame-level3-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 3</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Savings Challenge Module Loaded ✓</p>
    </div>
  );
};

export default Minigame3;
