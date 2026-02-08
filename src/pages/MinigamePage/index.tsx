import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MINIGAMES } from '../../minigames';
import './styles.css';

const MinigamePage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  const handleBackToMap = () => {
    console.log("Back Button Pressed")
    navigate('/map');
  };

  // Dynamically load the correct minigame component from registry
  const minigameConfig = MINIGAMES[levelId!];
  const MinigameComponent = minigameConfig?.Component;

  return (
    <div className="minigame-page">
      <div className="minigame-header">
        <button className="back-button" onClick={handleBackToMap}>
          ←
        </button>
      </div>

      <div className="minigame-content">
        {MinigameComponent ? (
          <MinigameComponent />
        ) : (
          <h1>Error: Minigame not found</h1>
        )}
      </div>
    </div>
  );
};

export default MinigamePage;
