import {useState} from 'react';
import * as scholarshipBank from './scholarshipBank.json';


/*
Scholarship data interface: content for one scholarship.
    id: number;             -> scholarship ID in the dataset
    name: string;           -> name of scholarship
    dueDate: string;        -> due date of scholarship (Month Day, Year)
    sponsor: string;        -> name of organization sponsoring the scholarship
    amount: number;         -> amount for scholarship
    description: string;    -> a general description for the scholarship
    rankings: number[];     -> a 5-element array representing the rankings for each character
                            -> ranking = num [0,1] where 1 is very relevant / top choice out of all the scholarships
*/
export interface ScholarshipData {
    id: number;
    name: string;
    dueDate: string;
    sponsor: string;
    amount: number;
    description: string;
    rankings: number[]; 
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