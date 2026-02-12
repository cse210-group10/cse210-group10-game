import React from "react";
import type { MinigameProps, MinigameResult } from "../../types/Minigame";
import "./styles.css";

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Placeholder",
  id: "level-1",
};

const result: MinigameResult = {  
  stars: 1, 
}

const Minigame1: React.FC<MinigameProps> = ({ onComplete }) => {
  return (
    <div className="minigame-level1-container">
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Hi! I'm Game 1</h1>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Scholarship Matcher Module Loaded ✓
      </p>
      <button onClick={() => onComplete(result)}>
        Placeholder Button
      </button>
    </div>
  );
};

export default Minigame1;
