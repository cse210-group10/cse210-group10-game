import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAMES } from '../../minigames';
import LevelModal from './LevelModal';
import './styles.css';


// This is the index page of map, index is what node uses as a general entry point for it's components;
// same for the index pages in minigame page, think of it as a general entry point


const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  // Get all registered levels from registry
  const levels = Object.values(MINIGAMES).map(config => config.metadata);

  const handleLevelClick = (levelId: string) => {
    setSelectedLevelId(levelId);
  };

  const handleStartLevel = () => {
    if (selectedLevelId) {
      navigate(`/minigame/${selectedLevelId}`);
      setSelectedLevelId(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedLevelId(null);
  };

  const selectedLevelConfig = selectedLevelId ? MINIGAMES[selectedLevelId]?.metadata : null;

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
              {level.title}
            </button>
          ))}
        </div>
      </div>

      {selectedLevelConfig && (
        <LevelModal 
          level={selectedLevelConfig}
          onStart={handleStartLevel}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MapPage;
