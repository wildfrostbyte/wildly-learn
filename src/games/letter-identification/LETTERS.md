# Letter Identification

Game-specific notes only — shared patterns live in [ARCHITECTURE.md](../../../ARCHITECTURE.md).

- **Mechanics:** two independent settings, not levels — alphabet range
  (full or half) and letter case (upper/lower), both chosen on the setup
  screen and held for the whole session.
- **Content:** raw alphabet data is `letters.json`; `letters.ts` wraps it with
  phonetic lookup (for `speech.ts`, e.g. "e" vs "g" disambiguation) and
  per-case confusable-letter pairs (`B/D`, `p/q`, etc.) used to pick
  deliberately-tricky wrong answers, not random ones.
- **Menu icon:** `lib/icons/LetterSpeakerIcon.tsx`, sized via the shared
  `iconTextStyle.ts` tokens.
