import { ALPHABET } from "./letters";
import type { Letter, LetterCase, SessionMode } from "./types";

const HALF_MODE_LETTER_COUNT = 13;

export function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildSessionOrder(mode: SessionMode): Letter[] {
  const shuffledAlphabet = shuffle(ALPHABET);
  return mode === "full"
    ? shuffledAlphabet
    : shuffledAlphabet.slice(0, HALF_MODE_LETTER_COUNT);
}

export function getOptionCountForRound(roundNumber: number): 2 | 3 | 4 {
  if (roundNumber <= 2) return 2;
  if (roundNumber <= 5) return 3;
  return 4;
}

function confusablesOf(letter: Letter, letterCase: LetterCase): string[] {
  const confusables =
    letterCase === "upper"
      ? letter.confusableWithUpper
      : letter.confusableWithLower;
  return confusables ?? [];
}

export function buildRoundOptions(
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
