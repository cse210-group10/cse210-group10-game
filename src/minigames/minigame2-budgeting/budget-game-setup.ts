import { useCalendarLogic } from "./calendar-logic"; // button logic
import { useQuestionLogic } from "./question-logic"; // question logic
import { useState } from "react"; // ties logic together for actual game
import type { ProgressApi } from "../../types/Minigame";

export const useBudgetGameLogic = (progressApi?: ProgressApi) => {
  const [title, setTitle] = useState("Budgeting Mini-Game");
  const [content, setContent] = useState("Welcome to the budgeting mini-game! Here, we will learn about...");
  const [last, setLast] = useState(false);
  console.log({title}, {content})

  //game logic set-up
  const {workDays, totalWorkDays, toggleDay, resetButtons} = useCalendarLogic(5);
  const {currentQuestion, nextQuestion, questionCount} = useQuestionLogic();
  
  //check player's correct and incorrect answers; always starts at 0
  const [progress, setProgress] = useState({correct: 0, incorrect: 0});

  //math to check progress on answer
  const currentIncome = totalWorkDays * currentQuestion.rateEarned;

  //submit answer button
  const submitAnswer = () => {
    //boolean to check if answer is right, need local answer to get progress for future sprints
    const isCorrect = currentIncome === currentQuestion.answer;
    
    //calculate number correct AND incorrect (if needed)
    const correctCount = isCorrect ? progress.correct + 1 : progress.correct;
    const incorrectCount = !isCorrect ? progress.incorrect + 1: progress.incorrect;

    if (isCorrect){
      setTitle("Correct!");
      setContent("You got this question right!")
      setProgress(prev => ({...prev, correct: prev.correct + 1}));
      // Mark question as correct. currentQuestion.id is 1-based;
      // subtract 1 to convert to 0-based index for progress API.
      progressApi?.markCorrect(currentQuestion.id - 1);
    }else{
      const difference = currentQuestion.answer - currentIncome;
      setTitle("Close!");
      setContent("You are "+Math.abs(difference)+" coins off. Let's try on the next one!");
      setProgress(prev => ({...prev, incorrect: prev.incorrect + 1}));
      // Mark question as incorrect. currentQuestion.id is 1-based;
      // subtract 1 to convert to 0-based index for progress API.
      progressApi?.markIncorrect(currentQuestion.id - 1);
    }
    //resets buttons and goes to next question
    nextQuestion();
    resetButtons();
    //add end of screen pop-up here
  if ( (currentQuestion.id) === questionCount){
    setTitle("Game Over!");
    setContent("You got: "+correctCount+" out of "+questionCount+" correct! and missed "+incorrectCount+"."); 
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