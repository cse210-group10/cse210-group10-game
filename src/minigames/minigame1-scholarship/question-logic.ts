import {useState, useEffect} from 'react';
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
    weeksLeft: number;
    sponsor: string;
    amount: number;
    description: string;
    rankings: number[]; 
}

function getChosenArray(min: number, max: number): number[] {
  const chosenSet = new Set<number>();
  while (chosenSet.size < 4) { // 4 is the amount of answer choices
    chosenSet.add(Math.floor(Math.random() * (max - min) + min));
  }
  return Array.from(chosenSet);
}

// hard-coded question bank for ease of use
const currentScholarships: ScholarshipData[] =[...scholarshipBank.scholarships];

// let chosenIds = getChosenArray(0, currentScholarships.length);

// export const selectedEntries = currentScholarships.filter((scholarshipEntry) => chosenIds.includes(scholarshipEntry.id));

// Custom hook to manage scholarship question logic
export const useScholarshipLogic = (characterIndex: number) => {
  const [questionId, setQuestionId] = useState(0);
  const [progressCount, setProgressCount] = useState({ correct: 0, incorrect: 0 });
  const [progressArray, setProgressArray] = useState<(boolean | null)[]>([null, null, null, null, null]);
  const [scholarshipsForThisRound, setScholarshipsForThisRound] = useState<ScholarshipData[]>([]);

  // Initialize scholarships when questionId changes
  useEffect(() => {
    if (questionId < 5) {
      const chosenIds = getChosenArray(0, currentScholarships.length);
      const scholarships = currentScholarships.filter((scholarship) => 
        chosenIds.includes(scholarship.id)
      );
      setScholarshipsForThisRound(scholarships);
    }
  }, [questionId]);

  // Check if selected scholarship is the best match for this character
  const validateAnswer = 
                        (selectedScholarshipId: number, 
                        scholarshipsForThisRound: ScholarshipData[]): boolean => {
    console.log("validateAnswer called");
    // Get the rankings for this specific character from each of the 4 scholarships
    const characterScholarshipRankings = [];
    for (let i = 0; i < scholarshipsForThisRound.length; i++) {
      characterScholarshipRankings.push(scholarshipsForThisRound[i].rankings[characterIndex]);
    }
    console.log("Character rankings:", characterScholarshipRankings);
    let maxRanking = Math.max(...characterScholarshipRankings);
    let bestScholarshipIndex = characterScholarshipRankings.indexOf(maxRanking);
    let bestScholarshipId = scholarshipsForThisRound[bestScholarshipIndex].id;
    console.log("Best scholarship ID:", bestScholarshipId, "Selected ID:", selectedScholarshipId);
    return selectedScholarshipId === bestScholarshipId;
  };

  // Move to next question round
  const nextQuestion = () => {
    console.log("nextQuestion called. Current questionId:", questionId);
    if (questionId < 4) {
      console.log("Incrementing to next question");
      setQuestionId(prev => prev + 1);
    } else {
      console.log("Game over! Showing alert");
      alert(`Game over! You got ${progressCount.correct} out of 5 correct.`);
    }
  };

  // Handle answer submission
  const submitAnswer = (selectedScholarshipId: number) => {
    
    const isCorrect = validateAnswer(selectedScholarshipId, scholarshipsForThisRound);

    // Update correct count
    if (isCorrect) {
      alert("Correct! Show correct answer feedback here.");
      setProgressCount(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      alert("Incorrect. Show incorrect answer feedback here.");
      setProgressCount(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    // Update array of correct and incorrect booleans for the progress bar
    const updatedProgressArray = [...progressArray];
    updatedProgressArray[questionId] = isCorrect;
    setProgressArray(updatedProgressArray);
    
    nextQuestion();

  };

  return {
    currentScholarships: scholarshipsForThisRound,
    questionId,
    progressCount,
    progressArray,
    validateAnswer,
    nextQuestion,
    submitAnswer,
    totalQuestions: 5
  };
};
