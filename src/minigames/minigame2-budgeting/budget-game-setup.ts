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

    /* MINIGAME SECTION */

    if (isCorrect){
      setTitle("Correct!");
      setContent("You got this question right!")
      if (!isTutorial){
        setProgress(prev => ({...prev, correct: prev.correct + 1}));
        // Mark question as correct. currentQuestion.id is 1-based;
        // subtract 1 to convert to 0-based index for progress API.
        progressApi?.markCorrect(currentQuestion.id - 1);
      }
    }else{
      //find missing amount
      const difference = currentQuestion.answer - currentIncome;
      //calculate over / under
      const status = difference > 0 ? "under" : "over"; //positive difference = overkill, negative difference = missed the target
      setTitle("Close!");
      setContent("You are " + Math.abs(difference) + " coins " + status + ". Let's try on the next one!");
      setProgress(prev => ({...prev, incorrect: prev.incorrect + 1}));
      // Mark question as incorrect. currentQuestion.id is 1-based;
      // subtract 1 to convert to 0-based index for progress API.
      progressApi?.markIncorrect(currentQuestion.id - 1);
    }
    //resets buttons and goes to next question
    nextQuestion();
    resetButtons();
    //add end of screen pop-up here
  if ( (currentQuestion.id) === questionCount - 1){
    setTitle("Game Over!");
    setContent("You got: "+correctCount+" out of "+(questionCount - 1)+" correct! and missed "+incorrectCount+"."); 
    setLast(true);
    }
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