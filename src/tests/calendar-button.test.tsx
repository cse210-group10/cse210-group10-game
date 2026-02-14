import {render, screen, fireEvent} from '@testing-library/react';
import CalendarButton from '../minigames/minigame2-budgeting/calendar-button';
import { describe, it, expect, vi } from 'vitest';

describe('CalendarButton Component', () => {
    //initial button test
    it('start as rest as "default"', () => {
        //render button
        render(<CalendarButton dayNumber={1} isWork={false} onToggle={() => {}}/>);
        
        //check for starting value being rest with number being 1 
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText(/rest/i)).toBeInTheDocument();
        //CSS check
        expect(screen.getByRole('button')).toHaveClass('is-rest');
    });

    //toggle button test
    it('renders the word "work" when toggled', () => {
        render(<CalendarButton dayNumber={1} isWork={true} onToggle={() => {}}/>);

        expect(screen.getByText(/work/i)).toBeInTheDocument();
        //CSS check
        expect(screen.getByRole('button')).toHaveClass('is-work');
    });

    //function call being made on buttonClick() event
    it('calls onToggle function when clicked', ()=>{
        const mockToggle = vi.fn();
        render(<CalendarButton dayNumber={1} isWork={false} onToggle={mockToggle}/>);

        //click and test function call from button click
        fireEvent.click(screen.getByRole('button'));
        expect(mockToggle).toHaveBeenCalledTimes(1);
    });

});