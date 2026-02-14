import {useState} from 'react';
import * as scholarshipBank from './scholarshipBank.json';



export interface ScholarshipData {
    id: number;
    name: string;
    dueDate: string;
    sponsor: string;
    amount: number;
    description: string;
    rankings: number[]; // [Maria, James, Emily, Marcus, Alex]
}

// hard-coded question bank for ease of use
const questionBank: ScholarshipData[] =[...scholarshipBank.scholarships];

// //question logic to advance to next question, without knowing logic behind moving to next question
// export const useQuestionLogic = () => {
//     const [levelId, setLevelId] = useState(0);
//     const currentQuestion = questionBank[levelId];

//     const nextQuestion = () => {
//         if(levelId < questionBank.length - 1){
//             setLevelId(prev => prev + 1);
//         }else{
//             alert("All levels done! Finish Screen goes here")
//         }
//     };

// //keep track of score, best out of 3 using submit button information

//     return {currentQuestion, nextQuestion, questionCount: (questionBank.length)}
// }