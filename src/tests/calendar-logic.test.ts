import {renderHook, act} from '@testing-library/react';
import { useCalendarLogic } from '../minigames/minigame2-budgeting/calendar-logic';
import {describe, it, expect} from 'vitest';

describe('useCalendarLogic', () => {
    //ensure that minimum number of calendar buttons = 5
    it('should initialize with 5 buttons even if a number less than or equal to 0 is given', () =>{    
        const {result} = renderHook(() => useCalendarLogic(-2));
        
        expect(result.current.workDays.length).toBe(5);
        //checks if all buttons start at false (rest label shown)
        expect(result.current.totalWorkDays).toBe(0);
    });

    it('toggling a specific button should update totalWorkDays count', () =>{
        //make function
        const {result} = renderHook(() => useCalendarLogic(5));
        //push button
        act(() => {
            result.current.toggleDay(0);
        });

        //check results for true boolean on button 0 and that totalWorkDays increases by 1
        expect(result.current.workDays[0]).toBe(true);
        expect(result.current.totalWorkDays).toBe(1);
    });

    it('resets all buttons properly', () => {
        //make function
        const {result} = renderHook(() => useCalendarLogic(5));
        //reset button pressed
        act(() => {
            result.current.toggleDay(0);
            result.current.resetButtons();
        });

        //check if it is zero again
        expect(result.current.workDays[0]).toBe(false);
        expect(result.current.totalWorkDays).toBe(0);
    });
});