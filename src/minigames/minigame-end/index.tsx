import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MinigameResult } from '../../types/Minigame';
import { useStars } from '../../pages/MapPage/Stars';
import starImg from '../../assets/star.png';
import emptyStarImg from '../../assets/empty_star.png';
import './styles.css';

const MinigameEnd: React.FC<MinigameResult> = ({
  stars,
  levelId,
}) => {
  const navigate = useNavigate();
  const { addStars } = useStars();
  const LAST_PLAYED_LEVEL_KEY = 'lastPlayedLevel';

  const handleReturnToMap = () => {
    addStars(levelId, stars);
    localStorage.setItem(LAST_PLAYED_LEVEL_KEY, levelId);
    navigate('/map');
  };

  return (
    <div className="end-page">
      {/* Star icons above the card */}
      <div className="end-stars">
        {[0, 1, 2].map((i) => (
          <img
            key={i}
            src={i < stars ? starImg : emptyStarImg}
            alt={i < stars ? 'earned star' : 'empty star'}
            className={`end-star-icon ${i < stars ? 'end-star-earned' : ''}`}
          />
        ))}
      </div>

      {/* White card */}
      <div className="end-card">
        <h1 className="end-title">You passed!</h1>

        <button className="end-return-btn" onClick={handleReturnToMap}>
          Return to Map →
        </button>
      </div>
    </div>
  );
};

export default MinigameEnd;