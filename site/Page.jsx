import React from 'react';
import {
  Avatar, Button, CodeSnap, EntryRow, Field, Figure, MoodImage, SectionHead, Syn, Tag, TocList,
} from '../components/index.jsx';
import { SITE, REPO, OWNER } from './meta.js';
import { LoadBalancer } from './LoadBalancer.jsx';

const NAV = [
  { group: 'Foundations', items: [['colour', 'Colour'], ['type', 'Typography'], ['space', 'Space & rules']] },
  { group: 'Components', items: [['buttons', 'Buttons'], ['links', 'Links & tags'], ['fields', 'Form fields'], ['rows', 'Entry rows'], ['media', 'Media'], ['code', 'Code']] },
  { group: 'Patterns', items: [['article', 'Article'], ['motion', 'Motion'], ['diagrams', 'Diagrams'], ['audit', 'Contrast audit']] },
];
const NUMBER = Object.fromEntries(NAV.flatMap((g) => g.items).map(([id, label], i) => [id, { n: String(i + 1).padStart(2, '0'), label }]));
const PORTRAIT = 'assets/burj-view.jpg';

function Section({ id, meta, children }) {
  const { n, label } = NUMBER[id];
  return (
    <section id={id} className="sect" aria-labelledby={`${id}-h`} data-reveal="data-reveal">
      <SectionHead id={`${id}-h`} label={`${n} · ${label}`} meta={meta} />
      {children}
    </section>
  );
}

function Numbered({ items, large }) {
  return (
    <ol className={large ? 'numbered numbered--lg' : 'numbered'}>
      {items.map((text, i) => <li key={i}><span>{String(i + 1).padStart(2, '0')}</span>{text}</li>)}
    </ol>
  );
}

const Spec = ({ lines }) => <div className="spec">{lines.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)}</div>;

function ThemeSwitch() {
  const [theme, setTheme] = React.useState('dark');
  React.useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  }, []);
  const choose = (next) => {
    if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('acta-theme', next); } catch (e) {}
    setTheme(next);
  };
  return (
    <div className="seg" role="group" aria-label="Colour theme">
      <button type="button" aria-pressed={theme === 'dark'} onClick={() => choose('dark')}>Dark</button>
      <button type="button" aria-pressed={theme === 'light'} onClick={() => choose('light')}>Light</button>
    </div>
  );
}

