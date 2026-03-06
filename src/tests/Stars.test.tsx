import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { StarsProvider, useStars } from '../pages/MapPage/Stars.tsx'

function TestComponent() {
  const { stars, addStars, getLevelStars } = useStars()

  return (
    <>
      <span data-testid="stars">{stars}</span>
      <span data-testid="level1-stars">{getLevelStars('level-1')}</span>
      <button onClick={() => addStars('level-1', 5)}>Set 5 to level 1</button>
      <button onClick={() => addStars('level-1', 3)}>Set 3 to level 1</button>
      <button onClick={() => addStars('level-1', 2)}>Set 2 to level 1</button>
      <button onClick={() => addStars('level-1', 1)}>Set 1 to level 1</button>
      <button onClick={() => addStars('level-2', 2)}>Set 2 to level 2</button>
    </>
  )
}

describe('StarsContext', () => {
  test('only adds stars when new score is higher, max 3 per level', () => {
    render(
      <StarsProvider>
        <TestComponent />
      </StarsProvider>
    )

    expect(screen.getByTestId('stars').textContent).toBe('0')

    // Set 2 stars - should work
    fireEvent.click(screen.getByText('Set 2 to level 1'))
    expect(screen.getByTestId('stars').textContent).toBe('2')
    expect(screen.getByTestId('level1-stars').textContent).toBe('2')

    // Try to set 1 star - lower than current (2), should not update
    fireEvent.click(screen.getByText('Set 1 to level 1'))
    expect(screen.getByTestId('stars').textContent).toBe('2')
    expect(screen.getByTestId('level1-stars').textContent).toBe('2')

    // Set 3 stars - higher than current (2), should update
    fireEvent.click(screen.getByText('Set 3 to level 1'))
    expect(screen.getByTestId('stars').textContent).toBe('3')
    expect(screen.getByTestId('level1-stars').textContent).toBe('3')

    // Try to set 5 stars - max is 3, stays at 3
    fireEvent.click(screen.getByText('Set 5 to level 1'))
    expect(screen.getByTestId('stars').textContent).toBe('3')

    // Add to different level
    fireEvent.click(screen.getByText('Set 2 to level 2'))
    expect(screen.getByTestId('stars').textContent).toBe('5') // 3 + 2 = 5
  })
})
