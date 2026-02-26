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
        expect(result.current.currentQuestion.id).toBe(1);
        expect(result.current.questionCount).toBe(3);
    });
    
    //test going to next question
    it('go to next question when nextQuestion called', () => {
        const {result} = renderHook(() => useQuestionLogic());

        //next question
        act(()=>{
            result.current.nextQuestion();
        });

        //verify
        expect(result.current.currentQuestion.id).toBe(2);
    });

    //test to never cause out-of-range error
    it('does not go past last question', () => {
        const {result} = renderHook(() => useQuestionLogic());

        //go to next question twice (to get to last question)
        act(()=>{
            result.current.nextQuestion();
            result.current.nextQuestion();
        });

        //try to go to next question again (should not change)
        act(()=>{
            result.current.nextQuestion();
        });

        //verify still on last question
        expect(result.current.currentQuestion.id).toBe(3);
    });
});