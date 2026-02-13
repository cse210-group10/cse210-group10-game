import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MINIGAMES } from '../../minigames';
import LevelModal from './LevelModal';
import { useStars } from './Stars';
import { useCoins } from './Coins';
import coinIcon from '../../assets/coin.svg';
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

  // We'll use addCoins/spendCoins for the little + / - test buttons.
  const { coins, addCoins, spendCoins, setCoins } = useCoins();

  const isDev = import.meta.env.DEV;

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

      <div className="hud-container">
        <div className="stars-container">
          <span className="stars-label">⭐ {Number(stars) || 0}</span>

          <div className="coins-container">
            <span className="coins-label" aria-label="coin-display" data-testid="coin-display">
              <img src={coinIcon} alt="Coin" className="coin-icon" />
              {Number(coins) || 0}
            </span>

            <div className="coin-buttons">
              <button className="coin-btn" onClick={() => addCoins(1)} aria-label="Add coin" >+</button>
              <button className="coin-btn" onClick={() => spendCoins(1)} aria-label="Spend coin" >−</button>

              {isDev && (
                <button className="coin-reset-btn" onClick={() => setCoins(0)} aria-label="Reset coins" >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
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
