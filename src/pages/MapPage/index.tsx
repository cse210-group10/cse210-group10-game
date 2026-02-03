import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const MapPage: React.FC = () => {
  const navigate = useNavigate();

  const levels = [
    { id: 'level-1', name: 'Level 1' },
    { id: 'level-2', name: 'Level 2' },
    { id: 'level-3', name: 'Level 3' },
    { id: 'level-4', name: 'Level 4' },
  ];

  const handleLevelClick = (levelId: string) => {
    navigate(`/minigame/${levelId}`);
  };

  return (
    <div className="map-page">
      <h1 className="map-title">Select a Level</h1>
      
      <div className="map-container">
        <div className="connecting-line"></div>
        <div className="levels-row">
          {levels.map((level) => (
            <button
              key={level.id}
              className="level-button"
              onClick={() => handleLevelClick(level.id)}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
