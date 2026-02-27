import { useCalendarLogic } from "./calendar-logic"; // button logic
import { useQuestionLogic } from "./question-logic"; // question logic
import { useState } from "react"; // ties logic together for actual game
import type { ProgressApi } from "../../types/Minigame";

export const useBudgetGameLogic = (progressApi?: ProgressApi, initialLevel: number = 0) => {
  const [title, setTitle] = useState("Budgeting Mini-Game");
  const [content, setContent] = useState("Welcome to the budgeting mini-game! Here, we will learn about...");
  const [last, setLast] = useState(false);
  console.log({title}, {content})

  //game logic set-up
  const {workDays, totalWorkDays, toggleDay, resetButtons} = useCalendarLogic(5);
  const {currentQuestion, nextQuestion, questionCount} = useQuestionLogic(initialLevel);
  
  //check player's correct and incorrect answers; always starts at 0
  const [progress, setProgress] = useState({correct: 0, incorrect: 0});

  //math to check progress on answer
  const currentIncome = totalWorkDays * currentQuestion.rateEarned;

  //submit answer button
  const submitAnswer = () => {
    //boolean to check if answer is right, need local answer to get progress for future sprints
    const isCorrect = currentIncome === currentQuestion.answer;
    
    //tutorial check
    const isTutorial = currentQuestion.id === 0;

    //final question check
    const isFinalQuestion = currentQuestion.id === questionCount - 1;

    //calculate number correct AND incorrect (if needed)
    const correctCount = (!isTutorial && isCorrect) ? progress.correct + 1 : progress.correct;
    const incorrectCount = (!isTutorial && !isCorrect) ? progress.incorrect + 1: progress.incorrect;

    /*  TUTORIAL SECTION (to keep the game stuck in tutorial until passed) */

    if(isTutorial && !isCorrect){
      setTitle("Incorrect...");
      setContent("You got this question wrong... Try flipping days to be the exact value!")
      //stop function early
      return;
    }


    /* POP-UP TITLE MESSAGE + CONTENT */
    let resultTitle = isCorrect ? "Correct!" : "Incorrect...";
    let resultContent = "";

    /*  CHECK ANSWER SECTION */

    if (isCorrect){
      //handle message for correct answer
      resultContent = isTutorial ? "You got this question right. This ends the tutorial" : "You got this question right";
    //calculate difference
    }else{
      //find missing amount
      const difference = currentQuestion.answer - currentIncome;
      //calculate over / under
      const status = difference > 0 ? "short" : "over"; //positive difference = overkill, negative difference = missed the target

      //incorrect message (changes based on final question statement)
      resultContent = "Sorry... You are " + Math.abs(difference) + " coins " + status;
      
      // resultContent = "You are " + Math.abs(difference) + " coins " + status + ". Let's try on the next one!";
    }

    if (!isTutorial){
      if(isCorrect){
        setProgress(prev => ({...prev, correct: prev.correct + 1}));
        // Mark question as correct. currentQuestion.id is 1-based;
        // subtract 1 to convert to 0-based index for progress API.
        progressApi?.markCorrect(currentQuestion.id - 1);
      }else{
        setProgress(prev => ({...prev, incorrect: prev.incorrect + 1}));
        // Mark question as incorrect. currentQuestion.id is 1-based;
        // subtract 1 to convert to 0-based index for progress API.
        progressApi?.markIncorrect(currentQuestion.id - 1);
      }
    }

    

    //Display mid-game progress or end of game stats
    if (isFinalQuestion){
      // setTitle("Game Over!");
      // setContent("You got: "+correctCount+" out of "+(questionCount - 1)+" correct! and missed "+incorrectCount+"."); 
      resultTitle = "Game Over!"
      resultContent = resultContent + "... You got: "+correctCount+" out of "+(questionCount - 1)+" correct and missed "+incorrectCount+".";
      setLast(true);
    //mid game progress
    }else{
      resultContent = resultContent + ", let's keep going!";
    }

    //resets buttons and goes to next question
    nextQuestion();
    resetButtons();
    //display answer results
    setTitle(resultTitle);
    setContent(resultContent);
  };
  return {
    workDays,
    toggleDay,
    totalWorkDays,
    currentQuestion,
    currentIncome,
    submitAnswer,
    title,
    content,
    progress, //for tests
    last,
    questionCount, // for progress bar initialization
  };
};