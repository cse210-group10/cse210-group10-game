import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAMES } from '../../minigames';
import LevelModal from './LevelModal';
import { useStars } from './Stars';
import Popup from "../../components/Popup";
import './styles.css';

// Import Figma assets
import mapBg from '../../assets/map.png';
import pathImg from '../../assets/path.png';
import kidImg from '../../assets/kid.png';
import houseImg from '../../assets/house.png';
import starImg from '../../assets/star.png';
import emptyStarImg from '../../assets/empty_star.png';

// Character positions matching CSS level positions
const CHARACTER_POSITIONS: Record<string, { bottom: string; left: string }> = {
  start:     { bottom: '30%', left: '8%' },
  'level-1': { bottom: '23%', left: '32%' },
  'level-2': { bottom: '58%', left: '55%' },
};

function MapPage() {
  const navigate = useNavigate();
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [characterPos, setCharacterPos] = useState<string>('start');
  const { stars, getLevelStars } = useStars();

  // show pop up at start of the game
  const [showPopup, setShowPopup] = useState(true);

  // so popup shows if there are no stars
  let isStars = Boolean(stars);

  const handleLevelClick = (levelId: string) => {
    setCharacterPos(levelId);
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

  // Render 3 stars for a given level
  const renderLevelStars = (levelId: string) => {
    const earned = getLevelStars(levelId);
    return (
      <div className="level-stars">
        {[0, 1, 2].map((i) => (
          <img
            key={i}
            src={i < earned ? starImg : emptyStarImg}
            alt={i < earned ? 'earned star' : 'empty star'}
            className="level-star-icon"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="map-page">
      {/* Welcome popup */}
      {showPopup && !isStars && (
        <Popup
          title="Welcome!"
          content={"You are trying to earn and save money for school, but you need to figure out how to handle your finances. " +
            "Try to complete a few mini games to help you get started in learning these skills."}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}

      {/* HUD - top right */}
      <div className="hud-container">
        <div className="hud-item">
          <img src={starImg} alt="stars" className="hud-icon" />
          <span className="hud-value">{Number(stars) || 0}</span>
        </div>
      </div>

      {/* Map container with layered images */}
      <div className="map-container">
        {/* Green island background */}
        <img src={mapBg} alt="map background" className="map-island" />

        {/* Winding path overlay */}
        <img src={pathImg} alt="path" className="map-path" />

        {/* Character with speech bubble — moves to clicked level */}
        <div
          className="character-area"
          style={{
            bottom: CHARACTER_POSITIONS[characterPos].bottom,
            left: CHARACTER_POSITIONS[characterPos].left,
          }}
        >
          {characterPos === 'start' && (
            <div className="speech-bubble">
              <p>Click on "1" to start the first minigame.</p>
            </div>
          )}
          <img src={kidImg} alt="character" className="character-img" />
        </div>

        {/* Level 1 - bottom area on the path */}
        <div className="level-1-area">
          {renderLevelStars('level-1')}
          <button
            className="level-circle"
            onClick={() => handleLevelClick('level-1')}
          >
            1
          </button>
        </div>

        {/* Level 2 - upper area on the path */}
        <div className="level-2-area">
          {renderLevelStars('level-2')}
          <button
            className="level-circle"
            onClick={() => handleLevelClick('level-2')}
          >
            2
          </button>
        </div>

        {/* House at the end of the path */}
        <img src={houseImg} alt="house" className="house-img" />
      </div>

      {/* Level Modal */}
      {selectedLevelConfig && (
        <LevelModal
          level={selectedLevelConfig}
          onStart={handleStartLevel}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default MapPage;
