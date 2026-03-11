import { renderHook, act } from '@testing-library/react';
import { useBudgetGameLogic } from '../minigames/minigame2-budgeting/useBudgetGameLogic';
import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('alert', vi.fn());

describe('useBudgetGameLogic Integration', () => {

    it('should calculate income correctly using sequential toggles', () => {
        const { result } = renderHook(() => {
            return useBudgetGameLogic(0);
        });

        act(() => { result.current.toggleDay(0); });
        act(() => { result.current.toggleDay(1); });
        act(() => { result.current.toggleDay(2); });

        expect(result.current.questionDisplayProps.totalWorkDays).toBe(3);
        expect(result.current.questionDisplayProps.amountPerDay).toBe(30);
    });

    it('should advance the level even when the answer is incorrect', () => {
        const { result } = renderHook(() => {
            return useBudgetGameLogic(1);
        });

        act(() => { result.current.toggleDay(1); });

        act(() => {
            result.current.submitAnswer();
        });
        act(() => {
            result.current.resetButtons();
        });

        expect(result.current.questionDisplayProps.questionInfo.id).toBe(2);
        expect(result.current.progress.incorrect).toBe(1);
        expect(result.current.questionDisplayProps.totalWorkDays).toBe(0);
    });

    it('should advance the level and increment correct count when answer is right', () => {
        const { result } = renderHook(() => {
            return useBudgetGameLogic(1);
        });

        act(() => { result.current.toggleDay(0); });
        act(() => { result.current.toggleDay(1); });
        act(() => { result.current.toggleDay(2); });

        act(() => {
            result.current.submitAnswer();
        });
        act(() => {
            result.current.resetButtons();
        });

        expect(result.current.questionDisplayProps.questionInfo.id).toBe(2);
        expect(result.current.progress.correct).toBe(1);
        expect(result.current.questionDisplayProps.totalWorkDays).toBe(0);
    });
});
