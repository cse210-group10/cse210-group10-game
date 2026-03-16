import {useState, useEffect} from 'react';
import scholarshipBank from './scholarshipBank.json';
import characterBank from "./characterBank.json";


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

export interface CharacterData {
    id: number;
    character: string;
    location: string;
    age_school_year: string;
    ethnicity: string;
    gpa: number;
    academic_focus: string;
    description: string;
}

  export const SCHOLARSHIP_MINIGAME_TOTAL_QUESTIONS = 5;

function getChosenArray(min: number, max: number): number[] {
  const chosenSet = new Set<number>();
  while (chosenSet.size < 4) { // 4 is the amount of answer choices
    chosenSet.add(Math.floor(Math.random() * (max - min) + min));
  }
  return Array.from(chosenSet);
}

// hard-coded question bank for ease of use
const currentScholarships: ScholarshipData[] =[...scholarshipBank.scholarships];
const currentCharacters: CharacterData[] = [...characterBank];

// Custom hook to manage scholarship question logic
export const useScholarshipLogic = () => {
  const [questionId, setQuestionId] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState({ correct: 0, incorrect: 0 });
  const [progressArray, setProgressArray] = useState<(boolean | null)[]>(
    Array<boolean | null>(SCHOLARSHIP_MINIGAME_TOTAL_QUESTIONS).fill(null)
  );
  const [scholarshipsForThisRound, setScholarshipsForThisRound] = useState<ScholarshipData[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [title] = useState("Scholarship Mini-Game");
  const [content] = useState("Welcome to the scholarship mini-game! Here, we will learn about...");

  // Initialize scholarships when questionId changes
  useEffect(() => {
    if (questionId < SCHOLARSHIP_MINIGAME_TOTAL_QUESTIONS) {
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
    // Use questionId as character index (question 0 = character 0, etc)
    const characterIndex = questionId;
    // Get the rankings for this specific character from each of the 4 scholarships
    const characterScholarshipRankings = [];
    for (let i = 0; i < scholarshipsForThisRound.length; i++) {
      characterScholarshipRankings.push(scholarshipsForThisRound[i].rankings[characterIndex]);
    }
    // console.log("Character rankings:", characterScholarshipRankings);
    let maxRanking = Math.max(...characterScholarshipRankings);
    let bestScholarshipIndex = characterScholarshipRankings.indexOf(maxRanking);
    let bestScholarshipId = scholarshipsForThisRound[bestScholarshipIndex].id;
    // console.log("Best scholarship ID:", bestScholarshipId, "Selected ID:", selectedScholarshipId);
    return selectedScholarshipId === bestScholarshipId;
  };

  // Move to next question round
  const nextQuestion = () => {
    // console.log("nextQuestion called. Current questionId:", questionId);
    if (questionId < SCHOLARSHIP_MINIGAME_TOTAL_QUESTIONS - 1) {
      // console.log("Incrementing to next question");
      setQuestionId(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  // Handle answer submission
  const submitAnswer = (
    selectedScholarshipId: number,
    onFeedback?: (isCorrect: boolean) => void
  ) => {
    
    const isCorrect = validateAnswer(selectedScholarshipId, scholarshipsForThisRound);

    // Update correct count
    if (isCorrect) {
      setTotalCorrect(prev => ({ ...prev, correct: prev.correct + 1 }));
    } 
    // Update array of correct and incorrect booleans for the progress bar
    const updatedProgressArray = [...progressArray];
    updatedProgressArray[questionId] = isCorrect;
    setProgressArray(updatedProgressArray);
    if (onFeedback) onFeedback(isCorrect);
    nextQuestion();

  };

  return {
    currentScholarships: scholarshipsForThisRound,
    questionId,
    totalCorrect,
    progressArray,
    validateAnswer,
    nextQuestion,
    submitAnswer,
    totalQuestions: SCHOLARSHIP_MINIGAME_TOTAL_QUESTIONS,
    isGameOver,
    title,
    content
  };
};
