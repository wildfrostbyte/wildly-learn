export type NumberItem = { value: number };

export type SessionMode = "full" | "half";

export type Session = {
  mode: SessionMode;
  order: NumberItem[];
  currentRound: number;
  results: { value: number; correct: boolean }[];
};

export type RoundOutcome = "correct" | "incorrect" | null;
