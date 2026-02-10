import React from 'react';
import CalendarButton from './calendar-button'; //buttons for interactive counter
import { useCalendarLogic } from './calendar-logic'; //math logic for interactive counter
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

//test function for each button click, outdated / not needed anymore. will delete soon
function testClick(){
  alert("Always starts from nothing");
}

const Minigame2: React.FC = () => {
  
  //new version, logic handled entirely by calendar-logic manager
  const {workDays, toggleDay, totalWorkDays} = useCalendarLogic(5);

  //helper function: set up the calendar views to be placed in corners of the buttons
  const renderDateNumber = (isWork: boolean, index: number) => {
    const day = index + 1

    return (
      <CalendarButton key={index} dayNumber={day} isWork={isWork} onToggle={() => toggleDay(index)}/>
    );
  };

  // not sure on this mini-game level2 container\
  return (
    <div className="minigame-level2-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 2</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Budget Planner Module Loaded ✓</p>
      
      {/*Counter Display to check each work day, can reintegrate math logic later in calendar logic*/}
      <h2>Total Work Days: {totalWorkDays}</h2>
      
      {/* testing map feature, much more convenient over manually coding 5 times **/}

      {/*2nd update: made the button a customComponent so that it has the functionality seen on mock-up*/}
      <div className='button-container-row'>
        {/*logic hook from calendar-logic controller file being used here from helper function;
          maps each array value found in workDays ([false x 5]) and ties it to a number, its boolean value and its toggle function,
          making a calendar-button. It does this 5 times to set up the interactivity for the game.
        
        */}
        {workDays.map(renderDateNumber)}
      </div>

    </div>
  );
};

export default Minigame2;
