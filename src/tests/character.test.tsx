import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from "vitest";
import "@testing-library/jest-dom";
// import ScholarshipCharacter from "../minigames/minigame1-scholarship/character";
import Minigame1 from "../minigames/minigame1-scholarship/index";
import * as ScholarshipLogic from "../minigames/minigame1-scholarship/question-logic";
import characterBank from "../minigames/minigame1-scholarship/characterBank.json";


// Hoisted mock for navigation
const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

 describe("Minigame1", () => {
    // Tests initial state
    it("Display the initial scholarship message before button is clicked", () => {
      render(<Minigame1 onComplete={vi.fn()} />);
        const initialScholarMessage = "Please select one of the scholarships with the buttons below."
        expect(screen.getByText(initialScholarMessage)).toBeInTheDocument()
    });

    // This will change when we add information about the actual characters in the game
    it("Displays details about the character", () => {
      render(<Minigame1 onComplete={vi.fn()} />);
      const firstCharacter = characterBank[0];
      expect(screen.getByText(`Hi! I'm ${firstCharacter.character}`)).toBeInTheDocument();
    });

    it("Submit button should not be displayed at the initial state", () => {
      render(<Minigame1 onComplete={vi.fn()} />);
        expect(screen.queryByText("Submit")).not.toBeInTheDocument()
    });

    // Tests after button has been clicked 
    it("Check if button appears after one of the scholarship buttons is clicked on", () => {
      render(<Minigame1 onComplete={vi.fn()} />);
        fireEvent.click(screen.getByText("Scholarship 2"));
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("Display different scholarship info when buttons are clicked", async () => {
      render(<Minigame1 onComplete={vi.fn()} />);
        
        // Click scholarship 1 and wait for scholarship info to display
        fireEvent.click(screen.getByText("Scholarship 1"));
        await waitFor(() => {
            expect(screen.getByText(/Sponsor:/)).toBeInTheDocument();
        });
        
        // Get the scholarship name after first selection
        const scholarshipInfo = screen.getByText(/Sponsor:/).closest(".scholarship-info") as HTMLElement | null;
        expect(scholarshipInfo).not.toBeNull();
        const scholarship1Name = within(scholarshipInfo!).getByRole("heading", { level: 2 }).textContent;
        
        // Click scholarship 2 and wait for scholarship info to update
        fireEvent.click(screen.getByText("Scholarship 2"));
        await waitFor(() => {
          const scholarship2Name = within(scholarshipInfo!).getByRole("heading", { level: 2 }).textContent;
            expect(scholarship2Name).not.toBe(scholarship1Name);
        });
    });

    it("Display scholarship details when a button is clicked", () => {
        render(<Minigame1 onComplete={vi.fn()} />);
        
        // Click any scholarship button
        fireEvent.click(screen.getByText("Scholarship 1"));
        
        // Verify sponsor and amount fields are displayed
        expect(screen.getByText(/Sponsor:/)).toBeInTheDocument();
        expect(screen.getByText(/Amount:/)).toBeInTheDocument();
        expect(screen.getByText(/Description:/)).toBeInTheDocument();
    });
 });

describe("ScholarshipCharacter - end game popup", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("shows end-game popup when isGameOver is true", async () => {
    vi.spyOn(ScholarshipLogic, "useScholarshipLogic").mockReturnValue({
      currentScholarships: [
        { id: 1, name: "Test", weeksLeft: 4, sponsor: "Sponsor", amount: 1000, description: "desc", rankings: [1, 0, 0, 0, 0] },
      ],
      submitAnswer: vi.fn(),
      totalCorrect: { correct: 3, incorrect: 2 },
      progressArray: [true, true, true, false, false],
      questionId: 4,
      totalQuestions: 5,
      isGameOver: true,
    } as any);

    render(<Minigame1 onComplete={vi.fn()} />);

    expect(await screen.findByText("Game Over!")).toBeInTheDocument();
    expect(screen.getByText("You got 3 out of 5 correct.")).toBeInTheDocument();
  });

  it("shows final answer feedback before Game Over popup", async () => {
    render(<Minigame1 onComplete={vi.fn()} />);

    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText("Scholarship 1"));
      fireEvent.click(screen.getByText("Submit"));

      if (i < 4) {
        fireEvent.click(screen.getByRole("button", { name: /ok!/i }));
      }
    }

    expect(screen.queryByText("Game Over!")).not.toBeInTheDocument();
    expect(screen.getByText(/Correct!|Incorrect/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /ok!/i }));

    await waitFor(() => {
      expect(screen.getByText("Game Over!")).toBeInTheDocument();
    });
  });
});

//  source: https://vitest.dev/guide/browser/component-testing
//  source: https://vitest.dev/api/expect 
//  source: https://testing-library.com/docs/guide-disappearance/ 