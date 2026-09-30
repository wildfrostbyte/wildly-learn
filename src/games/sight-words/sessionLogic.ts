import { pickRoundOptions, shuffle } from "../../lib/quiz";
import type { QuizRules } from "../../lib/useQuizSession";
import { wordsForLevel } from "./words";
import type { SightWord, WordSettings } from "./types";

export const wordQuizRules: QuizRules<SightWord, WordSettings> = {
  buildOrder: ({ level }) => shuffle(wordsForLevel(level)),
  buildOptions: pickRoundOptions,
};
