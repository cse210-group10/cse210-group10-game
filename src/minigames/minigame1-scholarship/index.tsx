import React, { useState } from "react";
import type { MinigameProps, MinigameResult } from "../../types/Minigame";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

export const metadata = {
  title: "Scholarship Matcher",
  description:
    "Placeholder",
  id: "level-1",
};

// const result: MinigameResult = {  
//   stars: 1, 
// }
// reference code for how to use stars onComplete for minigames

const Minigame1: React.FC<MinigameProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  
  // Function to navigate to start of the minigame
  const handleMinigame1Start = () => {
    navigate('/minigame/level-1/character');
  };
  
  return (

    // Placeholder information about how to play the game
    <div className="minigame-level1-container">
      <h1>Scholarships</h1>

      <div className="minigame-content">
        <p>
          Welcome to your first lesson! We are going to talk about scholarships and saving for college. 
        </p>

        <p>
          It costs money to attend college. When you attend college, you have to pay for tuition 
          which generally covers classes and teaching. But there are also other costs such as paying 
          for food, a place to live, and books for class. It can be very expensive, so it is important 
          to make wise decisions when it comes to college. 
        </p>

        <p>
          Education is an investment. 
        </p>

        <p>
          This means that you are putting money, effort, and time into your education in hopes of 
          getting something greater out of it. College might lead to a better job, better opportunities, 
          or growth to you as a person. These could be reasons for why you are willing to pay a lot of money for your education. 
        </p>

        <p>
          One thing you might consider to help you pay for college are scholarships. 
          You can get scholarships for athletics or academic achievement. 
          What's nice about scholarships is that, unlike loans,  you don't have to pay them back! 
          So think about your interests and the skills you have, and try to find scholarships that apply to you. 
        </p>

        <p>
          Remember, you might have to write an essay or fill out an application, 
          so make sure you are looking at these scholarships well before you apply to college to 
          give yourself enough time to complete the requirements for the scholarship.
        </p>

        <p>
          Another thing to be careful of are scams! People online might pretend to be a 
          legitimate scholarship when really they just want to get your money. 
          If the scholarship asks for an application fee, it is likely a scam!
        </p>

        <p>
          To find legitimate scholarships look at the colleges you plan on applying to, 
          government organizations, or some private organizations like non-profits and corporations.
        </p>

        <p>
          Most of this information about scholarships and applying to college is from  khan academy, 
          so if you want more information or want to review, check out their resources:
        </p>

        <p>
          There are many scholarships, but here are just a few that you might want to check out: &nbsp; 
          <a href="https://www.khanacademy.org/college-careers-more/financial-literacy/xa6995ea67a8e9fdd:careers-and-education">Link to Khan Academy</a>
        </p>

        <ul>
          <li><a href="https://www.thegatesscholarship.org/scholarship">The Gates Scholarship</a></li>
          <li><a href="https://www.jkcf.org/our-scholarships/">The Jack Kent Cooke Foundation Scholarship</a></li>
          <li><a href="https://www.coca-colascholarsfoundation.org/apply/">The Coca-Cola Scholars Foundation</a></li>
          <li><a href="https://www.smartscholarship.org/smart">The SMART Scholarship</a></li>
          <li><a href="https://ronbrown.org/">Ron Brown Scholar Program</a></li>
          <li><a href="https://www.hsf.net/scholarship">HSF Scholar Program</a></li>
          <li><a href="https://apiascholars.org/scholarships/">APIA Scholarship</a></li>
          <li><a href="https://www.dellscholars.org/">Dell Scholars</a></li>
          <li><a href="https://scholarshipamerica.org/scholarship/burgerking/">BURGER KING℠ Scholars</a></li>
          <li><a href="https://fellowshipsearch.baruch.cuny.edu/fellowship/women-techmakers-scholars-program/">Women Techmakers Scholars Program</a></li>
        </ul>  
      </div>
      
      {/* navigate to start of the minigame */}
        <button className="start-minigame1-button" onClick={handleMinigame1Start}>
          Start game
        </button>


      {/* <button onClick={() => onComplete(result)}>
        Placeholder Button
      </button>  */}
    </div>
  );
};

export default Minigame1;



