import {useState} from 'react';
import questionDataStore from "./questions.json";

export interface questionData {
    id: number
    question: string;
    rateEarned: number;
    answer: number;
}

//hard-coded question bank for ease of use; first question = tutorial level to play around with.
//may not need anymore
// const questionBank: questionData[] =[
//     //{id: 0, question: "This is the tutorial question and the question text will appear here! Try clicking the calendar buttons to switch between day and work to earn 30 coins!", rateEarned: 10, answer:30},
//     {id: 1, question: "earn 75 coins!", rateEarned: 25, answer: 75},
//     {id: 2, question: "earn 28 coins!", rateEarned:7, answer:28},
//     {id:3, question: "earn 45 coins!", rateEarned:9, answer:45}
// ];

//CHANGE:
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
            alert("All levels done! Finish Screen goes here")
        }
    };

//keep track of score, best out of 3 using submit button information

    return {currentQuestion, nextQuestion, questionCount: (questionBank.length)}
}