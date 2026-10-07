# Ledger Design System

The design system behind the personal portfolio and integrated blog of **Mikael Ribeiro Simoes** (mikkaiser), Senior Software Developer at Abu Dhabi Government / ADVETI. Brazilian, based in Abu Dhabi. WorldSkills experience. Blog at [techknowledge.blog](https://techknowledge.blog).

Internally the system is called **Ledger**, after its organising idea: every piece of content is a row in a dated register, and a sticky rail carries the name, the map and the contact.

## Sources

Extracted from `Mikael Ribeiro - Design System.dc.html` in this project, which is the living foundations page and the source of truth for every value here. Owner-supplied material: a LinkedIn profile export (`uploads/linkedin.pdf`), a written bio (`uploads/summary.txt`), and personal photography (`uploads/*.jpg`). No prior design system, brand guidelines, Figma file or codebase was provided, so the system was authored from scratch against the owner's stated preferences.

There is **no logo or wordmark**. None was provided and none was invented. Wherever a mark would go, the name sets in plain Bricolage Grotesque 700. A circular photographic avatar stands in at small sizes.

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point, `@import` lines only |
| `tokens/colors.css` | Monochrome scale, dark and light |
| `tokens/typography.css` | Four families in the mikkaiser.com hierarchy |
| `tokens/spacing.css` | Base-4 scale, radii, layout constants |
| `tokens/code.css` | Dracula syntax + code card chrome |
| `tokens/motion.css` | Scroll-driven keyframes, reduced-motion stop |
| `tokens/base.css` | Resets, focus, photo and code treatments |
| `components/core/` | Button, Tag, SectionHead |
| `components/forms/` | Field, Textarea |
| `components/content/` | CodeSnap, EntryRow, Figure, Avatar |
| `components/navigation/` | TocList |
| `guidelines/` | Foundation specimen cards |
| `assets/` | Photography |
| `Mikael Ribeiro - Design System.dc.html` | The full foundations page, 13 sections |

## Content fundamentals

**Voice.** First person, past tense, specific. The owner writes as a practitioner describing work that shipped, not as a consultant describing capability. Claims carry numbers when numbers exist.

**Person.** "I" for the owner. "You" only in instructional writing, never in marketing address. Never "we" for a single person.

**Casing.** Sentence case for every title and heading. Uppercase is reserved for two things: section eyebrows at 10px with 0.18em tracking, and mono specification labels. Never uppercase a sentence.

**Length.** Section intros run two or three sentences. Row summaries are one sentence, occasionally two. Rules in a numbered list are one sentence each.

**Emoji.** Never. Not in copy, not in headings, not in commit-style asides.

**Em dashes.** Never, under any condition. Use a comma, a period, a colon, or "and". En dashes are fine in numeric ranges (`10–11px`).

**Titles.** Plain and declarative. "Clean architecture in a government codebase", not "Why clean architecture changed everything". No colon-subtitle constructions, no rhetorical questions, no "X, not Y" antithesis.

Examples of the register, verbatim from the system:

- "Training tracking, performance monitoring and reporting for Emirates Skills and WorldSkills competitors. Next.js and MariaDB."
- "Roughly 15 microservices over RabbitMQ, Docker and Kubernetes, with Grafana, Loki and Prometheus for observability."
- "What survives contact with a ten-year-old Oracle schema, and what you quietly give up."
- "One idea per diagram. If it needs a legend, it needs splitting."

## Visual foundations

**Colour.** Strictly monochrome. Ten neutral tokens and one signal. No hue carries meaning anywhere in the interface, so hierarchy comes from weight, size and a single background step. `--signal` exists only for field errors. Because nothing depends on hue, no state in the system relies on colour perception alone: every state also changes weight, fill or border.

Dark is the default and the backgrounds are very dark, Cursor-like, with small contrast steps between surfaces (`#0A0A0A` page, `#171717` raised, `#1F1F1F` sunken). Light inverts the same structure. Every text pair clears WCAG AA in both themes; `--faint` at 10–11px is the floor of the scale at 6.1:1 dark and 4.7:1 light.

**Type.** No serifed fonts, ever. The hierarchy is the one on mikkaiser.com. Bricolage Grotesque names things: 800 at `-0.04em` for display (hero up to 62px, closing statements up to 48px, page titles, the footer brand), 700 at `-0.025em` for headings (24px dialogs, 21px cards, 20px rows, 16px for the owner's name). It is variable with an optical-size axis, so leave `font-optical-sizing` on `auto`. Roboto carries body, UI and section heads, with buttons at Medium 500, 14px. Poppins 600 survives only as the name label of the site's AI agent, never for headings. JetBrains Mono at 600 with `calt` and `liga` enabled sets every code snippet, and at 400 it carries anything countable: dates, durations, counts, version numbers, specification labels. Mono numerals are always `tabular-nums`.

**Backgrounds.** Flat colour only. No gradients, no patterns, no textures, no full-bleed imagery behind text. Depth is exactly one background step, never a shadow.

**Borders and shadows.** Two rule weights and nothing else: 1px `--ink` under a section head, 1px `--rule` between rows in a set. No shadows anywhere in the interface. The single exception is the code card, which carries `0 14px 40px rgba(0,0,0,0.32)` because it is deliberately a foreign object sitting on the page.

**Radii.** 0 for structural blocks, 4px for controls and inputs, 7px for the code card's filename chip, 12px for the code card itself, 50% for photographic avatars. Nothing else is rounded.

**Cards.** There is no generic card. Content sits in rows divided by hairlines, or in grid cells divided by hairlines. The only true card in the system is the code snap.

**Layout.** A 268px sticky rail that never scrolls away, holding the name, the site map, the theme switch and the contact. Content is a single fluid column beside it. The rail goes static below 620px. An article's table of contents sits beside the text from 1180px and above it below that.

**Hover.** One background step (`--raised`) on rows, or a border colour change on controls, over 120ms linear. Nothing scales. Nothing lifts. Nothing changes size on hover, ever.

**Press.** Primary fills return to `--ink` from `--ink-hover`. Secondary gains a `--raised` fill. No transforms.

**Focus.** One treatment everywhere: `2px solid var(--ink)` at `2px` offset, plus an ink border on inputs. The browser default is always overridden.

**Transparency and blur.** Neither. No alpha-muted text, no frosted panels, no backdrop filters. Muted text is a solid token, so it inverts correctly on a hovered row.

**Motion.** All motion is scroll-driven and reversible, native CSS, no JavaScript. Three primitives plus smooth scroll: a section reveal on `view()` (opacity plus 16px of translate), a read-progress bar on `scroll(root)`, and a rule draw on `view()`. Smooth scrolling is `scroll-behavior: smooth` on `:root`, deliberately not a JS momentum library, because a library that transforms a wrapper breaks `scroll()` and `view()` timelines. Everything stops under `prefers-reduced-motion`, including smooth scroll.

**Imagery.** Photography is the one place this system meets colour, so treatment depends on the job the image is doing. Three tiers:

1. **Chrome** — portraits, avatars, thumbnails. `grayscale(1) contrast(1.04)`, returning to full colour on hover over 300ms.
2. **Evidence** — photography that proves something. Full colour, inside a 1px frame with 7px inset, caption required.
3. **Mood** — atmosphere. Grayscale, unframed, uncaptioned, at most one per page.

Personal photographs live on About and Now, never inside a case study.

**Crop.** Source frames are portrait off a phone. Figures use the 3:4 frame as shot with no crop. A circular portrait cannot be reached with `object-fit` when the subject sits off to one side, so the image is scaled inside the circle (248%) and offset until the face lands on the centre. A portrait photograph is never cropped to a 16:9 banner. Landscape is reserved for screenshots and diagrams, which are landscape by nature.

**Diagrams.** Animated canvas diagrams for the posts where a paragraph cannot carry the idea. One canvas, the page palette read off the root at paint time, no colour except the signal for failure. 16:7, 200 to 320px tall, looping, drawing only while on screen, holding a single static frame under reduced motion. One idea per diagram; if it needs a legend, it needs splitting.

## Iconography

The system uses **no icon set**. No icon font, no SVG sprite, no CDN library, and none was provided in the source material. This is deliberate rather than a gap: navigation and metadata are carried by type and by the mono label style, which suits a dense, text-led register.

Where a glyph is genuinely needed, the system uses a **Unicode character inline with the type**, at the type's own size and colour:

- `↗` on external links, trailing the label
- `↓` on an in-page jump to more of the same set
- `·` as the separator inside mono metadata runs

The only non-typographic marks in the system are the code card's three traffic lights (12px circles in `--code-light-close`, `--code-light-min`, `--code-light-max`), which are decoration and carry no interaction, and a 6px `--ink` dot on the availability badge.

If an icon set becomes necessary, substitute Lucide at 1.5px stroke to match the hairline weight, and document it here.

## Intentional additions

Nothing in `components/` was invented. Every primitive corresponds to a documented section of the foundations page: Button to §04, Tag to §05, Field and Textarea to §06, EntryRow to §07, Avatar and Figure to §08, CodeSnap to §09, TocList to §10, SectionHead to the head pattern used by all thirteen sections.

## Known gaps

- No UI kit yet. The foundations page documents the parts, but the actual portfolio screens (home, work index, blog index, blog post, about, now) have not been built.
- No logo or wordmark.
- Fonts load from Google Fonts rather than self-hosted binaries. Supply `.woff2` files to make the system offline-capable.
- One video (`uploads/20240518_001615.mp4`) is unplaced; the system has no documented video treatment.
