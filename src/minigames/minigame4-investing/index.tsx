import React from 'react';
import type { MinigameProps } from '../../types/Minigame';
import './styles.css';

export const metadata = {
  title: "Investment Strategy",
  description: "Placeholder.",
  id: "level-4"
};

const Minigame4: React.FC<MinigameProps> = ({ onComplete }) => {
  // Complete with 1 star by default (placeholder)
  const handleComplete = () => {
    onComplete({ stars: 1, levelId: 'level-4' });
  };

  return (
    <div className="minigame-level4-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 4</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Investment Strategy Module Loaded ✓</p>
      <button onClick={handleComplete} style={{ marginTop: '2rem', padding: '1rem 2rem' }}>
        Complete Game
      </button>
    </div>
  );
};

export default Minigame4;
