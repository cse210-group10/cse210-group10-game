import React from "react";
import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useScholarshipLogic, type ScholarshipData } from "./question-logic";
import Popup from "../../components/Popup";




// Shows the page for scholarship minigame 1
const ScholarshipCharacter: React.FC = () => {

  // text for the initial state
  const initialText = "Please select one of the scholarships with the buttons below.";

  const navigate = useNavigate();
  const characterIndex = 0; // 0-4 for the 5 different characters
  const { currentScholarships, submitAnswer, totalCorrect, progressArray, questionId, isGameOver } = useScholarshipLogic(characterIndex);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<number | null>(null);
  //state variable to change scholarship based on button click
  const [scholarshipInfo, setScholarshipInfo] = useState<ScholarshipData | null>(null);

   // Display submit button when a scholarship is clicked on
  const [submitVisible, setSubmitVisible] = useState(false);
  const handledGameOverRef = useRef(false);

  const [showPopup, setShowPopup] = useState(false);

  // Debug: log when props change
  console.log("Component rendered. QuestionId:", questionId, "currentScholarships count:", currentScholarships.length, "selectedId:", selectedScholarshipId, "submitVisible:", submitVisible);

  useEffect(() => {
    if (!isGameOver || handledGameOverRef.current) return;

    handledGameOverRef.current = true;
    setShowPopup(true);
  }, [isGameOver]);

  return (

    <div className="minigame-level1-container">
      
      {/* container for the character info and scholarship info*/}
      <div className="scholarship-compare">
        <div className="profile">
          <div className="profile-pic">
            {/* source for image: https://undraw.co/ */}
            <img src="/src/minigames/minigame1-scholarship/undraw_profile-pic.svg" alt="profile-pic" />
          </div>
          
          {/* This is placeholder text */}
          <h1>Hi! I'm Bethany</h1>
          <p>
            Here is some information about me: I'm interested in environmental engineering 
            and veterinary science. I hope to go to a school with a strong STEM program.  
            Click on one of the scholarships below to decide which one is right for me.
          </p>
        </div>

        {/* Displays the currently selected scholarship */}
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

      {/* Buttons to view different scholarhship options */}
      <div className="scholarship-btn-group">
        {currentScholarships.map((item, index) => (
          <button
            key={`${questionId}-${item.id}`} // force fresh buttons per round
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

        {/* Submit button will be visible when one of the scholarship buttons have been selected */}
        {submitVisible && !isGameOver && (
          <button
            className="submit-answer-button"
            onClick={() => {
              if (selectedScholarshipId) {
                submitAnswer(selectedScholarshipId);
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

        {showPopup && (
          <Popup
            title="Game Over!"
            content={`You got ${totalCorrect.correct} out of 5 correct.`}
            onClose={() => {
              setShowPopup(false);
              navigate("/map", { replace: true }); // use your real main route
            }}
          />
        )}
    </div>
  );
};

export default ScholarshipCharacter

// source for useState: https://legacy.reactjs.org/docs/hooks-state.html
// source for useState: https://react.dev/reference/react/useState 
// source for buttons: https://www.w3schools.com/howto/howto_css_button_group.asp 
// source for multiple onClick events: https://dev.to/dimer191996/multiple-onclick-events-in-react-with-examples-3lfc
// source for making button appear after click: https://bobbyhadz.com/blog/react-onclick-show-component 
