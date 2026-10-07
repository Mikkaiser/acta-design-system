import React from 'react';
import {
  Avatar, Button, CodeSnap, EntryRow, Field, Figure, MoodImage, SectionHead, Syn, Tag, TocList,
} from '../components/index.jsx';
import { SITE, REPO, OWNER } from './meta.js';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'principles', label: 'Principles' },
  { id: 'type', label: 'Type' },
  { id: 'colour', label: 'Colour' },
  { id: 'components', label: 'Components' },
  { id: 'photography', label: 'Photography' },
  { id: 'blog', label: 'Blog' },
  { id: 'install', label: 'Install' },
];

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--size-micro)', letterSpacing: 'var(--ls-micro)', textTransform: 'uppercase', color: 'var(--faint)' };
const h3 = { fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-heading)', fontSize: 'var(--size-h3)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)', color: 'var(--ink)', margin: 0 };
const body = { fontSize: 'var(--size-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-soft)', maxWidth: 'var(--measure-body)', margin: 0 };
const small = { fontSize: 'var(--size-small)', lineHeight: 'var(--lh-small)', color: 'var(--muted)', margin: 0 };
const row = { display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' };
const src = (file) => `${REPO.blob}/${file}`;

function Section({ id, label, meta, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} style={{ scrollMarginTop: 24, marginBottom: 'var(--gap-section)' }}>
      <SectionHead label={label} meta={meta} id={`${id}-h`} />
      {children}
    </section>
  );
}

function ThemeSwitch() {
  const [theme, setTheme] = React.useState('dark');
  React.useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  }, []);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('acta-theme', next); } catch (e) {}
    setTheme(next);
  };
  return (
    <Button variant="ghost" onClick={toggle} aria-label="Switch colour theme">
      {theme === 'light' ? 'Dark theme' : 'Light theme'}
    </Button>
  );
}

function useActiveSection() {
  const [active, setActive] = React.useState('overview');
  React.useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (seen[0]) setActive(seen[0].target.id);
    }, { rootMargin: '0px 0px -70% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return [active, setActive];
}

function Rail() {
  const [active, setActive] = useActiveSection();
  return (
    <aside className="rail" aria-label="Site">
      <a href={OWNER.url} rel="author" style={{ display: 'flex', gap: 14, alignItems: 'center', color: 'var(--ink)' }}>
        <Avatar src="assets/burj-view.jpg" alt="" size={56} />
        <span>
          <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em' }}>Mikael Ribeiro</span>
          <span style={{ ...mono, display: 'block', marginTop: 3, letterSpacing: '0.14em' }}>Mikkaiser</span>
        </span>
      </a>
      <div style={{ marginTop: 'var(--space-8)' }}>
        <TocList label="Acta design system" items={SECTIONS} activeId={active} onSelect={setActive} />
      </div>
      <div style={{ marginTop: 'var(--space-8)', display: 'grid', gap: 'var(--space-3)', justifyItems: 'start' }}>
        <ThemeSwitch />
        <Button variant="ghost" href={OWNER.url} rel="author">mikkaiser.com ↗</Button>
        <Button variant="ghost" href={REPO.url}>GitHub ↗</Button>
      </div>
    </aside>
  );
}

