import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Minigame1 from '../minigames/minigame1-scholarship';

describe('Minigame1 progress integration', () => {
  it('initializes the shared progress bar with the game question count', () => {
    const progress = {
      init: vi.fn(),
      markCorrect: vi.fn(),
      markIncorrect: vi.fn(),
      reset: vi.fn(),
      getProgress: vi.fn(() => ({ total: 0, statuses: [] })),
    };

    render(<Minigame1 onComplete={vi.fn()} progress={progress} />);

    expect(progress.init).toHaveBeenCalledWith(5);
  });

  it('marks the first question after the player submits an answer', () => {
    const progress = {
      init: vi.fn(),
      markCorrect: vi.fn(),
      markIncorrect: vi.fn(),
      reset: vi.fn(),
      getProgress: vi.fn(() => ({ total: 0, statuses: [] })),
    };

    render(<Minigame1 onComplete={vi.fn()} progress={progress} />);

    fireEvent.click(screen.getByRole('button', { name: /scholarship 1/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const totalMarks = progress.markCorrect.mock.calls.length + progress.markIncorrect.mock.calls.length;
    const markedIndex = progress.markCorrect.mock.calls[0]?.[0] ?? progress.markIncorrect.mock.calls[0]?.[0];

    expect(totalMarks).toBe(1);
    expect(markedIndex).toBe(0);
  });
});