import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import MapPage from './index';
import { StarsProvider } from './Stars';
import { CoinsProvider } from './Coins';

function renderMapPage() {
  return render(
    <MemoryRouter>
      <StarsProvider>
        <CoinsProvider>
          <MapPage />
        </CoinsProvider>
      </StarsProvider>
    </MemoryRouter>
  );
}

describe('MapPage coin HUD', () => {
  it('lets me add and spend coins using the + / - buttons', () => {
    renderMapPage();

    const coinDisplay = screen.getAllByTestId('coin-display')[0];

    // Starts at 0
    expect(coinDisplay.textContent).toBe('0');

    // Click + twice => should show 2
    const addBtns = screen.getAllByLabelText('Add coin');
    fireEvent.click(addBtns[0]);
    fireEvent.click(addBtns[0]);
    expect(coinDisplay.textContent).toBe('2');

    // Click - once => should show 1
    const spendBtns = screen.getAllByLabelText('Spend coin');
    fireEvent.click(spendBtns[0]);
    expect(coinDisplay.textContent).toBe('1');
  });

  it('never goes below 0 (edge case)', () => {
    renderMapPage();

    const coinDisplay = screen.getAllByTestId('coin-display')[0];

    // Spend at 0 should stay 0
    const spendBtns = screen.getAllByLabelText('Spend coin');
    fireEvent.click(spendBtns[0]);
    expect(coinDisplay.textContent).toBe('0');
  });

  it('resets coins back to 0 (dev-only button)', () => {
    renderMapPage();

    const coinDisplay = screen.getAllByTestId('coin-display')[0];

    // First, add some coins so reset actually has something to change
    const addBtns = screen.getAllByLabelText('Add coin');
    fireEvent.click(addBtns[0]);
    fireEvent.click(addBtns[0]);
    expect(coinDisplay.textContent).toBe('2');

    // Now click reset and confirm it goes back to 0
    const resetBtns = screen.getAllByLabelText('Reset coins');
    expect(resetBtns.length).toBeGreaterThan(0);

    fireEvent.click(resetBtns[0]);
    expect(coinDisplay.textContent).toBe('0');
  });
});
