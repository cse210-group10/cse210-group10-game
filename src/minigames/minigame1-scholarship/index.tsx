import React from "react";
import { useState, useEffect, useRef } from "react";
import type { MinigameProps } from "../../types/Minigame";
import "./styles.css";
import { useScholarshipLogic, type ScholarshipData } from "./question-logic";
import Popup from "../../components/Popup";

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

const Minigame1: React.FC<MinigameProps> = ({ onComplete }) => {
  const initialText = "Please select one of the scholarships with the buttons below.";
  const characterIndex = 0;
  const { currentScholarships, submitAnswer, totalCorrect, questionId, isGameOver } = useScholarshipLogic(characterIndex);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<ScholarshipData | null>(null);
  const [scholarshipInfo, setScholarshipInfo] = useState<ScholarshipData | null>(null);
  const [submitVisible, setSubmitVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handledGameOverRef = useRef(false);
  const [feedbackPopup, setFeedbackPopup] = useState<{ visible: boolean; isCorrect: boolean }>({
    visible: false,
    isCorrect: false,
  });

  //For lesson pop up box
  const [showPopupLesson] = useState(true);
  const lastLessonID = 7; //id for last paragraph in lesson
  const [lessonID, setLessonID] = useState(0);
  const [title] = useState("Scholarship Matcher");

  useEffect(() => {
    if (!isGameOver || handledGameOverRef.current) return;
    handledGameOverRef.current = true;
    setShowPopup(true);
  }, [isGameOver]);

  const stars = totalCorrect.correct >= 4 ? 3 : totalCorrect.correct >= 2 ? 2 : 1;

  return (
    <div className="minigame-level1-container">

      {showPopupLesson && (lessonID != lastLessonID) &&(
        <Popup
        title= {title}
        content={String(lessonID)}
        onClose={() => setLessonID(prev => prev + 1)}
        />
      )}

      {/* feedback popup after each question */}
      {feedbackPopup.visible && (
        <Popup
          title={feedbackPopup.isCorrect ? "Correct!" : "Incorrect"}
          content={feedbackPopup.isCorrect
            ? "Great job! That scholarship is the best match."
            : "Not quite! Try to match the scholarship to the student's needs."}
          onClose={() => setFeedbackPopup({ visible: false, isCorrect: false })}
        />
      )}
      {showPopup && (
        <Popup
          title="Game Over!"
          content={`You got ${totalCorrect.correct} out of 5 correct.`}
          onClose={() => {
            setShowPopup(false);
            onComplete({ stars, levelId: 'level-1' });
          }}
        />
      )}

      <div className="scholarship-compare">
        <div className="profile">
          <div className="profile-pic">
            <img src="/src/minigames/minigame1-scholarship/undraw_profile-pic.svg" alt="profile-pic" />
          </div>
          <h1>Hi! I'm Bethany</h1>
          <p>
            Here is some information about me: I'm interested in environmental engineering 
            and veterinary science. I hope to go to a school with a strong STEM program.  
            Click on one of the scholarships below to decide which one is right for me.
          </p>
        </div>

        <div className="scholarship-info">
          {scholarshipInfo ? (
            <div>
              <h2>{scholarshipInfo.name}</h2>
              <p><strong>Sponsor:</strong> {scholarshipInfo.sponsor}</p>
              <p><strong>Amount:</strong> ${scholarshipInfo.amount.toLocaleString()}</p>
              <p><strong>Weeks Left:</strong> {scholarshipInfo.weeksLeft.toLocaleString()}</p>
              <p><strong>Description:</strong> {scholarshipInfo.description}</p>
            </div>
          ) : (
            <p>{initialText}</p>
          )}
        </div>
      </div>

      <div className="scholarship-btn-group">
        {currentScholarships.map((item, index) => (
          <button
            key={`${questionId}-${item.id}`}
            onClick={() => {
              setSelectedScholarshipId(item);
              setScholarshipInfo(item);
              setSubmitVisible(true);
            }}
          >
            Scholarship {index + 1}
          </button>
        ))}
      </div>

      {submitVisible && !isGameOver && (
        <button
          className="submit-answer-button"
          onClick={() => {
            if (selectedScholarshipId) {
              submitAnswer(selectedScholarshipId.id, (isCorrect) => {
                setFeedbackPopup({ visible: true, isCorrect });
              });
              setSubmitVisible(false);
              setSelectedScholarshipId(null);
              setScholarshipInfo(null);
            } else {
              alert("Please select a scholarship before submitting.");
            }
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Minigame1;