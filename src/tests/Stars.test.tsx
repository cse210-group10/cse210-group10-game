import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { StarsProvider, useStars } from '../pages/MapPage/Stars.tsx'

function TestComponent() {
  const { stars, addStars } = useStars()

  return (
    <>
      <span data-testid="stars">{stars}</span>
      <button onClick={() => addStars(5)}>Add 5</button>
      <button onClick={() => addStars(3)}>Add 3</button>
      <button onClick={() => addStars(-1)}>Add -1</button>
    </>
  )
}

describe('StarsContext', () => {
  test('adds stars correctly', () => {
    render(
      <StarsProvider>
        <TestComponent />
      </StarsProvider>
    )

    expect(screen.getByTestId('stars').textContent).toBe('0')

    fireEvent.click(screen.getByText('Add 3'))

    expect(screen.getByTestId('stars').textContent).toBe('3')

    fireEvent.click(screen.getByText('Add -1')) // no negative numbers

    expect(screen.getByTestId('stars').textContent).toBe('3')

    fireEvent.click(screen.getByText('Add 5')) // max number of stars obtained at once is 3
    
    expect(screen.getByTestId('stars').textContent).toBe('6')
  })
})