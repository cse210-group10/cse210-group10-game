import { renderHook, act } from '@testing-library/react';
import { useQuestionLogic } from '../minigames/minigame2-budgeting/question-logic';
import { describe, it, expect, vi } from 'vitest';

//stop browser alert from stopping tests
globalThis.alert=vi.fn();


describe('useQuestionLogic', () =>{
    //tests question starting point
    it('always starts with 1st question from bank', () => {
        const {result} = renderHook(() => useQuestionLogic());

        //verify starting point; CHANGE: account for tutorial question
        expect(result.current.currentQuestion.id).toBe(0);
        expect(result.current.questionCount).toBe(6);
    });
    
    //test going to next question
    it('go to next question when nextQuestion called', () => {
        const {result} = renderHook(() => useQuestionLogic(1));

        //next question
        act(()=>{
            result.current.nextQuestion();
        });

        //verify / CHANGE: Tutorial is ID 0 so next question is ID 1
        expect(result.current.currentQuestion.id).toBe(2);
    });

    //test to never cause out-of-range error
    it('never goes beyond final question; finish alert should happen',() =>{
        
        //CHANGE: Added a optional parameter that allows for skipping, makes test writing easier
        const {result} = renderHook(() => useQuestionLogic(5));

        //skip to end + go beyond it
        //CHANGE: added tutorial to test
 
        act(()=>{
            result.current.nextQuestion(); // 5 -> null
        });

        //verification 
        expect(result.current.currentQuestion.id).toBe(5);
        //subject to change
        expect(globalThis.alert).toHaveBeenCalledWith("All levels done! Finish Screen goes here");
    });
});