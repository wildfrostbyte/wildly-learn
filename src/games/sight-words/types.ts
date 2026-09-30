import type { QuizSession } from "../../lib/useQuizSession";

export type Level = 1 | 2 | 3 | 4;

export type SightWord = { text: string };

export type WordSettings = { level: Level };

export type Session = QuizSession<SightWord, WordSettings>;
