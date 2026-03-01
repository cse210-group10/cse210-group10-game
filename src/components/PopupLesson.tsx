import React from 'react';
import type { PopupPropsLesson } from '../types/General';
import './styles.css';

// popup component for lessons

// creates a popup with a title, content, and an next button to go to the next lesson
// using the next button (no clicking outside to close)
const PopupLesson: React.FC<PopupPropsLesson> = ({
   title,
   content,
   onClickNext,
}) => {

  return (
    <div className="popup-container">
      <div className="popup">
            <h1 className="popup-title">{title}</h1>
            <p className="popup-content">{content}</p>
            <button
            className="lesson-button"
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
      content= {content}
      onClickNext={() => setLessonID(prev => prev + 1)}
      />
    )}
)
*/

export default PopupLesson;