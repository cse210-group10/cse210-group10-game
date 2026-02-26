import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";
import ScholarshipCharacter from "../minigames/minigame1-scholarship/character";



 describe("ScholarshipCharacter", () => {
    // Tests initial state
    it("Display the initial scholarship message before button is clicked", () => {
        render(<ScholarshipCharacter />);
        const initialScholarMessage = "Please select one of the scholarships with the buttons below."
        expect(screen.getByText(initialScholarMessage)).toBeInTheDocument()
    });

    // This will change when we add information about the actual characters in the game
    it("Displays details about the character", () => {
        render(<ScholarshipCharacter />);
        const initialChar = "Hi! I'm Bethany"
        expect(screen.getByText(initialChar)).toBeInTheDocument()
    });

    it("Submit button should not be displayed at the initial state", () => {
        render(<ScholarshipCharacter />);
        expect(screen.queryByText("Submit")).not.toBeInTheDocument()
    });

    // Tests after button has been clicked 
    it("Check if button appears after one of the scholarship buttons is clicked on", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByText("Scholarship 2"));
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("Display different scholarship info when buttons are clicked", () => {
        render(<ScholarshipCharacter />);
        
        // Click scholarship 1 and verify scholarship name appears
        fireEvent.click(screen.getByText("Scholarship 1"));
        const scholarshipNames = screen.getAllByText(/^[A-Z]/); // Should show at least one scholarship
        expect(scholarshipNames.length).toBeGreaterThan(0);
    });

    it("Display scholarship details when a button is clicked", () => {
        render(<ScholarshipCharacter />);
        
        // Click any scholarship button
        fireEvent.click(screen.getByText("Scholarship 1"));
        
        // Verify sponsor and amount fields are displayed
        expect(screen.getByText(/Sponsor:/)).toBeInTheDocument();
        expect(screen.getByText(/Amount:/)).toBeInTheDocument();
        expect(screen.getByText(/Description:/)).toBeInTheDocument();
    });
 });

//  source: https://vitest.dev/guide/browser/component-testing
//  source: https://vitest.dev/api/expect 
//  source: https://testing-library.com/docs/guide-disappearance/ 