import type { StarsContextValue } from '../../types/Minigame';
import React, { useState, useContext, createContext } from 'react';

// Track stars earned per minigame level (max 3 per level)
type LevelStars = Record<string, number>;

const StarsContext = createContext<StarsContextValue | undefined>(undefined);

export const StarsProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalStars, setTotalStars] = useState(0);
  const [levelStars, setLevelStars] = useState<LevelStars>({});

  const addStars = (levelId: string, earned: number) => {
    // Get current stars for this level
    const currentLevelStars = levelStars[levelId] || 0;
    
    // Only add stars if the new score is higher than current
    // and we haven't reached max (3 stars)
    if (earned > currentLevelStars) {
      const maxStars = 3;
      const newStars = Math.min(earned, maxStars);
      const starsToAdd = newStars - currentLevelStars;
      
      setTotalStars(prev => prev + starsToAdd);
      setLevelStars(prev => ({
        ...prev,
        [levelId]: newStars
      }));
    }
  };

  const getLevelStars = (levelId: string): number => {
    return levelStars[levelId] || 0;
  };

  return (
    <StarsContext.Provider value={{ stars: totalStars, addStars, getLevelStars }}>
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
