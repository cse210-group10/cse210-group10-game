import Minigame1, { metadata as meta1 } from './minigame1-scholarship';
import Minigame2, { metadata as meta2 } from './minigame2-budgeting';
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
};