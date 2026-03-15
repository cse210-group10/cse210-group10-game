import { useQuestionLogic } from "./question-logic"; // question logic
import { useState } from "react"; // ties logic together for actual game
import type { ProgressApi } from "../../types/Minigame";
import type { PopupProps } from "../../types/General";

export const useAnswerLogic = (initialLevel: number = 0, totalWorkDays: number, progressApi?: ProgressApi) => {
  // main popup variables
  const [popupProps, setPopupProps] = useState<PopupProps>({
    title: "Budgeting Mini-Game",
    content: "Welcome to the budgeting mini-game! Here, we will learn about..."
  });
  const [endPopupProps, setEndPopupProps] = useState<PopupProps>({
    title: "Game Over!",
    content: "You have completed the budgeting mini-game! Great job!"
  });
  // title={"Game Over!"}
  //         

  // take questionlogic use
  const {currentQuestion, nextQuestion, questionCount} = useQuestionLogic(initialLevel);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [last, setLast] = useState(false);

  const [progress, setProgress] = useState({correct: 0, incorrect: 0});

  //math to check progress on answer
  const currentIncome = totalWorkDays * currentQuestion.rateEarned;

  const submitAnswer = () => {
    //boolean to check if answer is right, need local answer to get progress for future sprints
    const isCorrect = currentIncome === currentQuestion.answer;
    //tutorial check
    const isTutorial = currentQuestion.id === 0;
    setLast(currentQuestion.id >= questionCount - 1);

    if (isTutorial){
      if (isCorrect){
        setPopupProps({
          title: "Correct!",
          content: "You got this question right. This ends the tutorial"
        });
          
        // setContent("You got this question right. This ends the tutorial")
      } else {
        setPopupProps({
          title: "Incorrect...",
          content: "You got this question wrong... Try flipping days to be the exact value!"
        });
        // setTitle("Incorrect...");
        // setContent("You got this question wrong... Try flipping days to be the exact value!")      
        return;
      }
    } else {
      if (isCorrect){
        //handle message for correct answer
        setPopupProps({
          title: "Correct!",
          content: isTutorial ? "You got this question right. This ends the tutorial" : "You got this question right"
        });
        // setContent(isTutorial ? "You got this question right. This ends the tutorial" : "You got this question right")
        setCorrectQuestions(prev => prev + 1);

        setProgress(prev => ({...prev, correct: prev.correct + 1}));
        // Mark question as correct. currentQuestion.id is 1-based;
        // subtract 1 to convert to 0-based index for progress API.
        progressApi?.markCorrect(currentQuestion.id - 1);
      }else{
        //find missing amount
        const difference = currentQuestion.answer - currentIncome;
        //calculate over / under
        const status = difference > 0 ? "short" : "over"; //positive difference = overkill, negative difference = missed the target

        //incorrect message (changes based on final question statement)
        setPopupProps({
          title: "Incorrect!",
          content: "Sorry... You are " + Math.abs(difference) + " coins " + status + ". Let's try on the next one!"
        });
        // setContent("Sorry... You are " + Math.abs(difference) + " coins " + status + ". Let's try on the next one!");

        setProgress(prev => ({...prev, incorrect: prev.incorrect + 1}));
        // Mark question as incorrect. currentQuestion.id is 1-based;
        // subtract 1 to convert to 0-based index for progress API.
        progressApi?.markIncorrect(currentQuestion.id - 1);
      }
    }
    if (last) {
      setEndPopupProps({
        title: endPopupProps.title,
        content: "You got: " + Number(correctQuestions) + " out of "+(questionCount - 1)+
          " correct! and missed " + Number(currentQuestion.id-correctQuestions) + "."
      });
    }
    nextQuestion();
  };
  return {
    currentQuestion,
    currentIncome,
    submitAnswer,
    popupProps,
    endPopupProps,
    progress, //for tests
    last,
  };
};