import React from 'react';
import CalendarButton from './calendar-button'; //buttons for interactive counter
import { useCalendarLogic } from './calendar-logic'; //math logic for interactive counter
import { useQuestionLogic } from './question-logic'; // question load / check answer
import QuestionDisplay from './question-display'; // question view
import './styles.css';
import { createRoutesFromElements } from 'react-router-dom';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

const Minigame2: React.FC = () => {
  
  //new version, logic handled entirely by calendar-logic manager
  const {workDays, toggleDay, totalWorkDays} = useCalendarLogic(5);

  //same idea with question-logic, enables going thorugh each question in array
  const {currentQuestion, nextQuestion} = useQuestionLogic();

  //helper function: calculate current income earned based on days selected
  const currentIncome = totalWorkDays * currentQuestion.rateEarned;
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
      
      <div className='button-container-row'>
        {/* helper function from above */}
        {workDays.map(renderCalendarButton)}
      </div>

    </div>
  );
};

export default Minigame2;
