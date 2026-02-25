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

        // Q0 rate is 30. 3 days * 10 = 30.
        expect(result.current.totalWorkDays).toBe(3);
        expect(result.current.currentIncome).toBe(30);
    });
    
    it('should advance the level even when the answer is incorrect', () => {
        const { result } = renderHook(() => useBudgetGameLogic(1));

        //Target for Q1: 75, check if i can get it wrong and move on
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
        //CHANGE: added question skip in question logic and budget game logic so testing can be easier
        const { result } = renderHook(() => useBudgetGameLogic(1));

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

    it('should never advance past the tutorial if the provided answer is wrong', () => {
        const { result } = renderHook(() => useBudgetGameLogic(0));

        //get answer wrong + submit
        act(() => {result.current.toggleDay(0)});
        act(() => {result.current.submitAnswer()});

        //stays in tutorial
        expect(result.current.currentQuestion.id).toBe(0);
    });

    it('tutorial should never affect the correct or incorrect portions of the mini-game for star counts', () => {
        const { result } = renderHook(() => useBudgetGameLogic(0));

        //get answer wrong + submit + check if incorrect was updated
        act(() => {result.current.toggleDay(0)});
        act(() => {result.current.submitAnswer()});
        expect(result.current.progress.incorrect).toBe(0);

        //get answer right + submit + check if correct was updated (answer: 30, with rate: 10)
        act(() => {result.current.toggleDay(0)})
        act(() => {result.current.toggleDay(1)})
        act(() => {result.current.toggleDay(2)})
        expect(result.current.progress.correct).toBe(0);
    });
});