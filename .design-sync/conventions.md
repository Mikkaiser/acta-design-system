# Building with Acta

Acta is the monochrome, text-led design system behind Mikael Ribeiro's portfolio and blog. Every component is a plain React function on `window.Acta`; there is no provider, no theme object and no CSS class vocabulary. Styling is done entirely with the CSS custom properties below, applied as inline styles.

## Setup

- Load `styles.css` once. It pulls in `_ds_bundle.css`, which holds every token, the Google Fonts import (Bricolage Grotesque, Roboto, JetBrains Mono, Poppins) and the base resets (`body` background and colour, focus rings, the `[data-photo]` grayscale treatment, `[data-code]` ligatures). Without it every component renders unstyled.
- **Dark is the default.** Tokens live on `:root` with `color-scheme: dark`. Light mode is a page-level switch: put `data-theme="light"` on the `<html>` or `<body>` element and the whole page inverts. It cannot be applied to a subtree (the selector is `:root:has([data-theme="light"])`), so never theme one card differently from the page.
- Set page and section backgrounds with `var(--bg)`; never hard-code `#000`, `#fff` or any hue.

## Tokens (the whole styling vocabulary)

- **Colour** (monochrome by rule, one signal): `--bg`, `--raised`, `--sunken`, `--rule`, `--faint`, `--muted`, `--ink-soft`, `--ink`, `--ink-hover`, `--on-ink`, `--signal`. Semantic aliases: `--surface-page`, `--surface-hover`, `--surface-disabled`, `--border-hairline`, `--border-strong`, `--text-heading`, `--text-body`, `--text-secondary`, `--text-meta`, `--text-error`. `--signal` is for field errors only.
- **Type**: families `--font-display` (Bricolage Grotesque, names things: 800 display, 700 headings), `--font-body` (Roboto, body and UI), `--font-mono` (JetBrains Mono, anything countable: dates, counts, labels, code), `--font-title` (Poppins 600, the AI agent's name label only). Weights `--weight-body` 400, `--weight-medium` 500, `--weight-title` 600, `--weight-heading` 700, `--weight-display` 800, `--weight-code` 600. Steps: `--size-display`, `--size-display-2`, `--size-display-3`, `--size-page-title`, `--size-heading` 24px, `--size-h3` 21px, `--size-entry-title` 20px, `--size-button` 14px, `--size-lead`, `--size-body` 15px, `--size-small` 13px, `--size-meta` 11px, `--size-micro` 10px, `--size-code`, `--size-section-head` 10px, each with a matching `--lh-*` and, where tracked, `--ls-*`. Measures: `--measure-body` 64ch, `--measure-lead` 44ch, `--measure-display` 15ch.
- **Space** (base 4): `--space-1` 4px, `--space-2` 8px, `--space-3` 12px, `--space-4` 16px, `--space-6` 24px, `--space-8` 32px, `--space-12` 48px, `--space-18` 72px. Named uses: `--pad-row`, `--pad-row-inline`, `--gap-gutter`, `--gap-head-content`, `--gap-section`, `--pad-rail`, `--rail-width` 268px.
- **Shape**: `--radius-control` 4px (buttons, inputs), `--radius-card` 12px (code card only), `--radius-chip` 7px, `--radius-round` 50% (avatars), `--hairline` 1px. No other radius, no shadows except `--code-shadow` on the code card.
- **Motion**: `--dur-pointer` 120ms and `--ease` linear for hover; `--dur-photo` 300ms for photographs. Nothing scales, lifts or moves on hover.

## Hard rules

1. No em dashes in any copy. Use a comma, a period, a colon, or "and".
2. No serif fonts, no fonts outside the four families. Poppins is for the AI agent's name label only.
3. Code is always `CodeSnap` with `Syn` runs: JetBrains Mono 600, Dracula colours, dark card with window chrome. It never adopts the page theme.
4. No gradients, patterns, transparency or blur. Depth is one background step (`--raised`), never a shadow.
5. No icon set. Use inline Unicode at the type's size: `↗` on external links, `↓` on in-page jumps, `·` between mono metadata.
6. Sentence case everywhere. Uppercase only inside `SectionHead`, `Tag` and mono labels, which do it themselves.
7. Photographs: `Avatar` for portraits (grayscale until hover), `Figure` for evidence (full colour, framed, captioned), `MoodImage` for atmosphere (grayscale, unframed, one per page). Never crop a portrait to 16:9.

## Where the truth lives

Read `_ds_bundle.css` for every token value and the base rules, `guidelines/readme.md` for the full system rationale (voice, imagery tiers, layout), and `components/<group>/<Name>/<Name>.prompt.md` for how each component is meant to be composed.

## Idiomatic page fragment

```jsx
const { SectionHead, EntryRow, Button } = window.Acta;

<main style={{ background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--font-body)', padding: 'var(--space-8)' }}>
  <SectionHead label="Selected work" meta="Four of eleven" />
  <div style={{ borderTop: 'var(--hairline) solid var(--rule)' }}>
    <EntryRow date="2025" kicker="ADVETI" title="Student Management Platform"
      summary="Training tracking and reporting for Emirates Skills competitors. Next.js and MariaDB." />
    <EntryRow date="03·26" duration="8 min" title="Clean architecture in a government codebase"
      summary="What survives contact with a ten-year-old Oracle schema." />
  </div>
  <div style={{ marginTop: 'var(--space-6)' }}>
    <Button variant="ghost" href="#work">All work ↓</Button>
  </div>
</main>
```
