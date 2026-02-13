import { useCalendarLogic } from "./calendar-logic"; // button logic
import { useQuestionLogic } from "./question-logic"; // question logic
import { useState } from "react"; // ties logic together for actual game

export const useBudgetGameLogic = () => {
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
      alert("Correct! Insert Correct Pop-up here!")
      setProgress(prev => ({...prev, correct: prev.correct + 1}));
    }else{
      const difference = currentQuestion.answer - currentIncome;
      alert(`Close but not correct. You are ${Math.abs(difference)} coins$ off. Let's try on the next one! (Insert incorrect pop-up here)`)
      setProgress(prev => ({...prev, incorrect: prev.incorrect + 1}));
    }
    //resets buttons and goes to next question
    nextQuestion();
    resetButtons();
    //add end of screen pop-up here
    if ( (currentQuestion.id) === questionCount){
        alert(`Game over! You got: ${correctCount}$ out of ${questionCount}$ correct!`);
    }
  };
  return {
    workDays,
    toggleDay,
    totalWorkDays,
    currentQuestion,
    currentIncome,
    submitAnswer

  };
};