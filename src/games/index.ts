import type { GameDefinition } from "../types";
import { LetterIdentificationGame } from "./letter-identification/LetterIdentificationGame";
import { LetterSpeakerIcon } from "../lib/icons/LetterSpeakerIcon";
import { SightWordsGame } from "./sight-words/SightWordsGame";
import { SightWordIcon } from "../lib/icons/SightWordIcon";

export const games: GameDefinition[] = [
  {
    id: "letter-identification",
    title: "Letters",
    description: "Listen to a letter and tap the matching card.",
    accentColor: "var(--accent-primary)",
    accentContrast: "var(--accent-primary-contrast)",
    icon: LetterSpeakerIcon,
    component: LetterIdentificationGame,
  },
  {
    id: "sight-words",
    title: "Sight Words",
    description: "Listen to a word and tap the matching card.",
    accentColor: "var(--accent-secondary)",
    accentContrast: "var(--accent-secondary-contrast)",
    icon: SightWordIcon,
    component: SightWordsGame,
  },
];
