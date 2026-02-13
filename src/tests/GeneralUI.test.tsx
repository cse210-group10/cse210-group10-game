import { describe, test, expect, vi } from 'vitest'

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