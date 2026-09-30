# Architecture

Engineering reference only. Product/users/purpose/brand truth lives in
[PRODUCT.md](PRODUCT.md) — don't restate it here.

## Stack

React + TypeScript + Vite. Static/client-only, no backend. Deployed to
Cloudflare via `wrangler` (`wrangler.jsonc`).

## Folder layout

- `src/games/<game>/` — one game's screens, session logic, and data.
- `src/components/` — shared UI used across games.
- `src/lib/` — cross-game logic: `useQuizSession.ts`, `quiz.ts`, `speech.ts`, `tones.ts`, `icons/`.
- `src/styles/` — CSS shared by every game's screens (setup, round, review, completion, answer grid).

## Session pattern

All games run on one hook, `useQuizSession(rules)` (`lib/useQuizSession.ts`).
Each game's `sessionLogic.ts` exports only its rules — how to build the
session order and each round's options (`lib/quiz.ts` has `shuffle` and a
default `pickRoundOptions`). The hook returns:

```
phase, session, currentTarget, currentOptions, roundOutcome,
startSession, submitAnswer, exitSession
```

The game's top-level `<Game>.tsx` switches on `phase` between its
`SetupScreen`, `RoundScreen`, and `CompletionScreen`.

## Styles

CSS is global, so two files defining the same selector silently override
each other. Shared screen styles live once in `src/styles/`; a game's own
tweaks go in its folder, scoped with a modifier class (e.g.
`completion-screen--words`) or a CSS variable (e.g. `--picker-selected`).

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
2. Export the game's rules from `sessionLogic.ts` and call `useQuizSession`;
   import the shared `src/styles/` CSS and components — don't fork them.
3. Register it in `src/games/index.ts`.
4. Add a per-game doc in that folder, named for the game.

## Keeping these docs current

This file and each game's doc describe the code, not the other way around —
if a change makes one of these bullets wrong (a renamed hook field, a new
shared component, a game's mechanics changing), update the doc as part of
that same change. Skip it only when nothing here actually became inaccurate.
