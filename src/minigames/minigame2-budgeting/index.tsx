import React, { useEffect } from 'react';
import CalendarButton from './calendar-button'; //buttons for interactive counter
// import { useCalendarLogic } from './calendar-logic'; //math logic for interactive counter
// import { useQuestionLogic } from './question-logic'; // question load / check answer
import QuestionDisplay from './question-display'; // question view
import { useBudgetGameLogic } from './budget-game-setup';
import type { MinigameProps } from '../../types/Minigame';
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

// pass progress api to the minigame
const Minigame2: React.FC<MinigameProps> = ({ progress }) => {
  //set-up everything from useBudgetGameLogic
  const {
    workDays,
    toggleDay,
    totalWorkDays,
    currentQuestion,
    currentIncome,
    submitAnswer,
    // get total number of questions
    questionCount
  } = useBudgetGameLogic(progress);

  // initialize progress bar with total number of questions
  useEffect(() => {
    progress?.init(questionCount);
  }, [progress, questionCount]);

  //helper function: set up the calendar views to be placed in corners of the buttons
  const renderCalendarButton = (isWork: boolean, index: number) => {
    const day = index + 1;

    return (
      <CalendarButton key={index} dayNumber={day} isWork={isWork} onToggle={() => toggleDay(index)}/>
    );
  };

  // not sure on this mini-game level2 container\
  return (
    <div className="minigame-level2-container">
      
      {/* testing question display */}
      <QuestionDisplay questionInfo={currentQuestion} amountPerDay={currentIncome}/>
      
      {/*Counter Display to check each work day, can reintegrate math logic later in calendar logic*/}
      <h2>Total Work Days: {totalWorkDays}</h2>
      
      <div className="button-container-row">
        {/* helper function from above */}
        {workDays.map(renderCalendarButton)}
      </div>
      <button className="submit-button" onClick={submitAnswer}>
        Submit
      </button>
    </div>
  );
};

export default Minigame2;
