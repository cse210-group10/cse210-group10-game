import React, { useState } from 'react';
import { useCalendarLogic } from './useCalendarLogic'; // calendar logic
import { useBudgetGameLogic } from './useBudgetGameLogic'; // question logic
import CalendarButton from './calendar-button'; //buttons for interactive counter
import QuestionDisplay from './question-display'; // question view
import type { MinigameResult, MinigameProps } from '../../types/Minigame';
import Popup from '../../components/Popup';
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

const Minigame2: React.FC<MinigameProps> = ({ onComplete }) => {
  //game logic set-up
  const {workDays, totalWorkDays, toggleDay, resetButtons} = useCalendarLogic(5);
  
  //set-up everything from useBudgetGameLogic
  const {
    currentQuestion,
    correctQuestions,
    currentIncome,
    submitAnswer,
    title,
    content,
    progress, //for tests
    last,
    questionCount, // for progress bar initialization
  } = useBudgetGameLogic(0, totalWorkDays);

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
    console.log("running completeHelper");
    setShowEndPopup(true);
  }

  // not sure on this mini-game level2 container\
  return (

    <div className="minigame-level2-container">
      {showPopup && (
          <Popup
          title={title}
          content={content}
          onClose={() => {setShowPopup(false); if(last) completeHelper();}}
          />
      )}

      {showEndPopup && (
          <Popup
          title={"Game Over!"}
          content={"You got: " + Number(correctQuestions) + 
            " out of "+(questionCount - 1)+" correct! and missed " + Number(currentQuestion.id-correctQuestions) + "."}
          onClose={() => {setShowPopup(false); onComplete(result);}}
          />
      )}

      {/* testing question display */}
      <QuestionDisplay questionInfo={currentQuestion} amountPerDay={currentIncome}/>
      
      {/*Counter Display to check each work day, can reintegrate math logic later in calendar logic*/}
      <h2>Total Work Days: {totalWorkDays}</h2>
      
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