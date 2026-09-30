# Sight Words

Game-specific notes only — shared patterns live in [ARCHITECTURE.md](../../../ARCHITECTURE.md).

- **Mechanics:** 4 fixed levels (not free-form settings) — the player picks
  a level on the setup screen, each with its own word list.
- **Content:** `words.ts` — `WORDS_BY_LEVEL`, 5 words per level.
- **Menu icon:** `lib/icons/SightWordIcon.tsx`, sized via the shared
  `iconTextStyle.ts` tokens.
