import {fireEvent, render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import "@testing-library/jest-dom";
import ScholarshipCharacter from "../minigames/minigame1-scholarship/character"; 
import { selectedEntries } from '../minigames/minigame1-scholarship/question-logic';



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

    it("Display different scholarship info for each button", () => {
        render(<ScholarshipCharacter />);
        
        const scholarships = [
            { label: "Scholarship 1", name: selectedEntries[0].name },
            { label: "Scholarship 2", name: selectedEntries[1].name },
            { label: "Scholarship 3", name: selectedEntries[2].name },
            { label: "Scholarship 4", name: selectedEntries[3].name },
        ];
        
        scholarships.forEach(({label, name}) => {
            fireEvent.click(screen.getByText(label));
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });
   it("Display complete scholarship 1 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByText("Scholarship 1"));
        expect(screen.getByText(selectedEntries[0].description)).toBeInTheDocument();
    });

    it("Display complete scholarship 2 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByText("Scholarship 2"));
        expect(screen.getByText(selectedEntries[1].description)).toBeInTheDocument();
    });

    it("Display complete scholarship 3 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByText("Scholarship 3"));
        expect(screen.getByText(selectedEntries[2].description)).toBeInTheDocument();
    });

    it("Display complete scholarship 4 details", () => {
        render(<ScholarshipCharacter />);
        fireEvent.click(screen.getByText("Scholarship 4"));
        expect(screen.getByText(selectedEntries[3].description)).toBeInTheDocument();
    });
 });

//  source: https://vitest.dev/guide/browser/component-testing
//  source: https://vitest.dev/api/expect 
//  source: https://testing-library.com/docs/guide-disappearance/ 