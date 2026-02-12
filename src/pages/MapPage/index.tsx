import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAMES } from '../../minigames';
import LevelModal from './LevelModal';
import { useStars } from './Stars';
import './styles.css';

function MapPage() {
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

  const { stars } = useStars();
  // stars update will be handled upon completion of minigame
  // create minigame end scene with star results and it will update stars in map page accordingly
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

      <div className="stars-container">
        <span className="stars-label">⭐ {Number(stars) || 0}</span>
      </div>

      {selectedLevelConfig && (
        <LevelModal
          level={selectedLevelConfig}
          onStart={handleStartLevel}
          onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default MapPage;
