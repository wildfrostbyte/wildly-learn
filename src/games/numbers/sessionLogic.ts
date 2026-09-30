import { NUMBERS } from "./numbers";
import type { NumberItem, SessionMode } from "./types";

const HALF_MODE_NUMBER_COUNT = 11;

export function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildSessionOrder(mode: SessionMode): NumberItem[] {
  const shuffledNumbers = shuffle(NUMBERS);
  return mode === "full"
    ? shuffledNumbers
    : shuffledNumbers.slice(0, HALF_MODE_NUMBER_COUNT);
}

export function getOptionCountForRound(roundNumber: number): 2 | 3 | 4 {
  if (roundNumber <= 2) return 2;
  if (roundNumber <= 5) return 3;
  return 4;
}

export function buildRoundOptions(
  pool: NumberItem[],
  target: NumberItem,
  optionCount: number,
): NumberItem[] {
  const candidates = shuffle(pool.filter((item) => item.value !== target.value));
  const distractors = candidates.slice(0, optionCount - 1);
  return shuffle([target, ...distractors]);
}
