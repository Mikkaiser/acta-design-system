import React from 'react';

export function EntryRow({ date, title, kicker, summary, duration, href = '#', style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: duration ? '52px minmax(0,1fr) auto' : '52px minmax(0,1fr)',
        gap: 'var(--space-6)',
        alignItems: duration ? 'baseline' : 'start',
        padding: 'var(--pad-row) var(--pad-row-inline)',
        borderBottom: 'var(--hairline) solid var(--rule)',
        background: hover ? 'var(--raised)' : 'transparent',
        transition: 'background var(--dur-pointer) var(--ease)',
        ...style
      }}
      {...rest}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--size-meta)', color: 'var(--faint)', fontVariantNumeric: 'tabular-nums', paddingTop: duration ? 0 : '4px' }}>
        {date}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: '5px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-heading)', fontSize: 'var(--size-entry-title)', lineHeight: 'var(--lh-entry-title)', letterSpacing: 'var(--ls-entry-title)', color: 'var(--ink)' }}>
            {title}
          </span>
          {kicker ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--size-micro)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              {kicker}
            </span>
          ) : null}
        </div>
        {summary ? (
          <p style={{ margin: 0, fontSize: 'var(--size-small)', lineHeight: 'var(--lh-small)', color: 'var(--muted)', maxWidth: '60ch' }}>{summary}</p>
        ) : null}
      </div>
      {duration ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--size-meta)', color: 'var(--faint)', whiteSpace: 'nowrap' }}>{duration}</div>
      ) : null}
    </a>
  );
}
