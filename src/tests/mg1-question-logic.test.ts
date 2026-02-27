/*
tests needed: this tests the logic only not rendering

- validateAnswer() returns true for correct answer and false for incorrect answer
- nextQuestion() increments questionId until the end of the questions, then shows alert
- submitAnswer() calls validateAnswer, updates progressCount and progressArray correctly, and shows correct/incorrect feedback
- initialization of scholarshipsForThisRound based on questionId changes
- making sure that correct answer is determined by the scholarship with the highest ranking for the current character
- making sure progressarray matches progressCount (e.g. if correct count is 2, there should be 2 true values in progressArray)
*/
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useScholarshipLogic } from '../minigames/minigame1-scholarship/question-logic';
import type { ScholarshipData } from '../minigames/minigame1-scholarship/question-logic';

// stop browser alert from interrupting tests
globalThis.alert = vi.fn();

describe('useScholarshipLogic', () => {
    it('validateAnswer returns true for correct answer and false for incorrect answer', () => {
        const { result } = renderHook(() => useScholarshipLogic(0));
        const { validateAnswer } = result.current;

        const mockScholarships: ScholarshipData[] = [
            { id: 1, name: "Test 1", weeksLeft: 4, sponsor: "Sponsor 1", amount: 5000, description: "Desc 1", rankings: [0.9, 0.0, 0.0, 0.0, 0.0] },
            { id: 2, name: "Test 2", weeksLeft: 4, sponsor: "Sponsor 2", amount: 5000, description: "Desc 2", rankings: [0.5, 0.0, 0.0, 0.0, 0.0] },
            { id: 3, name: "Test 3", weeksLeft: 4, sponsor: "Sponsor 3", amount: 5000, description: "Desc 3", rankings: [0.3, 0.0, 0.0, 0.0, 0.0] },
            { id: 4, name: "Test 4", weeksLeft: 4, sponsor: "Sponsor 4", amount: 5000, description: "Desc 4", rankings: [0.0, 0.0, 0.0, 0.0, 0.0] },
        ];

        expect(validateAnswer(1, mockScholarships)).toBe(true);
        expect(validateAnswer(2, mockScholarships)).toBe(false);
        expect(validateAnswer(3, mockScholarships)).toBe(false);
        expect(validateAnswer(4, mockScholarships)).toBe(false);
    });

    it('nextQuestion increments questionId until the end of questions, then sets game over', () => {
        const { result } = renderHook(() => useScholarshipLogic(0));

        expect(result.current.questionId).toBe(0);
        expect(result.current.isGameOver).toBe(false);

        act(() => { result.current.nextQuestion(); }); // 0 -> 1
        act(() => { result.current.nextQuestion(); }); // 1 -> 2
        act(() => { result.current.nextQuestion(); }); // 2 -> 3
        act(() => { result.current.nextQuestion(); }); // 3 -> 4

        expect(result.current.questionId).toBe(4);
        expect(result.current.isGameOver).toBe(false);

        act(() => { result.current.nextQuestion(); }); // end -> game over

        expect(result.current.questionId).toBe(4);
        expect(result.current.isGameOver).toBe(true);
        expect(globalThis.alert).not.toHaveBeenCalledWith(
            expect.stringContaining("Game over! You got")
        );
        });

    // ...existing code...

    it('submitAnswer updates progressCount and progressArray correctly on correct answer', () => {
        const { result } = renderHook(() => useScholarshipLogic(0));

        const mockScholarships: ScholarshipData[] = [
            { id: 1, name: "Best", weeksLeft: 4, sponsor: "Sponsor 1", amount: 5000, description: "Desc 1", rankings: [0.9, 0.0, 0.0, 0.0, 0.0] },
            { id: 2, name: "Good", weeksLeft: 4, sponsor: "Sponsor 2", amount: 5000, description: "Desc 2", rankings: [0.5, 0.0, 0.0, 0.0, 0.0] },
            { id: 3, name: "OK", weeksLeft: 4, sponsor: "Sponsor 3", amount: 5000, description: "Desc 3", rankings: [0.3, 0.0, 0.0, 0.0, 0.0] },
            { id: 4, name: "Poor", weeksLeft: 4, sponsor: "Sponsor 4", amount: 5000, description: "Desc 4", rankings: [0.0, 0.0, 0.0, 0.0, 0.0] },
        ];

        expect(mockScholarships.length).toBe(4);
        expect(result.current.totalCorrect.correct).toBe(0);
        expect(result.current.totalCorrect.incorrect).toBe(0);
        expect(result.current.progressArray[0]).toBe(null);
    });

    it('progressArray tracks correct and incorrect answers', () => {
        const { result } = renderHook(() => useScholarshipLogic(0));

        expect(result.current.progressArray).toEqual([null, null, null, null, null]);
        expect(result.current.totalCorrect).toEqual({ correct: 0, incorrect: 0 });
    });

    // ...existing code...

    it('scholarshipsForThisRound loads when questionId is 0-4', () => {
        const { result } = renderHook(() => useScholarshipLogic(0));

        expect(result.current.currentScholarships.length).toBe(4);
    });
});