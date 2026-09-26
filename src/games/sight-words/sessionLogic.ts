import { wordsForLevel } from "./words";
import type { Level, SightWord } from "./types";

export function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildSessionOrder(level: Level): SightWord[] {
  return shuffle(wordsForLevel(level));
}

export function getOptionCountForRound(roundNumber: number): 2 | 3 | 4 {
  if (roundNumber <= 2) return 2;
  if (roundNumber <= 5) return 3;
  return 4;
}

export function buildRoundOptions(
  pool: SightWord[],
  target: SightWord,
  optionCount: number,
): SightWord[] {
  const candidates = shuffle(pool.filter((word) => word.text !== target.text));
  return shuffle([target, ...candidates.slice(0, optionCount - 1)]);
}
