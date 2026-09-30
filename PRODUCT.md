# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Young children in early literacy stages — pre-readers learning the alphabet and early readers building sight-word recognition, both around the same age/child. Built first for the developer's own kid(s) at home, with the app also open to other families who find it (not tied to individual accounts or a specific household).

## Product Purpose

A tap-and-listen early-literacy drill app. The app speaks a letter or word aloud (via the browser's speech synthesis) and the child taps the matching card among a small set of options. Two games today: Letter Identification (uppercase/lowercase letter recognition, full or half alphabet) and Sight Words (four levels of common sight words). Success is a completed round with a correct/incorrect recap and the option to retry.

## Positioning

A minimal, ad-free, account-free audio-matching drill built specifically for pre-readers — the child never has to read instructions or type, only listen and tap. Distinct from typical letter/word apps in scope (two focused games, not a broad curriculum) and in cost/privacy model (fully static, no backend, no data collection).

## Operating Context

- Used directly by a young child on a phone or tablet, with a parent/guardian nearby some of the time — confirmed by mobile-first layouts, large tap targets, and iOS Safari-specific speech-synthesis fixes already in the codebase (e.g. capital-letter and "e"/"g" announcement bugs).
- Deployed as a static site on Cloudflare (Workers/Pages via `wrangler`), built with React + TypeScript + Vite. No backend, no database, no user accounts.
- Session flow per game: a setup screen (choose mode/case, or level) → a sequence of rounds (listen, tap an answer, see correct/incorrect feedback) → a completion screen with a per-item recap and a retry option.
- Two visual themes, both branded (not generic light/dark): light theme is Pokémon-themed (red/blue/yellow/white, a game-ball mark by the title), dark theme is Minnesota Wild-themed (forest green/gold/Iron Range red, an evergreen-tree mark by the title). This pairing is a confirmed brand commitment — see below.

## Capabilities and Constraints

- Confirmed: free, ad-free, no accounts, no data collection — the app should stay fully client-side with no backend added casually.
- Planned: more games are expected beyond the current two (Letter Identification, Sight Words); shared patterns (session setup → rounds → completion, answer-grid tap UI, speech + tone feedback, shared `ActionButton`/`RetryButton`/`AnswerFeedback` components) should stay reusable for future games rather than being special-cased to just these two.
- Desired: the app should keep working on a shared family device with unreliable/offline connectivity. Today it loads Google Fonts (Pacifico, Press Start 2P) from a CDN at runtime, which is a gap against this goal — worth revisiting (e.g. self-hosting fonts) in future work rather than assumed already solved.
- Speech relies on the browser's `SpeechSynthesis` API (voice selection tuned to prefer natural-sounding female voices; iOS Safari needed several targeted fixes for mispronounced letters).

## Brand Commitments

- Product name: "Wildly Learning".
- Two-theme system is binding: light = Pokémon-branded (blue/white/red/yellow palette, game-ball icon), dark = Minnesota Wild-branded (forest green/gold/red palette, evergreen-tree icon). These two palettes must never be unified or drift toward each other — each is its own brand, only the active theme's mark shows (no Poké Ball in the Wild theme or vice versa).
- Typography: "Press Start 2P" (pixel font) for body/UI text in the light theme, "Pacifico" (cursive) for the title, with the dark theme currently falling back to system UI font (Segoe UI) for body text rather than the pixel font.

## Evidence on Hand

- No external content, testimonials, or press — this is a small personal/family tool, not a marketed product. Nothing here should be fabricated (no fake reviews, stats, or claims of a broader user base than confirmed).
- Sight word lists and letter sets are hardcoded in `src/games/sight-words/words.ts` and `src/games/letter-identification/letters.ts`.

## Product Principles

1. The child is the user, not the parent — every interaction should require only listening and tapping, never reading instructions or typing.
2. Stay free, ad-free, and data-collection-free; don't introduce a backend or accounts for convenience's sake.
3. Keep the two themes as genuine, distinct brand identities (Pokémon / Minnesota Wild) rather than a generic light/dark toggle — changes to one theme must not pull the other toward it.
4. Build new games on the shared session → rounds → completion pattern and shared components already established, so the app scales to more games without duplicating logic per game.
5. Favor resilience on a shared, possibly offline family device over adding features that assume a steady connection or a single dedicated user.

## Accessibility & Inclusion

No formal accessibility standard has been specified. The app already uses large tap targets, audio-first interaction (no reading required to play), and `aria-label`/accessible naming on controls — treat these as a floor to preserve, not a ceiling to stop at.
