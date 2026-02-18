import React, { useState } from "react";
import type { MinigameProps, MinigameResult } from "../../types/Minigame";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import Popup from "../../components/Popup";

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Placeholder",
  id: "level-1",
};

// const result: MinigameResult = {  
//   stars: 1, 
// }
// reference code for how to use stars onComplete for minigames

const Minigame1: React.FC<MinigameProps> = ({ onComplete }) => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  
  // Function to navigate to start of the minigame
  const handleMinigame1Start = () => {
    navigate('/minigame/level-1/character');
  };
  
  return (

    // Placeholder information about how to play the game
    <div className="minigame-level1-container">
      {showPopup && (
          <Popup
          title="Tutorial"
          content="Minigame #1 is about..."
          onClose={() => setShowPopup(false)}
          />
      )}
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



