import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

// this is the structure/code for our game start page

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/map');
  };

  return (
    <div className="start-page">
      <h1 className="game-title">Financial Literacy Game</h1>
      <button className="start-button" onClick={handleStartGame}>
        Play Game
      </button>
    </div>
  );
};

export default StartPage;
