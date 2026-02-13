import React, { createContext, useContext, useState } from 'react';

type CoinsContextValue = {
  // The current number of coins we have.
  coins: number;

  // Add coins
  addCoins: (amount: number) => void;

  // Spend/remove coins
  spendCoins: (amount: number) => void;

  // Used AI for this segment supposed to help with debugging and feature testing
  setCoins: (value: number) => void;
};

const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

// Everything inside this provider can read/update coins using the useCoins() hook.
export const CoinsProvider = ({ children }: { children: React.ReactNode }) => {
  // Start at 0 coins.
  const [coins, setCoinsState] = useState<number>(0);


  // Stays as a whole number no decimals
  const setCoins = (value: number) => {
    // Math.max(0, ...) prevents negative coins.
    setCoinsState(Math.max(0, Math.floor(value)));
  };

  // If someone tries to add a negative amount, we treat it like adding 0.
  const addCoins = (amount: number) => {
    setCoinsState((prev) => {
      const safeAmount = Math.max(0, Math.floor(amount));
      return prev + safeAmount;
    });
  };

  // If you try to spend more than you have, it will clamp at 0.
  const spendCoins = (amount: number) => {
    setCoinsState((prev) => {
      const safeAmount = Math.max(0, Math.floor(amount));
      return Math.max(0, prev - safeAmount);
    });
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, spendCoins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinsContext);

  if (!context) {
    throw new Error('useCoins must be used inside CoinsProvider');
  }

  return context;
};
