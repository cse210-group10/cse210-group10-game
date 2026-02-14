import { useState, useMemo, useRef } from 'react';
import type { ProgressState, ProgressApi } from '../../types/Minigame';

// initial progress stae - zero questions, zero statuses
const initialProgressState: ProgressState = { total: 0, statuses: [] };

export function useProgressState() {
  const [progressState, setProgressState] = useState<ProgressState>(initialProgressState);
  const stateRef = useRef(progressState);
  stateRef.current = progressState;

  const progressApi: ProgressApi = useMemo(
    () => ({

      // initialize progress bar 
      init(total: number) {
        setProgressState({
          total, // total no. of questions 
          statuses: Array(total).fill('pending') as ProgressState['statuses'], // init all questions as pending state
        });
      },

      // api to mark question as correct
      markCorrect(index: number) {
        if (index < 0) return; 
        setProgressState((prev) => ({ 
          ...prev,  // save previous state
          statuses: prev.statuses.map((s, j) => (j === index ? 'correct' : s)),// update question at index to correct state
        }));
      },

      // api to mark question as incorrect
      markIncorrect(index: number) {
        if (index < 0) return;
        setProgressState((prev) => ({
          ...prev,
          statuses: prev.statuses.map((s, j) => (j === index ? 'incorrect' : s)),
        }));
      },

      // reset progress bar 
      // useful for restarting game
      // can also be used to reset progress bar (quit and restart)
      reset() {
        setProgressState(initialProgressState);
      },

      //get current progress state
      //return format: {total: number, statuses: ProgressStatus[]}
      getProgress() {
        return stateRef.current;
      },
    }),
    []
  );

  return { progressState, progressApi };
}
