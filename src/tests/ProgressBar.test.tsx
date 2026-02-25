import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { ProgressStatus } from '../types/Minigame';
import ProgressBar from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders nothing when total is 0', () => {
    const { container } = render(<ProgressBar total={0} statuses={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders 5 dots when total=5 and all pending', () => {
    const statuses: ProgressStatus[] = ['pending', 'pending', 'pending', 'pending', 'pending'];
    render(<ProgressBar total={5} statuses={statuses} />);
    const dots = document.querySelectorAll('.progress-dot');
    expect(dots).toHaveLength(5);
    dots.forEach((dot) => expect(dot).toHaveAttribute('data-state', 'pending'));
  });

  it('renders correct and incorrect states on the right dots', () => {
    const statuses: ProgressStatus[] = ['correct', 'incorrect', 'pending'];
    render(<ProgressBar total={3} statuses={statuses} />);
    const dots = document.querySelectorAll('.progress-dot');
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute('data-state', 'correct');
    expect(dots[0]).toHaveClass('progress-dot--correct');
    expect(dots[1]).toHaveAttribute('data-state', 'incorrect');
    expect(dots[1]).toHaveClass('progress-dot--incorrect');
    expect(dots[2]).toHaveAttribute('data-state', 'pending');
    expect(dots[2]).toHaveClass('progress-dot--pending');
  });
});