function TypeRow({ tier, spec, children }) {
  return (
    <div className="spec-row">
      <div style={{ ...mono, lineHeight: 1.9 }}>
        <span style={{ display: 'block', color: 'var(--ink)' }}>{tier}</span>
        {spec}
      </div>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}

const COLOURS = [
  ['bg', '#0A0A0A', '#FFFFFF', 'Page'], ['raised', '#171717', '#FAFAFA', 'Hover step'], ['sunken', '#1F1F1F', '#F5F5F5', 'Disabled'],
  ['rule', '#2E2E2E', '#EBEBEB', 'Hairlines'], ['faint', '#8F8F8F', '#737373', 'Mono meta'], ['muted', '#A1A1A1', '#525252', 'Secondary text'],
  ['ink-soft', '#D4D4D4', '#404040', 'Body copy'], ['ink', '#FFFFFF', '#000000', 'Headings, fills, focus'], ['signal', '#FF6166', '#CC0000', 'Field errors only'],
];

function ComponentDoc({ name, file, children, summary }) {
  return (
    <article id={`c-${name.toLowerCase()}`} style={{ padding: 'var(--space-8) 0', borderBottom: 'var(--hairline) solid var(--rule)', scrollMarginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        <h3 style={h3}>{name}</h3>
        <a href={src(file)} style={{ ...mono, color: 'var(--muted)' }}>Usage guide ↗</a>
      </div>
      <p style={{ ...small, maxWidth: 'var(--measure-body)', marginBottom: 'var(--space-6)' }}>{summary}</p>
      <div style={{ minWidth: 0 }}>{children}</div>
    </article>
  );
}

function Specimen({ label, children }) {
  return (
    <figure className="specimen">
      <figcaption style={{ ...mono, padding: 'var(--space-3) var(--space-4)', borderBottom: 'var(--hairline) solid var(--rule)' }}>{label}</figcaption>
      <div className="specimen-body">{children}</div>
    </figure>
  );
}

function Anatomy({ items }) {
  return (
    <ol className="anatomy">
      {items.map(([part, rule]) => (
        <li key={part}><span><b>{part}</b> {rule}</span></li>
      ))}
    </ol>
  );
}

const articleH2 = { fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-heading)', fontSize: 'var(--size-heading)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)', color: 'var(--ink)', margin: 'var(--space-8) 0 var(--space-3)', scrollMarginTop: 24 };
const articleP = { fontSize: 'var(--size-body)', lineHeight: 'var(--lh-body)', color: 'var(--ink-soft)', margin: '0 0 var(--space-4)' };

function BlogSection() {
  const S = Syn;
  const toc = [
    { id: 'post-contract', label: 'The schema is the contract' },
    { id: 'post-boundary', label: 'Where the boundary lands' },
    { id: 'post-buys', label: 'What it buys you' },
  ];
  return (
    <Section id="blog" label="Blog" meta="Planned">
      <p style={{ ...body, marginBottom: 'var(--space-4)' }}>
        The blog on mikkaiser.com is designed but not yet live. It needs no new components: the index is a set of post rows, and an article is a single 64ch column of text with the table of contents beside it. Everything below is built from the components above.
      </p>
      <p style={{ ...small, marginBottom: 'var(--space-8)' }}>The posts shown here are samples to demonstrate the layout.</p>

      <h3 style={{ ...h3, marginBottom: 'var(--space-3)' }}>Post index</h3>
      <p style={{ ...small, maxWidth: 'var(--measure-body)', marginBottom: 'var(--space-6)' }}>One row per post, newest first. The date gutter reads month·year, the reading time sits on the right, and a tag set filters by topic.</p>
      <Specimen label="mikkaiser.com/blog · sample">
        <SectionHead label="Writing" meta="Two posts · 2026" />
        <div style={{ ...row, gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          <Tag selected>All</Tag><Tag>Architecture</Tag><Tag>Diagrams</Tag><Tag>Career</Tag>
        </div>
        <div style={{ borderTop: 'var(--hairline) solid var(--rule)' }}>
          <EntryRow date="03·26" duration="8 min" kicker="Architecture" title="Clean architecture in a government codebase" href="#post-sample" summary="What survives contact with a ten-year-old Oracle schema, and what you quietly give up." />
          <EntryRow date="01·26" duration="5 min" kicker="Diagrams" title="One idea per diagram" href="#post-sample" summary="If it needs a legend, it needs splitting." />
        </div>
      </Specimen>
      <Anatomy items={[
        ['Title.', 'Plain and declarative, sentence case. No colon subtitles, no questions.'],
        ['Summary.', 'One sentence, occasionally two, in muted.'],
        ['Kicker.', 'The post’s single topic, the same word as its filter tag.'],
        ['Duration.', 'Reading time in mono. Its presence is what makes a row a post rather than a project.'],
      ]} />

      <h3 id="post-sample" style={{ ...h3, margin: 'var(--space-12) 0 var(--space-3)', scrollMarginTop: 24 }}>Article page</h3>
      <p style={{ ...small, maxWidth: 'var(--measure-body)', marginBottom: 'var(--space-6)' }}>A single reading column with the table of contents beside it from 1180px, and above it on narrower screens. A 2px progress bar runs along the top as you read.</p>
      <Specimen label="mikkaiser.com/blog/clean-architecture · sample">
        <div aria-hidden="true" style={{ height: 'var(--progress-height)', background: 'var(--rule)', margin: 'calc(-1 * var(--space-6)) calc(-1 * var(--space-6)) var(--space-8)' }}>
          <div style={{ width: '38%', height: '100%', background: 'var(--ink)' }} />
        </div>
        <div style={{ ...mono, display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', fontVariantNumeric: 'tabular-nums' }}>
          <span>03·26</span><span>·</span><span>8 min read</span><span>·</span><span>Architecture</span>
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: 'var(--size-page-title)', lineHeight: 'var(--lh-page-title)', letterSpacing: 'var(--ls-page-title)', color: 'var(--ink)', margin: 'var(--space-4) 0', maxWidth: '20ch' }}>Clean architecture in a government codebase</h4>
        <p style={{ fontSize: 'var(--size-lead)', lineHeight: 'var(--lh-lead)', letterSpacing: 'var(--ls-lead)', color: 'var(--muted)', maxWidth: 'var(--measure-lead)', margin: '0 0 var(--space-8)' }}>What survives contact with a ten-year-old Oracle schema, and what you quietly give up.</p>
        <div className="article">
          <div className="article-toc">
            <TocList items={toc} activeId="post-boundary" />
          </div>
          <div className="article-body">
            <h5 id="post-contract" style={articleH2}>The schema is the contract</h5>
            <p style={articleP}>Body copy runs at 15px on a 1.7 line height, in ink-soft, never wider than 64 characters. Headings inside an article use the 24px heading style and carry a 24px scroll margin so the table of contents lands them cleanly.</p>
            <CodeSnap tabs={['score.repository.ts']}>
              <S kind="keyword">export interface</S>{' '}<S kind="type">ScoreRepository</S><S>{' {\n'}</S>
              <S>{'  '}</S><S kind="fn">findByCompetitor</S>{'('}<S kind="param" italic>id</S>{': '}<S kind="type">string</S>{'): '}<S kind="type">Promise</S>{'<'}<S kind="type">Score</S><S>{'[]>;\n}'}</S>
            </CodeSnap>
            <h5 id="post-boundary" style={articleH2}>Where the boundary lands</h5>
            <p style={articleP}>Code always sits in a code card, full column width, scrolling sideways rather than wrapping. Evidence photography uses a framed, captioned figure; personal photos stay on About and Now.</p>
            <div style={{ maxWidth: 280 }}>
              <Figure src="assets/worldskills-lyon-2024.jpg" alt="Mikael Ribeiro at WorldSkills Lyon 2024" position="50% 22%" caption="Figures are captioned. A photograph without a caption is not evidence." />
            </div>
            <h5 id="post-buys" style={articleH2}>What it buys you</h5>
            <p style={articleP}>A diagram, when a paragraph cannot carry the idea, is one canvas at 16:7 in the page palette, with signal reserved for failure. One idea per diagram.</p>
            <div style={{ borderTop: 'var(--hairline) solid var(--rule)', marginTop: 'var(--space-8)' }}>
              <div style={{ ...mono, padding: 'var(--space-4) 0 var(--space-2)' }}>Next post</div>
              <EntryRow date="01·26" duration="5 min" title="One idea per diagram" href="#post-sample" summary="If it needs a legend, it needs splitting." style={{ paddingInline: 0 }} />
            </div>
            <div style={{ marginTop: 'var(--space-6)' }}><Button variant="ghost" href="#blog">All posts ↑</Button></div>
          </div>
        </div>
      </Specimen>
      <Anatomy items={[
        ['Progress bar.', '2px of ink along the top edge, driven by scroll with no JavaScript, gone under reduced motion.'],
        ['Meta line.', 'Date, reading time and topic in mono, separated by ·.'],
        ['Title and lead.', 'Page title at up to 38px, then one lead sentence in muted at 20px.'],
        ['Table of contents.', 'Only for three or more headings. Beside the text from 1180px, above it below that.'],
        ['Body.', '15px Roboto at 64ch. Headings at 24px Bricolage 700.'],
        ['Code, figures, diagrams.', 'CodeSnap for every snippet, Figure for evidence, one idea per diagram.'],
        ['Ending.', 'The next post as a single row, then a way back to the index.'],
      ]} />
    </Section>
  );
}

export function Page() {
  const S = Syn;
  return (
    <div className="shell">
      <Rail />
      <main id="main" className="content">
        <section id="overview" aria-label="Overview" style={{ scrollMarginTop: 24, marginBottom: 'var(--gap-section)' }}>
          <div style={mono}>Design system · v1.0.0</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: 'clamp(64px, 12vw, 148px)', lineHeight: 0.9, letterSpacing: 'var(--ls-display)', margin: 'var(--space-4) 0 var(--space-6)' }}>Acta</h1>
          <p style={{ fontSize: 'var(--size-lead)', lineHeight: 'var(--lh-lead)', letterSpacing: 'var(--ls-lead)', color: 'var(--ink-soft)', maxWidth: 'var(--measure-lead)', margin: 0 }}>
            Latin for “things done”. The design system behind <a href={OWNER.url} rel="author" style={{ borderBottom: 'var(--hairline) solid var(--rule)' }}>mikkaiser.com</a>, the portfolio and blog of {OWNER.name}, where every piece of content is a dated record of work that shipped.
          </p>
          <p style={{ ...body, marginTop: 'var(--space-4)', color: 'var(--muted)' }}>
            Rome posted the <em>acta diurna</em>, a daily public record of what had actually happened. Acta keeps that idea: monochrome, text-led, rows in a register, and a rail that carries the name, the map and the contact. Eleven React components, styled entirely with CSS custom properties, in dark and light.
          </p>
          <div style={{ ...row, marginTop: 'var(--space-8)' }}>
            <Button variant="primary" href="#install">Install ↓</Button>
            <Button variant="secondary" href={REPO.url}>View on GitHub ↗</Button>
            <Button variant="ghost" href={OWNER.url} rel="author">See it live on mikkaiser.com ↗</Button>
          </div>
        </section>

        <Section id="principles" label="Principles" meta="Five rules">
          <ol className="rules">
            <li><span><b>Monochrome by rule.</b> Ten neutrals and one signal. Hierarchy comes from weight, size and a single background step, never from hue.</span></li>
            <li><span><b>Rows, not cards.</b> Content sits in rows divided by 1px hairlines. The code card is the only card in the system.</span></li>
            <li><span><b>Depth is one step.</b> No gradients, patterns, transparency, blur or shadows. Hover lifts a row to the raised surface and nothing moves.</span></li>
            <li><span><b>Type does the work.</b> No icon set. Inline Unicode carries direction: ↗ out, ↓ further down, · between metadata.</span></li>
            <li><span><b>Code is a foreign object.</b> Always JetBrains Mono with ligatures, always Dracula, always a dark card that never takes the page theme.</span></li>
          </ol>
        </Section>

        <Section id="type" label="Type" meta="Four families, as on mikkaiser.com">
          <TypeRow tier="Display" spec={<>Bricolage Grotesque 800<br />up to 62px · −0.04em</>}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--size-display)', lineHeight: 1, letterSpacing: '-0.04em' }}>Hi, my name is Mikael</div>
          </TypeRow>
          <TypeRow tier="Headings" spec={<>Bricolage Grotesque 700<br />24 · 21 · 20 · 16px</>}>
            <div style={{ ...h3, fontSize: 24 }}>Workshop Management System</div>
          </TypeRow>
          <TypeRow tier="Text" spec={<>Roboto 400, buttons 500<br />lead 20 · body 15 · small 13px</>}>
            <p style={{ fontSize: 'var(--size-lead)', lineHeight: 'var(--lh-lead)', color: 'var(--ink-soft)', margin: 0, maxWidth: 'var(--measure-lead)' }}>Six years across .NET, Node and the front ends on top of them.</p>
          </TypeRow>
          <TypeRow tier="Mono" spec={<>JetBrains Mono 400 · 600<br />labels, dates, numerals, code</>}>
            <div style={{ ...row, gap: 'var(--space-8)', alignItems: 'baseline' }}>
              <span><span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 26, fontVariantNumeric: 'tabular-nums' }}>6+</span><span style={{ ...mono, display: 'block', marginTop: 6 }}>Years of software</span></span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--size-meta)', color: 'var(--faint)' }}>03·26 · 8 min</span>
            </div>
          </TypeRow>
          <TypeRow tier="Accent" spec={<>Poppins 600 · 14px<br />the AI agent's name only</>}>
            <div style={{ fontFamily: 'var(--font-title)', fontWeight: 600, fontSize: 14 }}>Mikkaiser agent</div>
          </TypeRow>
        </Section>

        <Section id="colour" label="Colour" meta="Dark default · light on request">
          <p style={{ ...body, marginBottom: 'var(--space-6)' }}>Swatches follow the theme switch in the rail. Every text pair clears WCAG AA in both themes.</p>
          <div className="table-wrap">
            <table className="tokens">
              <thead><tr><th scope="col">Token</th><th scope="col">Role</th><th scope="col">Dark</th><th scope="col">Light</th></tr></thead>
              <tbody>
                {COLOURS.map(([name, dark, light, role]) => (
                  <tr key={name}>
                    <td><span className="sw" style={{ background: `var(--${name})` }} /><code>--{name}</code></td>
                    <td>{role}</td><td><code>{dark}</code></td><td><code>{light}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="components" label="Components" meta="Eleven, on window.Acta">
          <ComponentDoc name="EntryRow" file="components/content/EntryRow.prompt.md" summary="One item of work or writing, dated, in a hairline-divided set. Include a duration for posts.">
            <div style={{ borderTop: 'var(--hairline) solid var(--rule)' }}>
              <EntryRow date="2025" kicker="ADVETI" title="Student Management Platform" href={OWNER.url} summary="Training tracking and reporting for Emirates Skills and WorldSkills competitors. Next.js and MariaDB." />
              <EntryRow date="03·26" duration="8 min" title="Clean architecture in a government codebase" href={OWNER.url} summary="What survives contact with a ten-year-old Oracle schema." />
            </div>
          </ComponentDoc>
          <ComponentDoc name="SectionHead" file="components/core/SectionHead.prompt.md" summary="Opens every section. The only 1px ink rule in the system; the meta on the right is a count, a range or a date.">
            <SectionHead label="Selected work" meta="Four of eleven" style={{ marginBottom: 0 }} />
          </ComponentDoc>
          <ComponentDoc name="Button" file="components/core/Button.prompt.md" summary="Primary ink fill once per view, secondary hairline outline, ghost underline. Hover changes fill or border only.">
            <div style={row}>
              <Button variant="primary">Get in touch</Button>
              <Button variant="secondary">Read the case</Button>
              <Button variant="ghost" href="#components">All posts ↓</Button>
              <Button variant="primary" disabled>Sending</Button>
            </div>
          </ComponentDoc>
          <ComponentDoc name="Tag" file="components/core/Tag.prompt.md" summary="Stack items, categories and filters. Mono, uppercase, never more than five in a row.">
            <div style={{ ...row, gap: 'var(--space-2)' }}><Tag>.NET</Tag><Tag>Next.js</Tag><Tag>MariaDB</Tag><Tag selected>Kubernetes</Tag></div>
          </ComponentDoc>
          <ComponentDoc name="Field" file="components/forms/Field.prompt.md" summary="Every text input, with its own mono label, helper and error line. The signal colour appears here and nowhere else.">
            <div className="two-col">
              <Field id="demo-email" label="Email" placeholder="you@company.com" helper="I reply within two working days." />
              <Field id="demo-bad" label="Email" value="not-an-email" readOnly error="Enter a valid address." />
            </div>
          </ComponentDoc>
          <ComponentDoc name="TocList" file="components/navigation/TocList.prompt.md" summary="Table of contents for articles with three or more headings. The rail on this page is one.">
            <TocList activeId="b" items={[{ id: 'a', label: 'The schema is the contract' }, { id: 'b', label: 'Where the boundary lands' }, { id: 'c', label: 'What it buys you' }]} style={{ maxWidth: 320 }} />
          </ComponentDoc>
          <ComponentDoc name="CodeSnap and Syn" file="components/content/CodeSnap.prompt.md" summary="Every code block. Real filenames in the tabs, a Syn run per token, and it never wraps or takes the page theme.">
            <CodeSnap tabs={['score.action.ts', 'schema.ts']} activeTab={0}>
              <S kind="comment">{'// revalidate after a score is filed\n'}</S>
              <S kind="keyword">export async function</S>{' '}<S kind="fn">fileScore</S>{'('}<S kind="param" italic>input</S>{': '}<S kind="type">ScoreInput</S><S>{') {\n'}</S>
              <S>{'  '}</S><S kind="keyword">await</S>{' db.'}<S kind="fn">insert</S>{'(scores).'}<S kind="fn">values</S><S>{'(input);\n'}</S>
              <S>{'  '}</S><S kind="fn">revalidatePath</S>{'('}<S kind="literal">{"'/competitors'"}</S><S>{');\n}'}</S>
            </CodeSnap>
          </ComponentDoc>
          <ComponentDoc name="Avatar, Figure and MoodImage" file="components/content/Figure.prompt.md" summary="The three photography tiers, shown below.">
            <a href="#photography" style={{ ...mono, color: 'var(--muted)' }}>Photography ↓</a>
          </ComponentDoc>
        </Section>

        <Section id="photography" label="Photography" meta="Three tiers">
          <p style={{ ...body, marginBottom: 'var(--space-8)' }}>Photography is the one place Acta meets colour, so the treatment depends on the job the image does.</p>
          <div className="three-col">
            <div style={{ display: 'grid', gap: 'var(--space-4)', alignContent: 'start' }}>
              <h3 style={{ ...h3, fontSize: 20 }}>Chrome</h3>
              <div style={{ ...row, alignItems: 'flex-end' }}><Avatar src="assets/burj-view.jpg" alt="Mikael Ribeiro" size={132} /><Avatar src="assets/burj-view.jpg" alt="" size={56} /></div>
              <p style={small}>Avatar. Grayscale until hover, the face centred inside the circle.</p>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-4)', alignContent: 'start' }}>
              <h3 style={{ ...h3, fontSize: 20 }}>Evidence</h3>
              <Figure src="assets/worldskills-lyon-2024.jpg" alt="Mikael Ribeiro at WorldSkills Lyon 2024" position="50% 22%" caption="WorldSkills Lyon, September 2024. Evidence keeps its colour." />
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-4)', alignContent: 'start' }}>
              <h3 style={{ ...h3, fontSize: 20 }}>Mood</h3>
              <MoodImage src="assets/desert-dusk.jpg" alt="Desert camp at dusk" position="50% 30%" />
              <p style={small}>MoodImage. Grayscale, unframed, one per page.</p>
            </div>
          </div>
        </Section>

        <BlogSection />

        <Section id="install" label="Install" meta="React 18">
          <p style={{ ...body, marginBottom: 'var(--space-6)' }}>The package entry brings its own stylesheet, so tokens and fonts arrive with the first import. The components are plain JSX, so let your bundler compile the package, for example with <code>transpilePackages</code> in Next.js.</p>
          <CodeSnap tabs={['terminal']}>
            <S kind="fn">npm</S>{' install '}<S kind="literal">{`github:${REPO.slug}`}</S>
          </CodeSnap>
          <div style={{ height: 'var(--space-6)' }} />
          <CodeSnap tabs={['SelectedWork.jsx']}>
            <S kind="keyword">import</S>{' { SectionHead, EntryRow } '}<S kind="keyword">from</S>{' '}<S kind="literal">{"'acta-design-system'"}</S><S>{';\n\n'}</S>
            <S kind="keyword">export function</S>{' '}<S kind="fn">SelectedWork</S><S>{'() {\n'}</S>
            <S>{'  '}</S><S kind="keyword">return</S><S>{' (\n'}</S>
            <S>{'    <'}</S><S kind="type">SectionHead</S>{' '}<S kind="param" italic>label</S>{'='}<S kind="literal">"Selected work"</S>{' '}<S kind="param" italic>meta</S>{'='}<S kind="literal">"Four of eleven"</S><S>{' />\n'}</S>
            <S>{'  );\n}'}</S>
          </CodeSnap>
        </Section>

        <footer className="foot">
          <p style={small}>
            Acta is designed and maintained by <a href={OWNER.url} rel="author">{OWNER.name}</a> (Mikkaiser), a software engineer and tech educator in Abu Dhabi. It powers <a href={OWNER.url} rel="author">mikkaiser.com</a>.
          </p>
          <div style={{ ...row, marginTop: 'var(--space-4)' }}>
            <a href={OWNER.url} rel="author" style={mono}>mikkaiser.com ↗</a>
            <a href={REPO.url} style={mono}>GitHub ↗</a>
            <a href="https://techknowledge.blog" rel="me" style={mono}>techknowledge.blog ↗</a>
            <a href="https://www.linkedin.com/in/mikael-ribeiro/" rel="me" style={mono}>LinkedIn ↗</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export { SITE };
