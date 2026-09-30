import { pickRoundOptions, shuffle } from "../../lib/quiz";
import type { QuizRules } from "../../lib/useQuizSession";
import { NUMBERS } from "./numbers";
import type { NumberItem, NumberSettings } from "./types";

const HALF_MODE_NUMBER_COUNT = 11;

export const numberQuizRules: QuizRules<NumberItem, NumberSettings> = {
  buildOrder: ({ mode }) => {
    const shuffledNumbers = shuffle(NUMBERS);
    return mode === "full" ? shuffledNumbers : shuffledNumbers.slice(0, HALF_MODE_NUMBER_COUNT);
  },
  buildOptions: pickRoundOptions,
};
