import type { NumberItem } from "./types";

const MAX_NUMBER = 20;

export const NUMBERS: NumberItem[] = Array.from({ length: MAX_NUMBER + 1 }, (_, value) => ({ value }));
