import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MINIGAMES } from "../../minigames";
import MinigameEnd from "../../minigames/minigame-end";
import type { MinigameResult } from "../../types/Minigame";
import { StarsProvider } from "../MapPage/Stars";
import './styles.css';

const MinigamePage: React.FC = () => {
  const [result, setResult] = useState<MinigameResult | null>(null);
  const { levelId } = useParams<{ levelId: string }>();

  const handleBackToMap = () => {
    console.log("Back Button Pressed")
    navigate('/map');
  const handleMinigameComplete = (result: MinigameResult) => {
    console.log("Minigame result:", result);
    setResult(result);
  };

  const handleMinigameComplete = (result: MinigameResult) => {
    console.log("Minigame result:", result);
    setResult(result);
  };

  // Dynamically load the correct minigame component from registry
  const minigameConfig = MINIGAMES[levelId!];
  const MinigameComponent = minigameConfig?.Component;

  if (result) {
    return (
      <MinigameEnd stars={result.stars} />
    )
  } 
  return (
    <StarsProvider>
      <div className="minigame-page">
        <div className="minigame-header">
          <button className="back-button" onClick={handleBackToMap}>
            ←
          </button>
        </div>

        <div className="minigame-content">
          {MinigameComponent ? (
            <MinigameComponent onComplete={handleMinigameComplete} />
          ) : (
            <h1>Error: Minigame not found</h1>
          )}
        </div>
      </div>
    </StarsProvider>
    );
};

export default MinigamePage;
