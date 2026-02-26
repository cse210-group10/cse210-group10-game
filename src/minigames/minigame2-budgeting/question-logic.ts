import {useState} from 'react';
import questionDataStore from "./questions.json";

export interface questionData {
    id: number
    question: string;
    rateEarned: number;
    answer: number;
}


//CHANGE: no more hard coded array, moved everything into JSON file
const questionBank = questionDataStore.questions as questionData[];

//question logic to advance to next question, without knowing logic behind moving to next question
//change: added a way to skip around the mini-game for testing purposes


export const useQuestionLogic = (initialLevel: number = 0) => {
    const [levelId, setLevelId] = useState(initialLevel);
    const currentQuestion = questionBank[levelId];

    const nextQuestion = () => {
        if(levelId < questionBank.length - 1){
            setLevelId(prev => prev + 1);
        }else{
            //alert("All levels done! Finish Screen goes here")
        }
    };

//keep track of score, best out of 3 using submit button information

    return {currentQuestion, nextQuestion, questionCount: (questionBank.length)}
}