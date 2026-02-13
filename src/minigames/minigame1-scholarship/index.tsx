import React from "react";
import type { MinigameProps, MinigameResult } from "../../types/Minigame";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Placeholder",
  id: "level-1",
};

// const result: MinigameResult = {  
//   stars: 1, 
// }

const Minigame1: React.FC<MinigameProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  const handleMinigame1Start = () => {
    navigate('/minigame/level-1/character');
  };


  return (
    <div className="minigame-level1-container">
      <h1>Scholarships</h1>
      <p>
        Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
        mollit anim id est laborum
      </p>

      {/* navigate to start of the minigame */}
      <button className="start-minigame1-button" onClick={handleMinigame1Start}>
        Start game
      </button>

      {/* <button onClick={() => onComplete(result)}>
        Placeholder Button
      </button>  */}
    </div>
  );
};

export default Minigame1;
