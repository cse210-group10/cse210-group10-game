import { renderHook, act } from '@testing-library/react';
import { useQuestionLogic } from '../minigames/minigame2-budgeting/question-logic';
import { describe, it, expect, vi } from 'vitest';

//stop browser alert from stopping tests
globalThis.alert=vi.fn();


describe('useQuestionLogic', () =>{
    //tests question starting point
    it('always starts with 1st question from bank', () => {
        const {result} = renderHook(() => useQuestionLogic());

        //verify starting point
        expect(result.current.currentQuestion.id).toBe(0);
        expect(result.current.questionCount).toBe(6);
    });
    
    //test going to next question
    it('go to next question when nextQuestion called', () => {
        const {result} = renderHook(() => useQuestionLogic());

        //next question
        act(()=>{
            result.current.nextQuestion();
        });

        //verify
        expect(result.current.currentQuestion.id).toBe(1);
    });

    //test to never cause out-of-range error
    it('does not go past last question', () => {
        const {result} = renderHook(() => useQuestionLogic(5));

        //try to go to next question again (should not change)
        act(()=>{
            result.current.nextQuestion(); // 5 -> null
        });

        //verify still on last question
        expect(result.current.currentQuestion.id).toBe(5);
    });
});