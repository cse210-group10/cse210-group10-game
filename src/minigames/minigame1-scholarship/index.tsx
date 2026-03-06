import React, { useState } from "react";
import type { MinigameProps/*, MinigameResult*/ } from "../../types/Minigame";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import PopupLesson from "../../components/PopupLesson";
import lessonDataStore from './lessons.json';

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Placeholder",
  id: "level-1",
};

export interface lessonData {
    id: number;
    lessonContent: string;
}

// const result: MinigameResult = {  
//   stars: 1, 
// }
// reference code for how to use stars onComplete for minigames

// const Minigame1: React.FC<MinigameProps> = ({ onComplete }) => {
// ({ onComplete })
const Minigame1: React.FC<MinigameProps> = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  
  // Function to navigate to start of the minigame
  const handleMinigame1Start = () => {
    navigate('/minigame/level-1/character');
  };
  
  const [showPopup, setShowPopup] = useState(true);
  const lastLessonID = 7; //id for last paragraph in lesson
  const currentLessons = lessonDataStore.lessons as lessonData[];
  const [lessonID, setLessonID] = useState(0);
  
  return (

    // Placeholder information about how to play the game
    <div className="minigame-level1-container">
      <h1>Scholarship Matcher</h1>

      {showPopup && (lessonID != lastLessonID) &&(
        <PopupLesson
        title= "Scholarship Matcher"
        content= {currentLessons[lessonID].lessonContent}
        onClickNext={() => setLessonID(prev => prev + 1)}
        />
      )}

      {/* navigate to start of the minigame */}
        <button className="start-minigame1-button" onClick={handleMinigame1Start}>
          Start game
        </button>

    </div>
  );
};

export default Minigame1;



