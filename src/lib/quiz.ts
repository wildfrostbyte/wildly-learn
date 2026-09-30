export type RoundOutcome = "correct" | "incorrect" | null;

export function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getOptionCountForRound(roundNumber: number): 2 | 3 | 4 {
  if (roundNumber <= 2) return 2;
  if (roundNumber <= 5) return 3;
  return 4;
}

export function pickRoundOptions<T>(pool: T[], target: T, optionCount: number): T[] {
  const distractors = shuffle(pool.filter((item) => item !== target)).slice(0, optionCount - 1);
  return shuffle([target, ...distractors]);
}
