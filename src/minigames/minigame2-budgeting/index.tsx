import React, { useState } from 'react';
import { useBudgetGameLogic } from './useBudgetGameLogic'; // question logic
import CalendarButton from './calendar-button'; //buttons for interactive counter
import QuestionDisplay from './question-display'; // question view
import type { MinigameResult, MinigameProps } from '../../types/Minigame';
import Popup from '../../components/Popup';
import type { PopupProps } from '../../types/General'; // pop-up for question feedback and end game summary
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

const Minigame2: React.FC<MinigameProps> = ({ onComplete }) => {
  //set-up everything from useBudgetGameLogic
  const {
    questionDisplayProps,
    popupProps,
    endPopupProps,
    progress, //for tests
    last,
    workDays,
    submitAnswer,
    resetButtons,
    toggleDay,
  } = useBudgetGameLogic(0);

  // initialize progress bar with total number of questions
  // useEffect(() => {
  //   progress?.init(questionCount);
  // }, [progress, questionCount]);

  // Stars calculation: 3 stars for 4-5 correct, 2 stars for 2-3 correct, 1 star for 0-1 correct
  const correctAnswers = progress.correct;
  const stars = correctAnswers >= 4 ? 3 : correctAnswers >= 2 ? 2 : 1;

  const result: MinigameResult = {  
    stars,
    levelId: 'level-2'
  };

  const [showPopup, setShowPopup] = useState(true);
  const [showEndPopup, setShowEndPopup] = useState(false);

  //helper function: set up the calendar views to be placed in corners of the buttons
  const renderCalendarButton = (isWork: boolean, index: number) => {
    const day = index + 1;

    return (
      <CalendarButton key={index} dayNumber={day} isWork={isWork} onToggle={() => toggleDay(index)}/>
    );
  };

  const submitHelper = () => {
    submitAnswer();
    resetButtons();
    setShowPopup(true);
  };

  const completeHelper = () => {
    setShowEndPopup(true);
  }

  // not sure on this mini-game level2 container\
  return (

    <div className="minigame-level2-container">
      {showPopup && (
          <Popup
          title={popupProps.title}
          content={popupProps.content}
          onClose={() => {
            setShowPopup(false);
            if (last) {
              completeHelper();
            } 
          }}
          />
      )}

      {showEndPopup && (
          <Popup
          title={endPopupProps.title}
          content={endPopupProps.content}
          onClose={() => {setShowPopup(false); onComplete(result);}}
          />
      )}

      <QuestionDisplay 
        questionInfo={questionDisplayProps.questionInfo} 
        amountPerDay={questionDisplayProps.amountPerDay} 
        totalWorkDays={questionDisplayProps.totalWorkDays}/>
      
      <div className="button-container-row">
        {/* helper function from above */}
        {workDays.map(renderCalendarButton)}
      </div>
      <button className="submit-button" onClick={submitHelper}>
        Submit
      </button>
    </div>
  );
};

export default Minigame2;