export interface MinigameResult {
  stars: number;
}

export interface MinigameProps {
  onComplete: (result: MinigameResult) => void;
  progress?: ProgressApi;
}

export type StarsContextValue = {
  stars: number;
  addStars: (earned: number) => void;
};

// three possible question statuses
export type ProgressStatus = 'pending' | 'correct' | 'incorrect';


// progress bar interface
export interface ProgressState {
  //total number of questions 
  total: number;
  // array to store question index and status
  statuses: ProgressStatus[]; 
}

//progress bar api; 

export interface ProgressApi{
  // dynamic init given number of questions 
  init: (total:number) => void;
  markCorrect: (index:number) => void;
  markIncorrect: (index:number) => void;
  //reset progress (if needed)
  reset: () => void;
  //get current progress state
  getProgress: () => ProgressState;
}

