import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MinigameResult } from '../../types/Minigame';
import { useStars } from '../../pages/MapPage/Stars';
import './styles.css';

const MinigameEnd: React.FC<MinigameResult> = ({
  stars,
}) => {
  const navigate = useNavigate();
  const { addStars } = useStars();
  console.log(`Minigame completed with ${stars} stars!`);

  const handleMinigameCompleteHelper = () => {
    addStars(stars);
    navigate('/map');
  };

  return (
    <div className="end-page">
      <h1 className="end-title">You have passed the level with {Number(stars)} stars!</h1>
      <button
        className="return-button"
        onClick={handleMinigameCompleteHelper}
      >
        Return to Map
      </button>
    </div>
  );
};

export default MinigameEnd;