function Rail() {
  return (
    <aside className="rail" data-rail="data-rail" aria-label="Site">
      <a className="owner" href={OWNER.url} rel="author">
        <Avatar src={PORTRAIT} alt="" size={56} />
        <span>
          <span className="owner__name">Mikael Ribeiro</span>
          <span className="owner__handle">@mikkaiser</span>
        </span>
      </a>
      <p className="rail__intro">The design system behind mikkaiser.com, its portfolio and its blog. Software engineer and tech educator, Abu Dhabi.</p>
      <div className="rail__rule" data-rule="data-rule" />
      <nav className="rail__nav" aria-label="Sections">
        {NAV.map((g) => (
          <React.Fragment key={g.group}>
            <div className="rail__group">{g.group}</div>
            {g.items.map(([id, label]) => (
              <a key={id} className="rail__link" href={`#${id}`}><span>{label}</span><span>{NUMBER[id].n}</span></a>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="rail__out">
        <a href={OWNER.url} rel="author">mikkaiser.com ↗</a>
        <a href={REPO.url}>GitHub ↗</a>
        <a href="https://www.linkedin.com/in/mikael-ribeiro/" rel="me">LinkedIn ↗</a>
        <a href="https://techknowledge.blog" rel="me">techknowledge.blog ↗</a>
      </div>
      <ThemeSwitch />
      <div className="rail__version">v1.0 · Abu Dhabi UTC+4</div>
    </aside>
  );
}

const COLOURS = [
  ['bg', 'Ground', '#0A0A0A', '#FFFFFF', 'Page background'],
  ['raised', 'Ground raised', '#171717', '#FAFAFA', 'Row hover, table heads'],
  ['sunken', 'Ground sunken', '#1F1F1F', '#F5F5F5', 'Disabled fills'],
  ['rule', 'Rule', '#2E2E2E', '#EBEBEB', 'All 1px dividers, borders'],
  ['faint', 'Faint', '#8F8F8F', '#737373', 'Mono meta at 10–11px'],
  ['muted', 'Muted', '#A1A1A1', '#525252', 'Secondary copy, rail links'],
  ['ink-soft', 'Ink soft', '#D4D4D4', '#404040', 'Body copy'],
  ['ink', 'Ink', '#FFFFFF', '#000000', 'Titles, primary fill, focus'],
  ['ink-hover', 'Ink hover', '#E5E5E5', '#333333', 'Primary button hover only'],
  ['signal', 'Signal', '#FF6166', '#CC0000', 'Field errors only. Nothing else is coloured.'],
];

const display = (size, weight, lh, ls) => ({ fontFamily: 'var(--font-display)', fontWeight: weight, fontSize: size, lineHeight: lh, letterSpacing: ls });
const TYPE = [
  [<div style={display('var(--size-display)', 'var(--weight-display)', 'var(--lh-display)', 'var(--ls-display)')}>Display</div>, ['BRICOLAGE GROTESQUE 800', 'clamp(36px, 5.6vw, 62px)', 'LH 1 · LS −0.04em', 'max 15ch']],
  [<div style={display('var(--size-page-title)', 'var(--weight-display)', 'var(--lh-page-title)', 'var(--ls-page-title)')}>Page title</div>, ['BRICOLAGE GROTESQUE 800', 'clamp(24px, 3.4vw, 38px)', 'LH 1.08 · LS −0.04em']],
  [<div style={display('var(--size-heading)', 'var(--weight-heading)', 'var(--lh-heading)', 'var(--ls-heading)')}>Heading</div>, ['BRICOLAGE GROTESQUE 700', '24px in articles · 21px on cards', 'LH 1.15 · LS −0.025em']],
  [<div style={display('var(--size-entry-title)', 'var(--weight-heading)', 'var(--lh-entry-title)', 'var(--ls-entry-title)')}>Entry title</div>, ['BRICOLAGE GROTESQUE 700', '20px · the owner’s name 16px', 'LH 1.2 · LS −0.025em']],
  [<div style={{ fontSize: 'var(--size-section-head)', letterSpacing: 'var(--ls-section-head)', textTransform: 'uppercase', fontWeight: 'var(--weight-title)' }}>Section head</div>, ['ROBOTO 600', '10px · LS 0.18em · upper', 'sits on a 1px ink rule']],
  [<div style={{ fontSize: 'var(--size-lead)', lineHeight: 'var(--lh-lead)', letterSpacing: 'var(--ls-lead)' }}>Lead paragraph sets in Roboto at twenty over 1.5.</div>, ['ROBOTO 400', '20px / 1.5 · LS −0.01em', 'max 44ch · one per page']],
  [<div style={{ fontSize: 'var(--size-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-soft)' }}>Body copy sets in Roboto at fifteen over 1.7, capped near sixty-four characters so the measure stays readable next to a wide rail.</div>, ['ROBOTO 400', '15px / 1.7 · Ink soft', 'max 64ch']],
  [<div style={{ fontSize: 'var(--size-small)', lineHeight: 'var(--lh-small)', color: 'var(--muted)' }}>Small copy for captions, rail text and row summaries.</div>, ['ROBOTO 400', '13px / 1.6 · Muted', 'buttons at 500, 14px']],
  [<div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--size-meta)', color: 'var(--faint)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>2023 to 2026 &nbsp; 03·26 &nbsp; 8 min &nbsp; v1.0</div>, ['JETBRAINS MONO 400', '11px · Faint', 'tabular-nums · dates,', 'counts, versions, labels']],
  [<div data-code="data-code" style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-code)', fontSize: 'var(--size-code)', lineHeight: 'var(--lh-code)' }}>{'t => t.Id != id && x <= y'}</div>, ['JETBRAINS MONO 600', '13px / 1.75 · calt + liga', 'every snippet. Ligatures on,', 'so => != <= render as one mark.']],
  [<div style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--weight-title)', fontSize: 14 }}>Mikkaiser agent</div>, ['POPPINS 600', '14px', 'the name label of the', 'site’s AI agent, nothing else']],
];

const SPACE = [[4, 'icon to label'], [8, 'inside a tag'], [12, 'title to summary'], [16, 'row padding (14 inline)'], [24, 'gutter'], [32, 'head to content'], [48, 'rail padding'], [72, 'section break']];

// The button state matrix, drawn from the values in components/core/Button.jsx.
const BTN = { display: 'inline-block', fontSize: 'var(--size-button)', fontWeight: 'var(--weight-medium)', lineHeight: 1, borderRadius: 'var(--radius-control)', whiteSpace: 'nowrap' };
const BTN_VARIANT = {
  primary: { ...BTN, background: 'var(--ink)', color: 'var(--on-ink)', padding: '13px 20px' },
  secondary: { ...BTN, border: 'var(--hairline) solid var(--rule)', color: 'var(--ink)', padding: '12px 19px' },
  ghost: { ...BTN, borderRadius: 0, color: 'var(--ink)', borderBottom: 'var(--hairline) solid var(--rule)', padding: '0 0 2px' },
};
const BTN_STATE = {
  hover: { primary: { background: 'var(--ink-hover)' }, secondary: { borderColor: 'var(--ink)' }, ghost: { borderBottomColor: 'var(--ink)' } },
  active: { primary: {}, secondary: { borderColor: 'var(--ink)', background: 'var(--raised)' }, ghost: { color: 'var(--muted)', borderBottomColor: 'var(--muted)' } },
  focus: { primary: { outline: '2px solid var(--ink)', outlineOffset: 2 }, secondary: { outline: '2px solid var(--ink)', outlineOffset: 2 }, ghost: { outline: '2px solid var(--ink)', outlineOffset: 2 } },
  disabled: { primary: { background: 'var(--sunken)', color: 'var(--muted)' }, secondary: { color: 'var(--faint)' }, ghost: { color: 'var(--faint)', borderBottomColor: 'transparent' } },
};
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
const VARIANTS = ['primary', 'secondary', 'ghost'];

const SYNTAX = [['keyword', '#FF79C6', 'Keyword, operator'], ['type', '#8BE9FD', 'Type, class'], ['function', '#50FA7B', 'Function, method'], ['param', '#FFB86C', 'Parameter, italic'], ['literal', '#BD93F9', 'Number, string'], ['comment', '#6272A4', 'Comment'], ['fg', '#F8F8F2', 'Plain text']];

const MOTION = [
  ['Section reveal', ['opacity 0 → 1', 'translateY 16px → 0', 'timeline: view()', 'range: entry 0% cover 26%']],
  ['Read progress', ['scaleX 0 → 1', 'timeline: scroll(root)', '2px, ink, fixed top', 'the only fixed element']],
  ['Rule draw', ['scaleX 0 → 1', 'transform-origin 0 50%', 'range: entry 0% cover 18%', 'dividers only']],
  ['Smooth scroll', ['scroll-behavior: smooth', 'on :root, body and both rails', 'native, so scroll() timelines', 'stay in sync · auto on reduce']],
  ['Pointer response', ['120ms linear', 'background or border only', 'nothing scales', 'nothing lifts']],
];

const AUDIT = [
  ['ink on ground', '19.8 / 21.0', 'Titles, all sizes'],
  ['ink-soft on ground', '13.8 / 10.4', 'Body, 15px'],
  ['muted on ground', '7.8 / 7.4', 'Small copy, 12–13px'],
  ['faint on ground', '6.1 / 4.7', 'Mono meta, 10–11px. Floor of the scale in both themes.'],
  ['faint on raised', '5.6 / 4.5', 'Meta inside a hovered row'],
  ['on-ink on ink', '19.8 / 21.0', 'Primary button, selected tag'],
  ['on-ink on ink-hover', '15.7 / 12.6', 'Primary button hover'],
  ['muted on sunken', '6.5 / 7.0', 'Disabled button and field text'],
  ['signal on ground', '6.7 / 5.9', 'Error border and message, 11px'],
];

const ARTICLE_TOC = [
  { id: 'a-contract', label: 'The schema is the contract' },
  { id: 'a-boundary', label: 'Where the boundary lands' },
  { id: 'a-buys', label: 'What it buys you' },
  { id: 'a-after', label: 'Two years on' },
];

/** The heading whose top has passed a line 120px below the viewport top. */
function useActiveHeading(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    // offsetTop ignores the reveal transform, unlike getBoundingClientRect.
    const absTop = (n) => { let y = 0; while (n) { y += n.offsetTop; n = n.offsetParent; } return y; };
    const onScroll = () => {
      const line = window.scrollY + 120;
      let next = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && absTop(el) <= line) next = id;
      }
      setActive(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

function Article() {
  const S = Syn;
  const active = useActiveHeading(ARTICLE_TOC.map((t) => t.id));
  return (
    <article className="art">
      <header className="art__head">
        <div className="art__meta">14 March 2026 · 8 min · Architecture</div>
        <h3>Clean architecture in a government codebase</h3>
        <p className="art__lead">What survives contact with a ten-year-old Oracle schema, and what you quietly give up.</p>
      </header>

      <div className="art__toc" data-toclist="data-toclist">
        <TocList items={ARTICLE_TOC} activeId={active} />
        <div className="art__note"><Spec lines={['4 SECTIONS · 8 MIN', 'ACTIVE MARK FOLLOWS SCROLL', 'BESIDE THE ARTICLE FROM 1180px,', 'UNDER THE LEAD BELOW THAT']} /></div>
      </div>

      <div className="art__body">
        <h4 id="a-contract">The schema is the contract</h4>
        <p>Every layered-architecture diagram assumes you own the data model. In a system that has been running since before you arrived, you do not. The schema is the contract, and the domain has to be reconstructed around it rather than derived from it.</p>
        <p>The pragmatic version keeps the boundary at the repository and lets <code className="icode" data-code="data-code">Entity Framework</code> map to views instead of tables. Reads go through projections, writes go through stored procedures that already encode two years of business rules nobody documented.</p>

        <h4 id="a-boundary">Where the boundary lands</h4>
        <CodeSnap tabs={['TraineeRepository.cs', 'ITraineeRepository.cs']} style={{ marginBottom: 18 }}>
          <S kind="keyword">public sealed class</S>{' '}<S kind="type">TraineeRepository</S>{' : '}<S kind="type">ITraineeRepository</S>{'\n{\n    '}
          <S kind="keyword">private readonly</S>{' '}<S kind="type">AdvetiContext</S>{' _db;\n\n    '}
          <S kind="keyword">public</S>{' '}<S kind="type">Task</S>{'<'}<S kind="type">Trainee</S>{'?> '}<S kind="fn">FindAsync</S>{'('}<S kind="type">TraineeId</S>{' '}<S kind="param" italic>id</S>{', '}<S kind="type">CancellationToken</S>{' '}<S kind="param" italic>ct</S>{') '}<S kind="keyword">{'=>'}</S>{'\n        _db.TraineeView\n           .'}
          <S kind="fn">Where</S>{'('}<S kind="param" italic>t</S>{' '}<S kind="keyword">{'=>'}</S>{' '}<S kind="param" italic>t</S>{'.Id '}<S kind="keyword">==</S>{' '}<S kind="param" italic>id</S>{'.Value)\n           .'}
          <S kind="fn">Select</S>{'('}<S kind="type">TraineeMapping</S>{'.ToDomain)\n           .'}
          <S kind="fn">SingleOrDefaultAsync</S>{'('}<S kind="param" italic>ct</S>{');\n}'}
        </CodeSnap>

        <h4 id="a-buys">What it buys you</h4>
        <ul>
          <li>The domain type never sees an Oracle column name.</li>
          <li>The view absorbs schema drift; the mapping is the only thing that changes.</li>
          <li>Integration tests run against a real Oracle container, not an in-memory fake.</li>
        </ul>
        <blockquote><p>You are not refactoring towards a diagram. You are buying the ability to change one thing without reading everything.</p></blockquote>
        <figure>
          <div className="slot">Diagram · 16:9</div>
          <figcaption className="caption">The read path after the change. Writes still land in the procedures on the right.</figcaption>
        </figure>

        <h4 id="a-after">Two years on</h4>
        <p style={{ marginBottom: 28 }}>Two years in, the boundary has held. The parts that broke were the ones where we let a controller reach past it because a deadline made the shortcut look cheap.</p>

        <div className="art__end">
          <Button variant="primary" href="#article">Read next</Button>
          <Button variant="secondary" href="#rows">All posts</Button>
        </div>
      </div>
    </article>
  );
}

export function Page() {
  const S = Syn;
  return (
    <div className="shell">
      <div className="progress" data-progress="data-progress" aria-hidden="true" />
      <Rail />
      <main id="main" className="content">
        <section className="hero" aria-label="Overview" data-reveal="data-reveal">
          <div className="eyebrow">Acta · Design system</div>
          <h1>The parts this site is built from.</h1>
          <p>Every token, type step and component state used across <a href={OWNER.url} rel="author">mikkaiser.com</a> and its blog. Bricolage Grotesque for names and titles, Roboto for everything you scan, JetBrains Mono for anything countable. Monochrome throughout: no hue carries meaning, so hierarchy comes from weight, size and a single background step. Dark is the default; every token has a light counterpart and the rail switches between them.</p>
          <p>Acta is Latin for “things done”: Rome posted the <em>acta diurna</em>, a daily record of what had actually happened. Eleven React components carry it, styled entirely with CSS custom properties. The source is on <a href={REPO.url}>GitHub ↗</a>.</p>
        </section>

        <Section id="colour" meta="10 tokens · 2 themes">
          <div className="cells">
            {COLOURS.map(([token, name, dark, light, use]) => (
              <div key={token}>
                <div className="swatch" style={{ background: `var(--${token})` }} />
                <div className="cell__name">{name}</div>
                <div className="cell__hex">{dark} / {light}</div>
                <div className="cell__use">{use}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="type" meta="Bricolage · Roboto · JetBrains Mono · Poppins">
          <div className="scale">
            {TYPE.map(([sample, spec], i) => (
              <div key={i} className="scale__row">{sample}<Spec lines={spec} /></div>
            ))}
          </div>
        </Section>

        <Section id="space" meta="Base 4 · 8 steps">
          <div className="cols" style={{ '--col': '260px' }}>
            <div>
              <div className="label">Scale</div>
              <div className="bars">
                {SPACE.map(([px, use]) => <div key={px}><i style={{ width: px }} /><span className="spec">{px} · {use}</span></div>)}
              </div>
            </div>
            <div>
              <div className="label">Rule weights</div>
              <div className="weight" style={{ background: 'var(--ink)' }} />
              <div className="spec">1px Ink, under a section head</div>
              <div className="weight" style={{ background: 'var(--rule)' }} />
              <div className="spec">1px Rule, between rows in a set</div>
              <div className="label">Radius</div>
              <div className="radii">
                <i /><i style={{ borderRadius: 'var(--radius-control)' }} /><i style={{ borderRadius: 'var(--radius-chip)' }} /><i style={{ borderRadius: 'var(--radius-card)' }} /><i style={{ width: 34, borderRadius: 'var(--radius-round)' }} />
              </div>
              <Spec lines={['0 · 4 controls · 7 tab chip', '12 code card · 50% portraits']} />
            </div>
            <div>
              <div className="label">Rules of the page</div>
              <Numbered large items={[
                'The rail never scrolls away. It carries the name, the map and the contact.',
                'Every entry is a row with a mono date gutter. Work and posts share the row.',
                'Bricolage Grotesque for names and titles. Roboto for what you scan. JetBrains Mono for what you count.',
                'No shadows. Boundaries are 1px rules, depth is one background step.',
                'Nothing is coloured except a field error. Emphasis is weight and size.',
              ]} />
            </div>
          </div>
        </Section>

        <Section id="buttons" meta="3 variants · 5 states">
          <p className="intro">Live specimens respond to the pointer. The matrix renders each state statically so it can be checked without hovering, and scrolls sideways when the pane is narrow. Roboto Medium at 14px; minimum target 44px tall on touch.</p>
          <div className="row" style={{ marginBottom: 26 }}>
            <Button variant="primary" href="#buttons">Primary</Button>
            <Button variant="secondary" href="#buttons">Secondary</Button>
            <Button variant="ghost" href="#buttons">Ghost</Button>
          </div>
          <div className="matrix">
            <div className="cells">
              {STATES.map((s) => <div key={s} className="matrix__head">{s}</div>)}
              {VARIANTS.map((v) => STATES.map((s) => (
                <div key={v + s}>
                  <span style={{ ...BTN_VARIANT[v], ...(BTN_STATE[s]?.[v] || null), cursor: s === 'disabled' ? 'not-allowed' : undefined }}>{v[0].toUpperCase() + v.slice(1)}</span>
                </div>
              )))}
            </div>
          </div>
        </Section>

        <Section id="links" meta="Hover to test">
          <div className="cols">
            <div>
              <div className="label">Links</div>
              <p style={{ margin: '0 0 14px', maxWidth: '48ch', fontSize: 'var(--size-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-soft)' }}>
                Body copy with an <a className="ilink" href="#links">inline link</a> sitting in it, and an <a className="ilink" href={OWNER.url}>external one ↗</a> that carries the arrow.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <a href={REPO.url} style={{ width: 'max-content', fontSize: 'var(--size-small)', color: 'var(--muted)' }}>Rail link ↗</a>
                <a className="mono-link" href="#rows">All posts</a>
              </div>
            </div>
            <div>
              <div className="label">Tags</div>
              <div className="row" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <Tag>.NET</Tag><Tag>Next.js</Tag><Tag>Oracle</Tag><Tag selected>Selected</Tag>
              </div>
              <div className="label" style={{ marginBottom: 'var(--space-3)' }}>Availability badge</div>
              <div className="badge">
                <div className="badge__state">Open to work</div>
                <div style={{ fontSize: 'var(--size-small)', lineHeight: 1.5 }}>Abu Dhabi · UTC+4 · remote</div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="fields" meta="6 states">
          <div className="fields">
            <Field id="f-default" label="Default" placeholder="you@company.com" helper="Helper text sits here." />
            <Field id="f-focus" label="Focus" value="mikael" readOnly helper="Ink border plus a 2px ring, offset 2px." data-force-focus="" />
            <Field id="f-filled" label="Filled" value="mikkaiser.ribeiro@gmail.com" readOnly helper="Value in full ink." />
            <Field id="f-error" label="Error" value="not-an-email" readOnly error="Enter a valid address." />
            <Field id="f-disabled" label="Disabled" value="locked" disabled helper="Sunken ground, muted ink." />
            <Field id="f-textarea" label="Textarea" multiline placeholder="What are you building?" />
          </div>
        </Section>

        <Section id="rows" meta="Work · posts">
          <div className="label" style={{ marginBottom: 10 }}>Work row</div>
          <div style={{ borderTop: 'var(--hairline) solid var(--rule)', marginBottom: 26 }}>
            <EntryRow date="2025" kicker="ADVETI" title="Student Management Platform" href={OWNER.url} summary="Training tracking, performance monitoring and reporting for Emirates Skills and WorldSkills competitors. Next.js and MariaDB." />
            <EntryRow date="2023" kicker="Radix · hover state" title="SotreqLink" href={OWNER.url} style={{ background: 'var(--raised)' }} summary="Roughly 15 microservices over RabbitMQ, Docker and Kubernetes, with Grafana, Loki and Prometheus for observability." />
          </div>
          <div className="label" style={{ marginBottom: 10 }}>Post row</div>
          <div style={{ borderTop: 'var(--hairline) solid var(--rule)' }}>
            <EntryRow date="03·26" duration="8 min" title="Clean architecture in a government codebase" href="#article" summary="What survives contact with a ten-year-old Oracle schema." />
            <EntryRow date="01·26" duration="6 min" title="Preparing for WorldSkills as an expert" href="#article" style={{ background: 'var(--raised)' }} summary="Hover state. Coaching the module you once competed in." />
          </div>
        </Section>

        <Section id="media" meta="Three tiers · portrait first">
          <p className="intro" style={{ marginBottom: 8 }}>Photographs are the one place this system meets colour, so the treatment depends on the job the image is doing. Interface photography converts to grayscale and returns to colour on hover. Photography that carries evidence stays in full colour inside a frame.</p>
          <p className="intro" style={{ marginBottom: 22 }}>Everything shot on a phone is portrait, so portrait is the default orientation. Landscape is reserved for screenshots and diagrams, which are landscape by nature. A portrait photograph is never cropped to a banner.</p>
          <div className="cols" style={{ '--col': '232px', gap: 'clamp(22px, 2.8vw, 36px)' }}>
            <div style={{ minWidth: 0 }}>
              <div className="label" style={{ marginBottom: 12 }}>Chrome · hover it</div>
              <div className="row" style={{ alignItems: 'flex-end', gap: 14 }}>
                <Avatar src={PORTRAIT} alt="Mikael Ribeiro" size={132} />
                <Avatar src={PORTRAIT} alt="" size={56} />
              </div>
              <div style={{ marginTop: 12 }}><Spec lines={['132px AND 56px · CIRCLE', 'GRAYSCALE(1) CONTRAST(1.04)', 'COLOUR ON HOVER, 300ms', 'INNER IMG AT 248%, ANCHORED', 'ON THE FACE NOT THE FRAME']} /></div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="label" style={{ marginBottom: 12 }}>Evidence · full colour</div>
              <Figure src="assets/worldskills-lyon-2024.jpg" alt="Mikael Ribeiro at WorldSkills Lyon 2024" position="50% 22%" caption="WorldSkills Lyon, September 2024. Evidence keeps its colour." />
              <div style={{ marginTop: 12 }}><Spec lines={['3:4 · 1px FRAME, 7px INSET', 'NO FILTER, NO RADIUS', 'CAPTION ALWAYS REQUIRED']} /></div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="label" style={{ marginBottom: 12 }}>Mood · section break</div>
              <MoodImage src={PORTRAIT} alt="Looking out over the Dubai skyline" />
              <div style={{ marginTop: 12 }}><Spec lines={['3:4 NATIVE · NO CROP', 'NO FRAME, NO CAPTION', 'GRAYSCALE UNTIL HOVERED', 'ONE PER PAGE AT MOST']} /></div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="label" style={{ marginBottom: 12 }}>Screenshots · landscape</div>
              <div className="slot">Screenshot · 16:9</div>
              <div style={{ marginTop: 12 }}><Spec lines={['16:9 · SQUARE CORNERS', 'FULL MEASURE WIDTH', 'UI AND DIAGRAMS ONLY', 'NEVER A CROPPED PORTRAIT']} /></div>
            </div>
          </div>
          <div className="cols split" style={{ '--col': '260px', gap: 'clamp(22px, 2.8vw, 36px)' }}>
            <div>
              <div className="label">Which tier</div>
              <Numbered items={[
                'Does the photograph prove something? Full colour, framed, captioned.',
                'Is it interface, a portrait or a thumbnail? Grayscale, colour on hover.',
                'Is it atmosphere? Grayscale, unframed, and only where a page needs air.',
                'Personal photographs live on About and Now. Never inside a case study.',
              ]} />
            </div>
            <div>
              <div className="label">Crop</div>
              <p style={{ margin: '0 0 12px', maxWidth: 'var(--measure-lead)', fontSize: 'var(--size-small)', lineHeight: 'var(--lh-small)', color: 'var(--ink-soft)' }}>Figures use the 3:4 frame as shot, with no crop at all. A circular portrait cannot be reached with object-fit when the subject sits off to one side, so the image is scaled inside the circle and offset until the face lands on the centre.</p>
              <Spec lines={['SOURCE 3000×4000 · 3:4', 'FIGURE 3:4 · NO CROP', 'CIRCLE 1:1 · INNER IMG 248%', 'NEVER 16:9 FROM A PORTRAIT']} />
            </div>
          </div>
        </Section>

        <Section id="code" meta="JetBrains Mono 600 · Dracula">
          <p className="intro" style={{ marginBottom: 22 }}>Code never adopts the page theme. Every snippet is a dark Dracula card with window chrome, set in JetBrains Mono SemiBold with ligatures on, identical in light and dark mode, so a screenshot of a post reads the same wherever it lands.</p>
          <CodeSnap tabs={['score.action.ts', 'schema.ts', 'route.ts']} style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
            <S kind="comment">{'// revalidate the trainee list after a score is filed\n'}</S>
            <S kind="keyword">export async function</S>{' '}<S kind="fn">fileScore</S>{'('}<S kind="param" italic>input</S>{': '}<S kind="type">ScoreInput</S>{') {\n  '}
            <S kind="keyword">const</S>{' parsed = '}<S kind="type">scoreSchema</S>{'.'}<S kind="fn">parse</S>{'('}<S kind="param" italic>input</S>{');\n  '}
            <S kind="keyword">await</S>{' '}<S kind="fn">db</S>{'.'}<S kind="fn">insert</S>{'(scores).'}<S kind="fn">values</S>{'(parsed);\n\n  '}
            <S kind="fn">revalidateTag</S>{'('}<S kind="literal">{'`trainee:${parsed.traineeId}`'}</S>{');\n  '}
            <S kind="keyword">return</S>{' { ok: '}<S kind="literal">true</S>{' };\n}'}
          </CodeSnap>
          <div className="cols" style={{ '--col': '240px', gap: 'clamp(24px, 3vw, 40px)' }}>
            <div>
              <div className="label">Syntax tokens</div>
              <div className="keys">
                {SYNTAX.map(([token, hex, use]) => <div key={token}><i style={{ background: `var(--code-${token})` }} /><code>{hex}</code>{use}</div>)}
              </div>
            </div>
            <div>
              <div className="label">Card &amp; chrome</div>
              <div className="keys">
                <div><i style={{ background: 'var(--code-bg)', outline: 'var(--hairline) solid var(--rule)' }} /><code>#111216</code>Card ground</div>
                <div><i style={{ background: 'var(--code-chrome)' }} /><code>#232428</code>Active tab chip</div>
                <div style={{ gap: 8 }}><i style={{ background: 'var(--code-light-close)', borderRadius: '50%' }} /><i style={{ background: 'var(--code-light-min)', borderRadius: '50%' }} /><i style={{ background: 'var(--code-light-max)', borderRadius: '50%' }} />Traffic lights, 12px</div>
              </div>
              <div style={{ marginTop: 'var(--space-4)' }}><Spec lines={['RADIUS 12px · TAB CHIP 7px', 'BORDER 1px #232428', 'SHADOW 0 14px 40px rgba(0,0,0,.32)', 'CODE 13px / 1.75 · W600 · CALT', 'PAD 4px 20px 22px', 'SCROLLS X, NEVER WRAPS']} /></div>
            </div>
            <div>
              <div className="label">Inline code</div>
              <p style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--size-body)', lineHeight: 1.9, color: 'var(--ink-soft)' }}>Set <code className="icode" data-code="data-code">border-radius</code> to zero and the card stops reading as a window.</p>
              <Spec lines={['13px · #F8F8F2 ON #111216', 'BORDER 1px #232428', 'RADIUS 4px · PAD 2px 6px', 'HOST LINE-HEIGHT 1.9', 'TO CLEAR THE CHIP']} />
              <div className="label" style={{ margin: '22px 0 var(--space-3)' }}>Rules</div>
              <Numbered items={[
                'Dracula regardless of page theme. Code is a foreign object.',
                'Always a real filename in the tab. Never "example" or "snippet".',
                'Traffic lights are decoration and carry no interaction.',
                'Twelve lines maximum. Longer belongs in a gist.',
              ]} />
            </div>
          </div>
        </Section>

        <Section id="article" meta="Blog post in situ">
          <Article />
        </Section>

        <Section id="motion" meta="Scroll-driven">
          <p className="intro" style={{ marginBottom: 22 }}>Nothing animates on a timer. Every motion in the system is tied to scroll position, so it is reversible and never blocks reading. Four primitives, and a hard stop for anyone who asks for reduced motion.</p>
          <div className="cells" style={{ '--cell': '240px', marginBottom: 26 }}>
            {MOTION.map(([name, spec]) => (
              <div key={name} style={{ padding: 'var(--space-4)' }}>
                <div style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--size-small)', fontWeight: 'var(--weight-medium)' }}>{name}</div>
                <Spec lines={spec} />
              </div>
            ))}
          </div>
          <div className="label" style={{ marginBottom: 'var(--space-3)' }}>Live: scroll past this</div>
          <div className="cards">
            <div data-reveal="data-reveal"><span>01</span>Each card carries the reveal independently.</div>
            <div data-reveal="data-reveal"><span>02</span>Scroll back up and it plays in reverse.</div>
            <div data-reveal="data-reveal"><span>03</span>No observers, no JavaScript, no jank.</div>
          </div>
        </Section>

        <Section id="diagrams" meta="Canvas · loops in view">
          <p className="intro">For the posts where a paragraph cannot carry the idea. One canvas, the page palette, no colour except the signal for failure. It draws only while it is on screen and holds a single static frame under reduced motion.</p>
          <figure style={{ margin: '0 0 14px' }}>
            <div className="diagram"><LoadBalancer /></div>
            <figcaption className="caption">One node takes every request until its queue overflows and it starts dropping. The balancer splits the same arrival rate across two, and both queues settle below capacity.</figcaption>
          </figure>
          <div className="cols" style={{ '--col': '240px', gap: 'clamp(24px, 3vw, 40px)', marginTop: 'clamp(20px, 2.6vw, 28px)' }}>
            <div>
              <div className="label">Spec</div>
              <Spec lines={['ASPECT 16:7 · 200–320px TALL', 'LOOP 13s · 4 PHASES', 'PARTICLE 2.4px · TRANSIT 2.2s', 'DPR CAPPED AT 2', 'SKIPS DRAW WHEN OFFSCREEN', 'STATIC FRAME ON REDUCE']} />
            </div>
            <div>
              <div className="label">Reads the theme</div>
              <p style={{ margin: '0 0 12px', maxWidth: 'var(--measure-lead)', fontSize: 'var(--size-small)', lineHeight: 'var(--lh-small)', color: 'var(--ink-soft)' }}>The canvas pulls Ink, Faint, Rule and Signal straight off the root at paint time, so it follows the Dark and Light switch with no second palette to maintain.</p>
              <Spec lines={['INK · nodes, active queue', 'FAINT · idle strokes, labels', 'RULE · paths, capacity track', 'SIGNAL · overflow only']} />
            </div>
            <div>
              <div className="label">Rules</div>
              <Numbered items={[
                'One idea per diagram. If it needs a legend, it needs splitting.',
                'The loop must be readable from any entry point, with no start button.',
                'Labels in JetBrains Mono at 10px, never smaller.',
                'Always a caption. The diagram supports the prose, it does not replace it.',
              ]} />
            </div>
          </div>
        </Section>

        <Section id="audit" meta="WCAG AA · 4.5:1 floor">
          <div className="audit" role="table" aria-label="Contrast ratios">
            <div className="audit__head" role="row"><span role="columnheader">Pair</span><span role="columnheader">Dark / light</span><span role="columnheader">Used at</span></div>
            {AUDIT.map(([pair, ratio, use]) => (
              <div key={pair} role="row"><span role="cell">{pair}</span><span role="cell">{ratio}</span><span role="cell">{use}</span></div>
            ))}
          </div>
          <p className="intro" style={{ margin: '20px 0 0' }}>The rule token never carries text. Because the palette has no hue, no state depends on colour perception alone. Every state also changes weight, fill or border. Both themes clear 4.5:1 on every pair above.</p>
        </Section>

        <footer className="foot">
          <a href="mailto:mikkaiser.ribeiro@gmail.com">mikkaiser.ribeiro@gmail.com</a>
          <span>Acta v1.0 · {OWNER.name}</span>
        </footer>
      </main>
    </div>
  );
}

export { SITE };
