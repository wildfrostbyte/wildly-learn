import type { Letter, LetterCase } from "./types";

// Kept separate per case since lowercase has more visually-similar
// letterforms than uppercase (stem/bowl orientation pairs).
const UPPERCASE_CONFUSABLE_PAIRS: [string, string][] = [
  ["B", "D"],
  ["P", "Q"],
  ["M", "W"],
  ["M", "N"],
];

const LOWERCASE_CONFUSABLE_PAIRS: [string, string][] = [
  ["b", "d"],
  ["p", "q"],
  ["m", "n"],
  ["u", "v"],
  ["u", "n"],
];

function confusablesFor(letter: string, pairs: [string, string][]): string[] {
  return pairs
    .filter((pair) => pair.includes(letter))
    .map((pair) => (pair[0] === letter ? pair[1] : pair[0]));
}

export const ALPHABET: Letter[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .map((upperChar) => {
    const lowerChar = upperChar.toLowerCase();
    return {
      char: upperChar,
      confusableWithUpper: confusablesFor(upperChar, UPPERCASE_CONFUSABLE_PAIRS),
      confusableWithLower: confusablesFor(lowerChar, LOWERCASE_CONFUSABLE_PAIRS),
    };
  });

export function toDisplayChar(letter: string, letterCase: LetterCase): string {
  return letterCase === "upper" ? letter.toUpperCase() : letter.toLowerCase();
}
