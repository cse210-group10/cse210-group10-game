import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CoinsProvider, useCoins } from './Coins';


// We render it in the test, then click buttons to simulate user actions.
function CoinTester() {
  const { coins, addCoins, spendCoins, setCoins } = useCoins();

  return (
    <div>
      <div aria-label="coin-value">{coins}</div>

      <button onClick={() => addCoins(1)}>add</button>
      <button onClick={() => spendCoins(1)}>spend</button>

      <button onClick={() => addCoins(-5)}>add-negative</button>
      <button onClick={() => addCoins(2.9)}>add-decimal</button>
      <button onClick={() => spendCoins(999)}>spend-too-much</button>
      <button onClick={() => setCoins(-10)}>set-negative</button>
      <button onClick={() => setCoins(7.8)}>set-decimal</button>
    </div>
  );
}

describe('CoinsProvider / useCoins', () => {
  it('starts at 0 coins', () => {
    render(
      <CoinsProvider>
        <CoinTester />
      </CoinsProvider>
    );

    expect(screen.getByLabelText('coin-value').textContent).toBe('0');
  });

  it('adds and spends coins correctly', () => {
    render(
      <CoinsProvider>
        <CoinTester />
      </CoinsProvider>
    );

    // Click "add" twice => coins should be 2
    const addBtns = screen.getAllByText('add');
    fireEvent.click(addBtns[0]);
    fireEvent.click(addBtns[0]);
    const coinValues = screen.getAllByLabelText('coin-value');
    expect(coinValues[0].textContent).toBe('2');

    // Click "spend" once => coins should be 1
    const spendBtns = screen.getAllByText('spend');
    fireEvent.click(spendBtns[0]);
    expect(coinValues[0].textContent).toBe('1');
  });

  it('never goes below 0 coins', () => {
    render(
      <CoinsProvider>
        <CoinTester />
      </CoinsProvider>
    );

    // We start at 0. If we spend, it should still be 0 (not -1).
    const spendBtns = screen.getAllByText('spend');
    fireEvent.click(spendBtns[0]);
    const coinValues = screen.getAllByLabelText('coin-value');
    expect(coinValues[0].textContent).toBe('0');
  });

  it('ignores negative adds (edge case)', () => {
    render(
      <CoinsProvider>
        <CoinTester />
      </CoinsProvider>
    );

    // Adding -5 should do nothing.
    const addNegativeBtns = screen.getAllByText('add-negative');
    fireEvent.click(addNegativeBtns[0]);
    const coinValues = screen.getAllByLabelText('coin-value');
    expect(coinValues[0].textContent).toBe('0');
  });

  it('floors decimals (edge case)', () => {
    render(
      <CoinsProvider>
        <CoinTester />
      </CoinsProvider>
    );

    // addCoins(2.9) should become addCoins(2)
    const addDecimalBtns = screen.getAllByText('add-decimal');
    fireEvent.click(addDecimalBtns[0]);
    const coinValues = screen.getAllByLabelText('coin-value');
    expect(coinValues[0].textContent).toBe('2');

    // setCoins(7.8) should become 7
    const setDecimalBtns = screen.getAllByText('set-decimal');
    fireEvent.click(setDecimalBtns[0]);
    expect(coinValues[0].textContent).toBe('7');
  });

  it('clamps spending and setting so coins never becomes negative (edge case)', () => {
    render(
      <CoinsProvider>
        <CoinTester />
      </CoinsProvider>
    );

    // If we try to spend way more coins than we have, it should clamp to 0.
    const spendTooMuchBtns = screen.getAllByText('spend-too-much');
    fireEvent.click(spendTooMuchBtns[0]);
    const coinValues = screen.getAllByLabelText('coin-value');
    expect(coinValues[0].textContent).toBe('0');

    // If we try to set coins to a negative number, it should clamp to 0.
    const setNegativeBtns = screen.getAllByText('set-negative');
    fireEvent.click(setNegativeBtns[0]);
    expect(coinValues[0].textContent).toBe('0');
  });
});
