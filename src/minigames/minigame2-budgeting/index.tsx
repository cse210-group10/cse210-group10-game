import React from 'react';
import './styles.css';

export const metadata = {
  title: "Budget Planner",
  description: "Placeholder",
  id: "level-2"
};

//test function for each button click
function testClick(){
  alert("Always starts from nothing");
}

const Minigame2: React.FC = () => {
  
  /* testing refactor for each button to look nicer*/
  const dayLabels = [1,2,3,4,5];

  // not sure on this mini-game level2 container\
  return (
    <div className="minigame-level2-container">
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 2</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Budget Planner Module Loaded ✓</p>

      {/* testing map feature, much more convenient over manually coding 5 times **/}
      <div className='button-container-row'>
      {dayLabels.map((dayLabels) => (
        <button key ={dayLabels} onClick={testClick} className='calendar-button'>
          {dayLabels}
          <br/>
          rest
          </button>
      ))}
      </div>

    </div>
  );
};

export default Minigame2;
