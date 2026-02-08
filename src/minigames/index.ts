import React from 'react';
import Minigame1 from './minigame1-scholarship';
import Minigame2 from './minigame2-budgeting';
import Minigame3 from './minigame3-saving';
import Minigame4 from './minigame4-investing';

// Plugin Registry - maps level IDs to minigame components
export const MINIGAMES: Record<string, React.FC> = {
  'level-1': Minigame1,
  'level-2': Minigame2,
  'level-3': Minigame3,
  'level-4': Minigame4,
};

//could use this to hold general UI logic (progress bar, notification pop-ups)