import { renderHook, act } from '@testing-library/react';
import { useBudgetGameLogic } from '../minigames/minigame2-budgeting/budget-game-setup';
import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('alert', vi.fn());

describe('useBudgetGameLogic Integration', () => {

    it('should calculate income correctly using sequential toggles', () => {
        const { result } = renderHook(() => useBudgetGameLogic());
        
        // Toggle 3 days one-by-one to ensure the state 'settles' between each
        act(() => { result.current.toggleDay(0); });
        act(() => { result.current.toggleDay(1); });
        act(() => { result.current.toggleDay(2); });

        // Q1 rate is 25. 3 days * 25 = 75.
        expect(result.current.totalWorkDays).toBe(3);
        expect(result.current.currentIncome).toBe(75);
    });

    it('should advance the level even when the answer is incorrect', () => {
        const { result } = renderHook(() => useBudgetGameLogic());

        // Target for Q1 is 75. Let's give a wrong answer (1 day = 25).
        act(() => { result.current.toggleDay(0); });

        act(() => {
            result.current.submitAnswer();
        });

        // RULE: Player advances regardless of accuracy
        expect(result.current.currentQuestion.id).toBe(2);
        
        // RULE: Track that they got it wrong
        expect(result.current.progress.incorrect).toBe(1);
        
        // RULE: Calendar should still reset for the next level
        expect(result.current.totalWorkDays).toBe(0);
    });

    it('should advance the level and increment correct count when answer is right', () => {
        const { result } = renderHook(() => useBudgetGameLogic());

        // Correct answer for Q1 (3 days * 25 = 75)
        act(() => { result.current.toggleDay(0); });
        act(() => { result.current.toggleDay(1); });
        act(() => { result.current.toggleDay(2); });

        act(() => {
            result.current.submitAnswer();
        });

        // Verify progression and score
        expect(result.current.currentQuestion.id).toBe(2);
        expect(result.current.progress.correct).toBe(1);
        expect(result.current.totalWorkDays).toBe(0);
    });
});