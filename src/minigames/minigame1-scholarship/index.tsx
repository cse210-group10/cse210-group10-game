import React from "react";
import { useState, useEffect, useRef } from "react";
import type { MinigameProps } from "../../types/Minigame";
import "./styles.css";
import { useScholarshipLogic, type ScholarshipData } from "./question-logic";
import characterBank from "./characterBank.json";
import Popup from "../../components/Popup";
import PopupLesson from "../../components/PopupLesson";

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Question-based minigame where players match a student's profile to the best scholarship based on the scholarship's criteria and the student's needs.",
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

const Minigame1: React.FC<MinigameProps> = ({ onComplete, progress }) => {
  const initialText = "Please select one of the scholarships with the buttons below.";
  const { currentScholarships, submitAnswer, totalCorrect, questionId, totalQuestions, isGameOver } = useScholarshipLogic();
  const currentCharacter = characterBank[questionId];
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
    progress?.init(totalQuestions);
  }, [progress, totalQuestions]);

  useEffect(() => {
    if (!isGameOver || feedbackPopup.visible || handledGameOverRef.current) return;
    handledGameOverRef.current = true;
    setShowPopup(true);
  }, [isGameOver, feedbackPopup.visible]);

  const stars = totalCorrect.correct >= 4 ? 3 : totalCorrect.correct >= 2 ? 2 : 1;

  return (
    <div className="minigame-level1-container">

      {showPopupLesson && (lessonID != lastLessonID) &&(
        <PopupLesson
        title= {title}
        contentID={lessonID}
        onClickNext={() => setLessonID(prev => prev + 1)}
        />
      )}

      {/* feedback popup after each question */}
      {feedbackPopup.visible && (
        <Popup
          title={feedbackPopup.isCorrect ? "Correct!" : "Incorrect"}
          content={feedbackPopup.isCorrect
            ? "Great job! That scholarship is the best match."
            : "Not quite! Try to match the scholarship to the student's needs."}
          onClose={() => {
            setFeedbackPopup({ visible: false, isCorrect: false });

            // Match MG2 flow: on final question, show result feedback first,
            // then show Game Over only after the feedback popup is dismissed.
            if (isGameOver) {
              handledGameOverRef.current = true;
              setShowPopup(true);
            }
          }}
        />
      )}
      {showPopup && (
        <Popup
          title="Game Over!"
          content={`You got ${totalCorrect.correct} out of ${totalQuestions} correct.`}
          onClose={() => {
            setShowPopup(false);
            onComplete({ stars, levelId: 'level-1' });
          }}
        />
      )}

      <div className="scholarship-compare">
       <div className="profile">
          <div className="profile-pic">
            <img src={currentCharacter.profile_pic} alt="profile-pic" />
          </div>
          <div className="profile-info">
            <h1>Hi! I'm {currentCharacter.character}</h1>
            <h2><strong>School year: {currentCharacter.age_school_year}</strong></h2>
            <h2><strong>Location: {currentCharacter.location}</strong></h2>
            <h2><strong>Ethnicity: {currentCharacter.ethnicity}</strong></h2>
            <h2><strong>GPA: {currentCharacter.gpa}</strong></h2>
            <h2><strong>Academic focus: {currentCharacter.academic_focus}</strong></h2>
            <p>{currentCharacter.description}</p>
          </div>
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
            className={selectedScholarshipId?.id === item.id ? "scholarship-option scholarship-option--selected" : "scholarship-option"}
            aria-pressed={selectedScholarshipId?.id === item.id}
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
              const currentQuestionIndex = questionId;

              submitAnswer(selectedScholarshipId.id, (isCorrect) => {
                setFeedbackPopup({ visible: true, isCorrect });
                if (isCorrect) {
                  progress?.markCorrect(currentQuestionIndex);
                  return;
                }
                progress?.markIncorrect(currentQuestionIndex);
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