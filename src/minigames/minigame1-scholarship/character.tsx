import React from "react";
import "./styles.css";
import { useState } from "react";
import type { ScholarshipData } from "./question-logic";
import scholarshipBank from './scholarshipBank.json';

const scholarshipBankData: ScholarshipData[] = scholarshipBank.scholarships;


// Shows the page for scholarship minigame 1
const ScholarshipCharacter: React.FC = () => {

  // text for the initial state
  const initialText = "Please select one of the scholarships with the buttons below.";
  //state variable to change scholarship based on button click
  const [scholarshipInfo, setScholarshipInfo] = useState<ScholarshipData | null>(null);

   // Display submit button when a scholarship is clicked on
  const [submitVisible, setSubmitVisible] = useState(false);
  function handleSubmitClick() {
    setSubmitVisible(true);
  }

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
              <p><strong>Due Date:</strong> {scholarshipInfo.dueDate}</p>
              <p><strong>Description:</strong> {scholarshipInfo.description}</p>
            </div>
          ) : (
            <p>{initialText}</p>
          )}
        </div>
      </div>

      {/* Buttons to view different scholarhship options */}
      <div className="scholarship-btn-group">
        
        <button className="scholarship-button" 
        onClick={() => {
          handleSubmitClick(); 
          setScholarshipInfo(scholarshipBankData[0]);
        }} 
        aria-label="first-scholarship-button">
          Scholarship 1
        </button>

        <button className="scholarship-button" 
        onClick={() => {
          handleSubmitClick(); 
          setScholarshipInfo(scholarshipBankData[1]);
        }} 
        aria-label="second-scholarship-button">
          Scholarship 2
        </button>

        <button className="scholarship-button" 
        onClick={() => {
          handleSubmitClick(); 
          setScholarshipInfo(scholarshipBankData[2]);
        }} 
        aria-label="third-scholarship-button">
          Scholarship 3
        </button>

        <button className="scholarship-button" 
        onClick={() => {
          handleSubmitClick(); 
          setScholarshipInfo(scholarshipBankData[3]);
        }} 
        aria-label="fourth-scholarship-button">
          Scholarship 4
        </button>

      </div>

        {/* Submit button will be visible when one of the scholarship buttons have been selected */}
        {submitVisible && (
          <button className="submit-answer-button">
            Submit
          </button>
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
