export type Level = 1 | 2 | 3 | 4;

export type SightWord = { text: string };

export type Session = {
  level: Level;
  order: SightWord[];
  currentRound: number;
  results: { word: string; correct: boolean }[];
};

export type RoundOutcome = "correct" | "incorrect" | null;
