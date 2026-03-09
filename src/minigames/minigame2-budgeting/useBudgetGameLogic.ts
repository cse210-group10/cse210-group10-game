import { useCalendarLogic } from './useCalendarLogic'; // calendar logic
import { useAnswerLogic } from './useAnswerLogic'; // answer logic
import type { ProgressApi } from "../../types/Minigame";


export const useBudgetGameLogic = (initialLevel: number = 0, progressApi?: ProgressApi) => {
  // calendar, workday buttons logic set-up
  const {workDays, totalWorkDays, toggleDay, resetButtons} = useCalendarLogic(5);

  // "submit" button logic set-up
  const {
    currentQuestion,
    currentIncome,
    submitAnswer,
    popupProps,
    endPopupProps,
    progress, //for tests
    last,
  } = useAnswerLogic(initialLevel, totalWorkDays, progressApi);

  const questionDisplayProps = {
      questionInfo: currentQuestion,
      amountPerDay: currentIncome,
      totalWorkDays: totalWorkDays,
  }

  return {
    questionDisplayProps,
    submitAnswer,
    popupProps,
    endPopupProps,
    progress, //for tests
    last,
    resetButtons,
    workDays,
    toggleDay,
  };
}