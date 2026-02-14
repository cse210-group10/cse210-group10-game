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
     it("Check if button appears after one of the scholarship buttons is clicked on", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("second-scholarship-button"))
        expect(screen.getByText("Submit")).toBeInTheDocument()
    });

    it("Display different scholarship info for each button", () => {
        render(<ScholarshipCharacter />);
        
        const scholarships = [
            { label: "first-scholarship-button", name: "Gates Scholarship" },
            { label: "second-scholarship-button", name: "Jack Kent Cooke Foundation Scholarship" },
            { label: "third-scholarship-button", name: "Coca-Cola Scholars Program" },
            { label: "fourth-scholarship-button", name: "Davidson Fellows Scholarship" }
        ];
        
        scholarships.forEach(({label, name}) => {
            fireEvent.click(screen.getByLabelText(label));
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });

    it("Display complete scholarship 1 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("first-scholarship-button"))
        const fullDescription = "Full-ride scholarship for exceptional minority students with significant financial need. For incoming undergraduate freshmen who are Pell-eligible minority students (African American, American Indian/Alaska Native, Asian Pacific Islander American, Hispanic American)."
        expect(screen.getByText(fullDescription)).toBeInTheDocument()
    });

    it("Display complete scholarship 2 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("second-scholarship-button"))
        const fullDescription = "Supports high-achieving students with financial need. For high school seniors with GPA 3.5+ and family income up to $95,000."
        expect(screen.getByText(fullDescription)).toBeInTheDocument()
    });

    it("Display complete scholarship 3 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("third-scholarship-button"))
        const fullDescription = "Merit-based scholarship for community leaders. For high school seniors with minimum 3.0 GPA and demonstrated leadership."
        expect(screen.getByText(fullDescription)).toBeInTheDocument()
    });

    it("Display complete scholarship 4 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByLabelText("fourth-scholarship-button"))
        const fullDescription = "Awards for students who complete significant projects in STEM, literature, music, or philosophy. For students 18 and under who have completed a significant piece of work."
        expect(screen.getByText(fullDescription)).toBeInTheDocument()
    });

 });

//  source: https://vitest.dev/guide/browser/component-testing
//  source: https://vitest.dev/api/expect 
//  source: https://testing-library.com/docs/guide-disappearance/ 