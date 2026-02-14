import { render, screen } from "@testing-library/react";
import QuestionDisplay from "../minigames/minigame2-budgeting/question-display";
import { describe, it, expect} from 'vitest';

describe('QuestionDisplay Component', ()=> {
    //question for testing
    const mockQuestion = {
        id: 1,
        question: "Save up 150 coins!",
        rateEarned: 30,
        answer: 150
    }

    //check if question text on screen
    it('renders question text and rate properly', () => {
        render(<QuestionDisplay questionInfo={mockQuestion} amountPerDay={0}/>);

        //check if goal present
        expect(screen.getByText(/Save up 150 coins!/)).toBeInTheDocument();
        //check if rate present
        expect(screen.getByText(/30/i)).toBeInTheDocument();
    });

    //checking current amount display after choosing a work day
    it('displays current income generated through interactive component (using a mock number here)',() => {
        render(<QuestionDisplay questionInfo={mockQuestion} amountPerDay={90}/>);

        //check if 90 is visible on screen
        expect(screen.getByText(/90/i)).toBeInTheDocument();
    });

});