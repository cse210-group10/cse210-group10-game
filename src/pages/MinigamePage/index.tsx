import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MINIGAMES } from '../../minigames';
import './styles.css';

const MinigamePage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  const handleBackToMap = () => {
    navigate('/map');
  };

  // Dynamically load the correct minigame component from registry
  const minigameConfig = MINIGAMES[levelId!];
  const MinigameComponent = minigameConfig?.Component;

  if (!MinigameComponent) {
    return (
      <div className="minigame-page">
        <button className="back-button" onClick={handleBackToMap}>
          ← Back to Map
        </button>
        <div className="minigame-content">
          <h1>Error: Minigame not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="minigame-page">
      <button className="back-button" onClick={handleBackToMap}>
        ← Back to Map
      </button>
      <div className="minigame-content">
        {/* Render the dynamically loaded minigame module */}
        <MinigameComponent />
      </div>
    </div>
  );
};

export default MinigamePage;
