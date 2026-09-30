import { shuffle } from "../../lib/quiz";
import type { QuizRules } from "../../lib/useQuizSession";
import { ALPHABET } from "./letters";
import type { Letter, LetterCase, LetterSettings, SessionMode } from "./types";

const HALF_MODE_LETTER_COUNT = 13;

function buildSessionOrder(mode: SessionMode): Letter[] {
  const shuffledAlphabet = shuffle(ALPHABET);
  return mode === "full" ? shuffledAlphabet : shuffledAlphabet.slice(0, HALF_MODE_LETTER_COUNT);
}

function confusablesOf(letter: Letter, letterCase: LetterCase): string[] {
  const confusables =
    letterCase === "upper" ? letter.confusableWithUpper : letter.confusableWithLower;
  return confusables ?? [];
}

function buildRoundOptions(
  pool: Letter[],
  target: Letter,
  optionCount: number,
  letterCase: LetterCase,
): Letter[] {
  const excludedChars = new Set(confusablesOf(target, letterCase));
  const candidates = shuffle(pool.filter((letter) => letter.char !== target.char));

  const distractors: Letter[] = [];
  for (const candidate of candidates) {
    if (distractors.length >= optionCount - 1) break;
    if (excludedChars.has(candidate.char)) continue;
    distractors.push(candidate);
    confusablesOf(candidate, letterCase).forEach((char) => excludedChars.add(char));
  }

  return shuffle([target, ...distractors]);
}

export const letterQuizRules: QuizRules<Letter, LetterSettings> = {
  buildOrder: (settings) => buildSessionOrder(settings.mode),
  buildOptions: (pool, target, optionCount, settings) =>
    buildRoundOptions(pool, target, optionCount, settings.letterCase),
};
