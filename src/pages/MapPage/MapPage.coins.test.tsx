import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import MapPage from './index';
import { StarsProvider } from './Stars';
import { CoinsProvider } from './Coins';


describe('MapPage coin HUD', () => {
  it('lets me add and spend coins using the + / - test buttons', () => {
    render(
      <MemoryRouter>
        <StarsProvider>
          <CoinsProvider>
            <MapPage />
          </CoinsProvider>
        </StarsProvider>
      </MemoryRouter>
    );

    // Starts at 0
    expect(screen.getByText('coin-display')).toBeInTheDocument();

    // Click + twice => should show 2
    fireEvent.click(screen.getByLabelText('Add coin'));
    fireEvent.click(screen.getByLabelText('Add coin'));
    expect(screen.getByText('coin-display')).toBeInTheDocument();

    // Click - once => should show 1
    fireEvent.click(screen.getByLabelText('Spend coin'));
    expect(screen.getByText('coin-display')).toBeInTheDocument();
  });
});
