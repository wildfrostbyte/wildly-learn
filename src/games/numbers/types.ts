import type { QuizSession } from "../../lib/useQuizSession";

export type NumberItem = { value: number };

export type SessionMode = "full" | "half";

export type NumberSettings = { mode: SessionMode };

export type Session = QuizSession<NumberItem, NumberSettings>;
