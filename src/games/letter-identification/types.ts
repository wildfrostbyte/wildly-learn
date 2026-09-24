export type LetterCase = "upper" | "lower";

export type Letter = {
  char: string;
  confusableWithUpper?: string[];
  confusableWithLower?: string[];
};

export type SessionMode = "full" | "half";

export type Session = {
  mode: SessionMode;
  letterCase: LetterCase;
  order: Letter[];
  currentRound: number;
  results: { letter: string; correct: boolean }[];
};

export type RoundOutcome = "correct" | "incorrect" | null;
