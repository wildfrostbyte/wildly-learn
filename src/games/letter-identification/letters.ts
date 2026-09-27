import lettersData from "./letters.json";
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

export const ALPHABET: Letter[] = lettersData.letters.map((entry) => ({
  char: entry.uppercase,
  lowercase: entry.lowercase,
  uppercase: entry.uppercase,
  phonetic: entry.phonetic,
  confusableWithUpper: confusablesFor(entry.uppercase, UPPERCASE_CONFUSABLE_PAIRS),
  confusableWithLower: confusablesFor(entry.lowercase, LOWERCASE_CONFUSABLE_PAIRS),
}));

const LETTERS_BY_CHAR = new Map(ALPHABET.map((letter) => [letter.char, letter]));

export function toDisplayChar(char: string, letterCase: LetterCase): string {
  const letter = LETTERS_BY_CHAR.get(char.toUpperCase());
  if (!letter) return char;
  return letterCase === "upper" ? letter.uppercase : letter.lowercase;
}

export function phoneticFor(char: string): string {
  const letter = LETTERS_BY_CHAR.get(char.toUpperCase());
  return letter ? letter.phonetic : char;
}
