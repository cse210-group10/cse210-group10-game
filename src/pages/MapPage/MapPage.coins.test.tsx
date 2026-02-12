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

    const coinDisplay = screen.getByLabelText('coin-display');

    // Starts at 0
    expect(coinDisplay).toHaveTextContent('0');

    // Click + twice => should show 2
    fireEvent.click(screen.getByLabelText('Add coin'));
    fireEvent.click(screen.getByLabelText('Add coin'));
    expect(coinDisplay).toHaveTextContent('2');

    // Click - once => should show 1
    fireEvent.click(screen.getByLabelText('Spend coin'));
    expect(coinDisplay).toHaveTextContent('1');
  });

  it('never goes below 0 (edge case)', () => {
    renderMapPage();

    const coinDisplay = screen.getByLabelText('coin-display');

    // Spend at 0 should stay 0
    fireEvent.click(screen.getByLabelText('Spend coin'));
    expect(coinDisplay).toHaveTextContent('0');
  });

  it('resets coins back to 0 (dev-only button)', () => {
    renderMapPage();

    const coinDisplay = screen.getByLabelText('coin-display');

    // First, add some coins so reset actually has something to change
    fireEvent.click(screen.getByLabelText('Add coin'));
    fireEvent.click(screen.getByLabelText('Add coin'));
    expect(coinDisplay).toHaveTextContent('2');

    // Now click reset and confirm it goes back to 0
    const resetBtn = screen.queryByLabelText('Reset coins');
    expect(resetBtn).toBeTruthy();

    fireEvent.click(resetBtn!);
    expect(coinDisplay).toHaveTextContent('0');
  });
});
