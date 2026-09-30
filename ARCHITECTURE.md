# Architecture

Engineering reference only. Product/users/purpose/brand truth lives in
[PRODUCT.md](PRODUCT.md) — don't restate it here.

## Stack

React + TypeScript + Vite. Static/client-only, no backend. Deployed to
Cloudflare via `wrangler` (`wrangler.jsonc`).

## Folder layout

- `src/games/<game>/` — one game's screens, session logic, and data.
- `src/components/` — shared UI used across games.
- `src/lib/` — cross-game utilities: `speech.ts`, `tones.ts`, `icons/`.

## Session pattern

Every game's `use<Game>Session.ts` hook returns the same shape, driven by
`sessionLogic.ts` (session ordering, round options):

```
phase, session, currentTarget, currentOptions, roundOutcome,
startSession, submitAnswer, exitSession
```

The game's top-level `<Game>.tsx` switches on `phase` between its
`SetupScreen`, `RoundScreen`, and `CompletionScreen`. Match this shape for
any new game — it's what the shared screens/components assume.

## Shared components (`src/components/`)

- `ActionButton` — Listen/Play buttons; `variant="primary"` adds the glow (Play only).
- `RetryButton` — "play again" on completion screens.
- `AnswerFeedback` — the ✓/✗ pop-up + tone, shown on `roundOutcome`.
- `IconButton`, `GameCard` — general-purpose chrome.

## Gotchas

- **Theming is brand-locked.** Light theme = Pokémon, dark theme = Minnesota
  Wild (see PRODUCT.md). Never unify or blend the two palettes.
- **iOS Safari needs a primed user gesture.** Call `primeSpeech()`
  (`lib/speech.ts`) and `primeTones()` (`lib/tones.ts`) from inside the
  tap handler that starts a session — not from an effect.

## Adding a new game

1. New folder under `src/games/<game>/` with the file set above.
2. Reuse the session hook shape, `sessionLogic.ts` pattern, and the shared
   components — don't fork new versions of `ActionButton`/`AnswerFeedback`/etc.
3. Register it in `src/games/index.ts`.
4. Add a per-game doc in that folder, named for the game.

## Keeping these docs current

This file and each game's doc describe the code, not the other way around —
if a change makes one of these bullets wrong (a renamed hook field, a new
shared component, a game's mechanics changing), update the doc as part of
that same change. Skip it only when nothing here actually became inaccurate.
