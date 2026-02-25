import Minigame1, { metadata as meta1 } from './minigame1-scholarship';
import Minigame2, { metadata as meta2 } from './minigame2-budgeting';
import Minigame3, { metadata as meta3 } from './minigame3-saving';
import Minigame4, { metadata as meta4 } from './minigame4-investing';
//this is the template minigame, used as testing playground
import Minigame5, {metadata as meta5} from './template';
import type { ComponentType } from "react";
import type { MinigameProps } from "../types/Minigame";

export interface MinigameConfig {
  Component: ComponentType<MinigameProps>;
  metadata: {
    title: string;
    description: string;
    id: string;
    icon?: string;
  };
}


// Plugin Registry - maps level IDs to minigame configs
export const MINIGAMES: Record<string, MinigameConfig> = {
  'level-1': { Component: Minigame1, metadata: meta1 },
  'level-2': { Component: Minigame2, metadata: meta2 },
  'level-3': { Component: Minigame3, metadata: meta3 },
  'level-4': { Component: Minigame4, metadata: meta4 },
  //this is the teamplate minigame, used as testing playground
  //could be commented out later
  'level-5': { Component: Minigame5, metadata: meta5 },
};

//could use this to hold general UI logic (progress bar, notification pop-ups)