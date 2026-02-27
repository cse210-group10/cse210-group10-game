import React, { useState, useEffect } from 'react';
import CalendarButton from './calendar-button'; //buttons for interactive counter
// import { useCalendarLogic } from './calendar-logic'; //math logic for interactive counter
// import { useQuestionLogic } from './question-logic'; // question load / check answer
import QuestionDisplay from './question-display'; // question view
import { useBudgetGameLogic } from './budget-game-setup';
import type { MinigameResult, MinigameProps } from '../../types/Minigame';
import PopupLesson from '../../components/PopupLesson';
import lessonDataStore from './lessons.json';
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

export interface lessonData {
    id: number;
    lessonContent: string;
}

const Minigame2: React.FC<MinigameProps> = ({ onComplete }) => {
  //set-up everything from useBudgetGameLogic
  const {
    workDays,
    toggleDay,
    totalWorkDays,
    currentQuestion,
    currentIncome,
    submitAnswer,
    title,
    content,
    last,
    questionCount
  } = useBudgetGameLogic();

  // initialize progress bar with total number of questions
  // useEffect(() => {
  //   progress?.init(questionCount);
  // }, [progress, questionCount]);

  const result: MinigameResult = {  
    // TODO: add actual star logic here (for Mo)
    stars: 1, 
  }

  const [showPopup, setShowPopup] = useState(true);
  const lastLessonID = 6; //id for last paragraph in lesson
  const currentLessons = lessonDataStore.lessons as lessonData[];
  const [lessonID, setLessonID] = useState(0);

  //helper function: set up the calendar views to be placed in corners of the buttons
  const renderCalendarButton = (isWork: boolean, index: number) => {
    const day = index + 1;

    return (
      <CalendarButton key={index} dayNumber={day} isWork={isWork} onToggle={() => toggleDay(index)}/>
    );
  };

  const submitHelper = () => {
    submitAnswer();
    // console.log(Minigame2 Popup Debugging: {title}, {content})
    setShowPopup(true);
  };

  // not sure on this mini-game level2 container\
  return (

    <div className="minigame-level2-container">
      {showPopup && (lessonID != lastLessonID) &&(
        <PopupLesson
        title= {title}
        content= {currentLessons[lessonID].lessonContent}
        onClickNext={() => setLessonID(prev => prev + 1)}
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
