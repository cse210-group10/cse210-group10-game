import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { vi } from "vitest";
import Minigame1 from '../minigames/minigame1-scholarship/index';
import { describe, it, expect } from 'vitest';
import characterBank from '../minigames/minigame1-scholarship/characterBank.json';

describe('Minigame1 - Scholarship Matcher Component', () => {
    const getByTextContent = (container: HTMLElement, text: string) =>
        within(container).getByText((content) => content.includes(text));

    it('renders the main view with starting elements', () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        expect(screen.getByText('Please select one of the scholarships with the buttons below.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Scholarship 1/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Scholarship 2/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Scholarship 3/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Scholarship 4/i })).toBeInTheDocument();
    });

    it('displays the first character (Maria Rodriguez) on initial load', () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        const firstCharacter = characterBank[0];
        const profileInfo = screen.getByText(/Hi! I'm/i).closest('.profile-info') as HTMLElement | null;
        expect(profileInfo).not.toBeNull();
        
        expect(getByTextContent(profileInfo!, firstCharacter.academic_focus)).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, firstCharacter.location)).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, String(firstCharacter.gpa))).toBeInTheDocument();
    });

    it('renders the correct profile image for the first character', () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        const profileImage = screen.getByAltText('profile-pic');
        expect(profileImage).toHaveAttribute('src', characterBank[0].profile_pic);
    });

    it('displays all character details for the current question', () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        const currentChar = characterBank[0];
        const profileInfo = screen.getByText(/Hi! I'm/i).closest('.profile-info') as HTMLElement | null;
        expect(profileInfo).not.toBeNull();
        
        expect(within(profileInfo!).getByText(/School year:/)).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, currentChar.age_school_year)).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, currentChar.location)).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, currentChar.ethnicity)).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, String(currentChar.gpa))).toBeInTheDocument();
        expect(getByTextContent(profileInfo!, currentChar.academic_focus)).toBeInTheDocument();
        expect(within(profileInfo!).getByText(new RegExp(currentChar.description.substring(0, 50)))).toBeInTheDocument();
    });

    it('displays scholarship details when a scholarship is selected', async () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        const scholarshipButton = screen.getByRole('button', { name: /Scholarship 1/i });
        fireEvent.click(scholarshipButton);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
        });

        // Scholarship info should be displayed (name and sponsor at minimum)
        const infoSection = screen.queryByText(/Sponsor:/i);
        expect(infoSection).toBeInTheDocument();
    });

    it('displays submit button only after selecting a scholarship', () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        // Submit button should not be visible initially
        expect(screen.queryByRole('button', { name: /Submit/i })).not.toBeInTheDocument();

        // Click a scholarship
        const scholarshipButton = screen.getByRole('button', { name: /Scholarship 1/i });
        fireEvent.click(scholarshipButton);

        // Now submit button should be visible
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('shows 4 scholarship options at each question', () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        const scholarshipButtons = screen.getAllByRole('button', { name: /Scholarship \d/i });
        expect(scholarshipButtons).toHaveLength(4);
    });

    it('tracks character progression through questions', async () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        // Verify first character by checking their details
        let currentChar = characterBank[0];
        expect(screen.getByText((content) => content.includes(currentChar.location))).toBeInTheDocument();

        // Select a scholarship and submit
        const scholarshipButtons = screen.getAllByRole('button', { name: /Scholarship \d/i });
        fireEvent.click(scholarshipButtons[0]);

        const submitButton = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(submitButton);

        // After submission, next question should show next character
        await waitFor(() => {
            const nextChar = characterBank[1];
            expect(screen.getByText((content) => content.includes(nextChar.location))).toBeInTheDocument();
            expect(screen.queryByText((content) => content.includes(currentChar.location))).not.toBeInTheDocument();
        });
    });

    it('updates the profile image when advancing to the next question', async () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        const scholarshipButtons = screen.getAllByRole('button', { name: /Scholarship \d/i });
        fireEvent.click(scholarshipButtons[0]);
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => {
            const profileImage = screen.getByAltText('profile-pic');
            expect(profileImage).toHaveAttribute('src', characterBank[1].profile_pic);
        });
    });

    it('displays all 5 characters through 5 questions', async () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        for (let i = 0; i < 5; i++) {
            const expectedChar = characterBank[i];
            // Check character details instead of full greeting text
            expect(screen.getByText((content) => content.includes(expectedChar.location))).toBeInTheDocument();

            if (i < 4) {
                // Select first scholarship and submit to move to next question
                const scholarshipButtons = screen.getAllByRole('button', { name: /Scholarship \d/i });
                fireEvent.click(scholarshipButtons[0]);

                const submitButton = screen.getByRole('button', { name: /Submit/i });
                fireEvent.click(submitButton);

                // Wait for the next character to appear
                await waitFor(() => {
                    const nextChar = characterBank[i + 1];
                    expect(screen.getByText((content) => content.includes(nextChar.location))).toBeInTheDocument();
                });
            }
        }
    });

    it('game ends popup appears after 5 questions', async () => {
        render(<Minigame1 onComplete={vi.fn()} />);

        // Submit answers for all 5 questions
        for (let i = 0; i < 5; i++) {
            const scholarshipButtons = screen.getAllByRole('button', { name: /Scholarship \d/i });
            fireEvent.click(scholarshipButtons[0]);

            const submitButton = screen.getByRole('button', { name: /Submit/i });
            fireEvent.click(submitButton);

            if (i < 4) {
                // Close feedback popup if visible
                await waitFor(() => {
                    screen.queryAllByRole('button', { name: /Close/i });
                });
            }
        }

        // Game over popup should appear
        await waitFor(() => {
            expect(screen.getByText(/Game Over!/i)).toBeInTheDocument();
        });
    });
});
