import {useState} from 'react';

export interface questionData {
    id: number
    question: string;
    rateEarned: number;
    answer: number;
}

//hard-coded question bank for ease of use
const questionBank: questionData[] =[
    {id: 1, question: "earn 75 coins!", rateEarned: 25, answer: 75},
    {id: 2, question: "earn 28 coins!", rateEarned:7, answer:28},
    {id:3, question: "earn 45 coins!", rateEarned:9, answer:45}
];

//question logic to advance to next question, without knowing logic behind moving to next question
export const useQuestionLogic = () => {
    const [levelId, setLevelId] = useState(0);
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