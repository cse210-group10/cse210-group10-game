import React, { useEffect } from 'react';
import type { MinigameProps } from '../../types/Minigame';
import './styles.css';

export const metadata = {
  title: "Template",
  description: "Placeholder.",
  id: "level-5"
};

const TOTAL_QUESTIONS = 5;

const Minigame5: React.FC<MinigameProps> = ({ progress }) => {
  useEffect(() => {
    progress?.init(TOTAL_QUESTIONS);
  }, [progress]);

  return (
    <div className="minigame-level4-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Template</h1>
      <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
        ProgressBar demo: 5 dots at the top. Use the buttons below to mark each as correct (green) or incorrect (red).
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
          <span key={i} style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              type="button"
              onClick={() => progress?.markCorrect(i)}
              style={{ padding: '0.5rem 0.75rem', cursor: 'pointer' }}
            >
              {i + 1}✓
            </button>
            <button
              type="button"
              onClick={() => progress?.markIncorrect(i)}
              style={{ padding: '0.5rem 0.75rem', cursor: 'pointer' }}
            >
              {i + 1}✗
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Minigame5;
