export interface MinigameResult {
  stars: number;
}

export interface MinigameProps {
  onComplete: (result: MinigameResult) => void;
}

export type StarsContextValue = {
  stars: number;
  addStars: (earned: number) => void;
};

