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
    it('never goes beyond final question; finish alert should happen',() =>{
        const {result} = renderHook(() => useQuestionLogic());

        //skip to end + go beyond it
        act(()=>{
            result.current.nextQuestion(); // 1 -> 2
        });
        act(()=>{
            result.current.nextQuestion(); // 2 -> 3
        });
        act(()=>{
            result.current.nextQuestion(); // 3 -> null
        });

        //verification 
        expect(result.current.currentQuestion.id).toBe(3);
        //subject to change
        expect(globalThis.alert).toHaveBeenCalledWith("All levels done! Finish Screen goes here");
    });
});