import { useCalendarLogic } from "./calendar-logic"; // button logic
import { useQuestionLogic } from "./question-logic"; // question logic
import { useState } from "react"; // ties logic together for actual game

export const useBudgetGameLogic = (initialLevel: number = 0) => {
  //game logic set-up
  const {workDays, totalWorkDays, toggleDay, resetButtons} = useCalendarLogic(5);
  //CHANGE: Optional skip feature if the number 0 is replaced with any other value on function call
  const {currentQuestion, nextQuestion, questionCount} = useQuestionLogic(initialLevel);
  //check player's correct and incorrect answers; always starts at 0
  const [progress, setProgress] = useState({correct: 0, incorrect: 0});

  //math to check progress on answer
  const currentIncome = totalWorkDays * currentQuestion.rateEarned;

  //submit answer button
  const submitAnswer = () => {
    //boolean to check if answer is right, need local answer to get progress for future sprints
    const isCorrect = currentIncome === currentQuestion.answer; // need to change; outside frined found bug in very casual usability study

    //calculate number correct AND incorrect (if needed)
    const correctCount = isCorrect ? progress.correct + 1 : progress.correct;
    const incorrectCount = !isCorrect ? progress.incorrect + 1: progress.incorrect;

    /* TUTORIAL SECTION; still implementing */

    //variable changes to not count tutorial question
    // const correctCount = (!isTutorial && isCorrect) ? progress.correct + 1 : progress.correct;
    // const incorrectCount = (!isTutorial &&!isCorrect) ? progress.incorrect + 1: progress.incorrect;
    //const isTutorial = currentQuestion.id === 0; // bool value designed to be used only for tutorial question

    // if(isTutorial && !isCorrect){
    //   //pop-up logic goes here
    //   alert("Almost there but not quite... Try flipping days to be the exact value! (insert pop-up here)")
    //   return; // stops function early but should be recalled
    // }

    /* MINI-GAME SECTION */

    if (isCorrect){
      alert("Correct! Insert Correct Pop-up here!")
      setProgress(prev => ({...prev, correct: prev.correct + 1}));
    }else{
      
      // find difference between answer and choice, Priorities: thematic integrity over mechanical correctness, so turning in a value over target = wrong
      //will highlight in introduction
      const difference = currentQuestion.answer - currentIncome;

      //Status: determines how much the player over-earned or how much they under-performed
      const status = difference > 0 ? "under" : "over"; //positive difference = overkill, negative difference = missed the target

      alert(`Close but not correct. You are ${Math.abs(difference)} coins ${status} the budget. Let's try on the next one! (Insert incorrect pop-up here)`)
      setProgress(prev => ({...prev, incorrect: prev.incorrect + 1}));
    }
    //resets buttons and goes to next question
    nextQuestion();
    resetButtons();
    //add end of screen pop-up here
    //Change: adding tutorial as 0th index so i need to account for 0 index with this check now
    if ( (currentQuestion.id) === questionCount - 1){
        alert(`Game over! You got: ${correctCount} out of ${questionCount}, missing ${incorrectCount} questions total.`);
    }
  };
  return {
    workDays,
    toggleDay,
    totalWorkDays,
    currentQuestion,
    currentIncome,
    submitAnswer,
    progress //for tests

  };
};