import React from 'react';

export const metadata = {
  title: "Investment Strategy",
  description: "Placeholder.",
  id: "level-4"
};

const Minigame4: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 4</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Investment Strategy Module Loaded ✓</p>
    </div>
  );
};

export default Minigame4;
