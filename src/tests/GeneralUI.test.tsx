import { describe, test, expect, vi, it, beforeEach } from 'vitest'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { BackButton } from '../components/BackButton.tsx'

describe('BackButton', () => {
  test('calls navigate to map when clicked', () => {
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>) 

    fireEvent.click(screen.getByText('←'))

    expect(mockNavigate).toHaveBeenCalledWith('/map')
  })
})

import '@testing-library/jest-dom';
import Popup from '../components/Popup';

describe('Popup', () => {
  const mockOnClose = vi.fn();

  const defaultProps = {
    title: 'Test Title',
    content: 'Test content.',
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and content', () => {
    render(<Popup {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ok!/i })).toBeInTheDocument();
  });

  it('calls onClose when Ok button is clicked', () => {
    render(<Popup {...defaultProps} />);

    const button = screen.getByRole('button', { name: /Ok!/i });
    fireEvent.click(button);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
