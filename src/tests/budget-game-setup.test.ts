import { renderHook, act } from '@testing-library/react';
import { useBudgetGameLogic } from '../minigames/minigame2-budgeting/useBudgetGameLogic';
import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('alert', vi.fn());

describe('useBudgetGameLogic Integration', () => {

    it('should calculate income correctly using sequential toggles', () => {
        const { result } = renderHook(() => {
            const budget = useBudgetGameLogic(0);
            return { budget };
        });

        act(() => { result.current.budget.toggleDay(0); });
        act(() => { result.current.budget.toggleDay(1); });
        act(() => { result.current.budget.toggleDay(2); });

        expect(result.current.budget.questionDisplayProps.totalWorkDays).toBe(3);
        expect(result.current.budget.questionDisplayProps.amountPerDay).toBe(30);
    });

    it('should advance the level even when the answer is incorrect', () => {
        const { result } = renderHook(() => {
            const budget = useBudgetGameLogic(1);
            return { budget };
        });

        act(() => { result.current.budget.toggleDay(1); });

        act(() => {
            result.current.budget.submitAnswer();
        });
        act(() => {
            result.current.budget.resetButtons();
        });

        expect(result.current.budget.questionDisplayProps.questionInfo.id).toBe(2);
        expect(result.current.budget.resultTally.incorrect).toBe(1);
        expect(result.current.budget.questionDisplayProps.totalWorkDays).toBe(0);
    });

    it('should advance the level and increment correct count when answer is right', () => {
        const { result } = renderHook(() => {
            const budget = useBudgetGameLogic(1);
            return { budget };
        });

        act(() => { result.current.budget.toggleDay(0); });
        act(() => { result.current.budget.toggleDay(1); });
        act(() => { result.current.budget.toggleDay(2); });

        act(() => {
            result.current.budget.submitAnswer();
        });
        act(() => {
            result.current.budget.resetButtons();
        });

        expect(result.current.budget.questionDisplayProps.questionInfo.id).toBe(2);
        expect(result.current.budget.resultTally.correct).toBe(1);
        expect(result.current.budget.questionDisplayProps.totalWorkDays).toBe(0);
    });
});