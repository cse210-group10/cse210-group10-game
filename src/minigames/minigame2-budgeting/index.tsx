import React from 'react';
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

const Minigame2: React.FC = () => {
  return (
    <div className="minigame-level2-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 2</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Budget Planner Module Loaded ✓</p>
    </div>
  );
};

export default Minigame2;
