import { renderHook, act } from '@testing-library/react';
import { useBudgetGameLogic } from '../minigames/minigame2-budgeting/useBudgetGameLogic';
import { useCalendarLogic } from '../minigames/minigame2-budgeting/useCalendarLogic';
import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('alert', vi.fn());

describe('useBudgetGameLogic Integration', () => {

    it('should calculate income correctly using sequential toggles', () => {
        const { result } = renderHook(() => {
            const calendar = useCalendarLogic(5);
            const budget = useBudgetGameLogic(0, calendar.totalWorkDays);
            return { calendar, budget };
        });

        act(() => { result.current.calendar.toggleDay(0); });
        act(() => { result.current.calendar.toggleDay(1); });
        act(() => { result.current.calendar.toggleDay(2); });

        expect(result.current.calendar.totalWorkDays).toBe(3);
        expect(result.current.budget.currentIncome).toBe(30);
    });

    it('should advance the level even when the answer is incorrect', () => {
        const { result } = renderHook(() => {
            const calendar = useCalendarLogic(5);
            const budget = useBudgetGameLogic(1, calendar.totalWorkDays);
            return { calendar, budget };
        });

        act(() => { result.current.calendar.toggleDay(1); });

        act(() => {
            result.current.budget.submitAnswer();
        });
        act(() => {
            result.current.calendar.resetButtons();
        });

        expect(result.current.budget.currentQuestion.id).toBe(2);
        expect(result.current.budget.progress.incorrect).toBe(1);
        expect(result.current.calendar.totalWorkDays).toBe(0);
    });

    it('should advance the level and increment correct count when answer is right', () => {
        const { result } = renderHook(() => {
            const calendar = useCalendarLogic(5);
            const budget = useBudgetGameLogic(1, calendar.totalWorkDays);
            return { calendar, budget };
        });

        act(() => { result.current.calendar.toggleDay(0); });
        act(() => { result.current.calendar.toggleDay(1); });
        act(() => { result.current.calendar.toggleDay(2); });

        act(() => {
            result.current.budget.submitAnswer();
        });
        act(() => {
            result.current.calendar.resetButtons();
        });

        expect(result.current.budget.currentQuestion.id).toBe(2);
        expect(result.current.budget.progress.correct).toBe(1);
        expect(result.current.calendar.totalWorkDays).toBe(0);
    });
});