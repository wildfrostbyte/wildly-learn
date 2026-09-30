# Numbers

Game-specific notes only — shared patterns live in [ARCHITECTURE.md](../../../ARCHITECTURE.md).

- **Mechanics:** one setting, not levels — full (0–20) or half (~11 random
  numbers), chosen on the setup screen and held for the whole session. No
  case dimension, unlike Letters.
- **Content:** `numbers.ts` — `NUMBERS`, the values 0 through 20.
- **Menu icon:** `lib/icons/NumberSpeakerIcon.tsx`, sized via the shared
  `iconTextStyle.ts` tokens. The setup screen's range picker reuses Letters'
  `LetterStripFullIcon`/`LetterStripHalfIcon` directly — they're generic
  range indicators, not letter-specific, so there's no numbers-only fork.
- **Identity color:** uses `--accent-tertiary` (red) for its menu tile and
  setup-screen selection — the first game to use it that way, distinct from
  its unrelated use as the fixed correct/incorrect answer color during play.
