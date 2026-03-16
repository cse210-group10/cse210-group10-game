import React from 'react';
import { useNavigate } from 'react-router-dom';
import coin from '../../assets/coin.svg';
import './styles.css';

const LAST_PLAYED_LEVEL_KEY = 'lastPlayedLevel';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    // Starting a fresh run from the title screen should begin at the left start.
    localStorage.removeItem(LAST_PLAYED_LEVEL_KEY);
    navigate('/map');
  };

  return (
    <div className="start-page">
      <div className="start-page-coins" aria-hidden="true">
        <img className="floating-coin coin-1" src={coin} alt="" />
        <img className="floating-coin coin-2" src={coin} alt="" />
        <img className="floating-coin coin-3" src={coin} alt="" />
        <img className="floating-coin coin-4" src={coin} alt="" />
        <img className="floating-coin coin-5" src={coin} alt="" />
        <img className="floating-coin coin-6" src={coin} alt="" />
      </div>
      <h1 className="game-title">Financial Literacy Game</h1>
      <button className="start-button" onClick={handleStartGame}>
        Play Game
      </button>
    </div>
  );
};

export default StartPage;
