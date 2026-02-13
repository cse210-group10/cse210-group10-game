import { render, screen } from "@testing-library/react";
//naming convention is weird for testing, so capital I is needed, apparently
import Minigame2 from '../minigames/minigame2-budgeting/index';
import { describe, it, expect} from 'vitest';

describe('index.tsx main view container (for overall game)', () => {
    //creates container
    it('render main view with all starting elements', () => {
        render(<Minigame2 />)
    

        //check for total work days 
        expect(screen.getByText(/Total Work Days: /i)).toBeInTheDocument();

        //verify rendered calendar buttons by checking if the minimum number of them is there
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();


        const submitButn = screen.getByRole('button', {name: /submit/i});
        expect(submitButn).toBeInTheDocument();
    });
});