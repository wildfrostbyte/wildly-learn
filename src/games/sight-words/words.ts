import type { Level, SightWord } from "./types";

const WORDS_BY_LEVEL: Record<Level, string[]> = {
  1: ["a", "I", "go", "the", "up"],
  2: ["my", "we", "me", "see", "you"],
  3: ["is", "in", "to", "and", "not"],
  4: ["it", "run", "red", "big", "for"],
};

export const LEVELS: Level[] = [1, 2, 3, 4];

export function wordsForLevel(level: Level): SightWord[] {
  return WORDS_BY_LEVEL[level].map((text) => ({ text }));
}
