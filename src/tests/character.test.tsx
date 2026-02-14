import {fireEvent, render, screen} from "@testing-library/react";
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
    it("Display the scholarship 1 information when button is clicked", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("first-scholarship-button"))
        const scholarship1 = "Scholarship 1: This scholarship is for students entering a STEM program. It offers $10,000 towards tuition."
        expect(screen.getByText(scholarship1)).toBeInTheDocument()
     });

     it("Check if button appears after one of the scholarship buttons is clicked on", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("second-scholarship-button"))
        expect(screen.getByText("Submit")).toBeInTheDocument()
    });

 });

//  source: https://vitest.dev/guide/browser/component-testing
//  source: https://vitest.dev/api/expect 
//  source: https://testing-library.com/docs/guide-disappearance/ 