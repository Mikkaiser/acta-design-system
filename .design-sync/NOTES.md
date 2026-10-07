# design-sync notes: Acta

Repo-specific facts a re-sync needs. Config lives in `config.json`; this file holds what config can't express.

## Repo shape

- This folder is an export of a Claude Design project, not a conventional package: loose `components/<group>/<Name>.{jsx,d.ts,prompt.md}`, `tokens/*.css`, `styles.css` (import-only), `guidelines/*.html` foundation cards. No build, no Storybook, no lockfile.
- The first sync (2026-09-14) added the entry files the converter needs, and they are part of the repo now: `package.json` (name `acta-design-system`, `module` -> `components/index.jsx`, `types` -> `components/index.d.ts`, dev deps react/react-dom/@types/react), `components/index.jsx` (barrel that also `import '../styles.css'`), `components/index.d.ts` (barrel re-exporting the hand-written `.d.ts` files). A new component means adding a line to both barrels.
- Install: `npm install` at the repo root (creates `node_modules/` with react + @types/react; `--node-modules ./node_modules`). Converter deps live in `.ds-sync/` (`npm i esbuild ts-morph @types/react playwright@1.63.0` there).
- `styles.css` at the root is `@import`-only, which the converter treats as a placeholder stub. It is NOT set as `cssEntry`; instead the barrel imports it and esbuild flattens tokens + base + the Google Fonts `@import url()` into `_ds_bundle.css`. That single file is the whole styles closure. Do not set `cssEntry` or `tokensPkg`.
- `Syn` and `MoodImage` are exported from `CodeSnap.jsx` and `Figure.jsx` respectively; `componentSrcMap` pins them so they group under `content` instead of `general`.
- The repo's per-component docs use a `.prompt.md` suffix that discovery can't match, hence the full `docsMap` enumeration. Add an entry for any new component.
- `guidelinesGlob: ["readme.md"]` ships the full system readme to `guidelines/readme.md`.

## Guideline cards are copied by hand

The 15 `guidelines/*.html` foundation cards (`@dsCard` headers, link `../styles.css`) are not something the converter emits. After EVERY build or driver run, before uploading: `cp guidelines/*.html ds-bundle/guidelines/`. A rebuild wipes them. If they stop being wanted, remove them remotely (they're inside the plan's `guidelines/**` delete glob).

## Previews

- `.design-sync/previews/ground.ts` wraps every cell in a `var(--bg)` block because the card page paints a white body and Acta is dark by default. Keep using `<Ground>` in any new preview.
- Light theme is page-level (`:root:has([data-theme="light"])`). A single light cell flips the whole card page, so previews carry NO light-theme cells. Don't add them back.
- `.design-sync/previews/assets/*.jpg` are 640px copies of `assets/*.jpg` (the originals are 2-7 MB). They were downsampled with headless Chromium (`canvas.toDataURL`) because no image tool is installed. Re-run that if the source photos change.
- All four photos are portraits of the owner (including `desert-dusk.jpg`). Never crop them to 16:9 in a preview; the system forbids it.
- `EntryRow` and `CodeSnap` use `cardMode: column` (wide, row-shaped).

## Known render warns

None. Validate is fully clean; the only info line is `[FONT_REMOTE]` (fonts come from Google Fonts at runtime, by design).

## Playwright

Cached Chromium build 1243 pins `playwright@1.63.0`. Verify with `node_modules/playwright-core/browsers.json` before changing versions.

## Not synced

- `assets/` and `images/` (the full-size photos) are not part of the upload plan, so designs built in Claude Design cannot reference `assets/burj-view.jpg` even though `Avatar.prompt.md` shows that path. Either add the photos to the project by hand or accept that the design agent supplies its own images.
- `foundations.dc.html`, `index.html`, `support.js`, `image-slot.js`, the group-level `*.card.html` files, and `SKILL.md` are Claude Design page/starter files, not library source; the converter ignores them.

## Re-sync risks

- The hand-copied guideline cards: forgetting the `cp` step after the driver run uploads a `guidelines/` with only `index.md` and `readme.md`, and the reconciliation deletes would then remove the 15 cards from the project.
- `docsMap` and the two barrels are enumerations; a component added to `components/` without updating them ships without its doc (docsMap) or not at all (barrels).
- Fonts are network-fetched from Google Fonts at render time; an offline render shows fallbacks.
- Verified against Node 24 / esbuild 0.28 / ts-morph current / playwright 1.63.
