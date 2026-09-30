# Wildly Learning

A tap-and-listen learning site for young kids. Each game speaks a prompt
aloud and the child taps the matching answer — no reading or typing required
to play. It's fully static and client-only: no accounts, no backend, no data
collection.

The site ships as a small set of focused games rather than one broad
curriculum, all built on the same listen-and-tap pattern so new games stay
consistent with the ones already there.

It's also playfully double-branded: the light theme is Pokémon-themed, the
dark theme is Minnesota Wild-themed. That pairing is intentional and
shouldn't be merged into a generic light/dark toggle.

## Developing

```
npm install
npm run dev      # local dev server
npm run build     # typecheck + production build
npm run preview   # serve the production build locally
```

Deploys as a static site to Cloudflare via `wrangler`.

## More context

- [PRODUCT.md](PRODUCT.md) — who this is for, product intent, brand commitments.
- [ARCHITECTURE.md](ARCHITECTURE.md) — code layout and conventions for adding to it.
