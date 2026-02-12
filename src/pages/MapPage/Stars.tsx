import type { StarsContextValue } from '../../types/Minigame';
import React, { useState, useContext, createContext } from 'react';


const StarsContext = createContext<StarsContextValue | undefined>(undefined);

export const StarsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stars, setStars] = useState(0);

  const addStars = (earned: number) => {
    if (earned < 0) return; // no negative stars
    if (earned > 3) earned = 3; // max 3 stars per minigame
    setStars(prev => prev + earned);
  };

  return (
    <StarsContext.Provider value={{ stars, addStars }}>
      {children}
    </StarsContext.Provider>
  );
};

export const useStars = () => {
  const context = useContext(StarsContext);
  if (!context) {
    throw new Error("useStars must be used inside StarsProvider");
  }
  return context;
};
