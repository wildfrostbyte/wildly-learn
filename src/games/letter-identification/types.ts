import type { QuizSession } from "../../lib/useQuizSession";

export type LetterCase = "upper" | "lower";

export type Letter = {
  char: string;
  lowercase: string;
  uppercase: string;
  phonetic: string;
  confusableWithUpper?: string[];
  confusableWithLower?: string[];
};

export type SessionMode = "full" | "half";

export type LetterSettings = { mode: SessionMode; letterCase: LetterCase };

export type Session = QuizSession<Letter, LetterSettings>;
