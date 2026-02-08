import React from 'react';

function testClick(){
  alert("Always starts from nothing");
}

const Minigame2: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hi! I'm Game 2</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Budget Planner Module Loaded ✓</p>

      <button onClick={testClick}>
        1
        <br></br>
        placeholder
      </button>
      
      <button onClick={testClick}>
        2
        <br></br>
        placeholder
      </button>

      
      <button onClick={testClick}>
        3
        <br></br>
        placeholder
      </button>

      
      <button onClick={testClick}>
        4
        <br></br>
        placeholder
      </button>
      
      <button onClick={testClick}>
        5
        <br></br>
        placeholder
      </button>
    </div>
  );
};

export default Minigame2;
