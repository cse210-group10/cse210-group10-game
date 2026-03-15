import React, { useState } from 'react';
import type { PopupPropsLesson, lessonData } from '../types/General';
import './styles.css';
// Source for minigame 1 lesson content: Khan Academy Financial Literacy: Unit 9 Careers and education
import lessonDataStoreScholarship from '../minigames/minigame1-scholarship/lessons.json';
// Source for minigame 2 lesson content: Khan Academy Financial Literacy: Unit 2 Budgeting and saving
import lessonDataStoreBudget from '../minigames/minigame2-budgeting/lessons.json'; 

// popup component for lessons
// DataStore for each minigame
export const currentLessonsBudget = lessonDataStoreBudget.lessons as lessonData[];
export const currentLessonsScholarship = lessonDataStoreScholarship.lessons as lessonData[];

// creates a popup with a title, content, and an next button to go to the next lesson
// using the next button (no clicking outside to close)
const PopupLesson: React.FC<PopupPropsLesson> = ({
   title,
   contentID,
   onClickNext,
}) => {

  let currentLessons = currentLessonsBudget;

  if (title == 'Scholarship Matcher') {
    currentLessons = currentLessonsScholarship;
  } 

  return (
    <div className="popup-container">
      <div className="popup">
            <h1 className="popup-title">{title}</h1>
            <p className="popup-content">{currentLessons[contentID].lessonContent}</p>
            <button
            className="button"
            onClick={onClickNext}
            >
            Next
            </button>
      </div>
    </div>
  );
};

/*
example usage:
const [showPopupLesson, setShowPopupLesson] = useState(false);

in return(
   <button onClick={() => setShowPopupLesson(true)}>Open</button>

   {showPopup && (lessonID != lastLessonID) &&(
      <PopupLesson
      title= {title}
      contentID={lessonID}
      onClickNext={() => setLessonID(prev => prev + 1)}
      />
    )}
)
*/

export default PopupLesson;