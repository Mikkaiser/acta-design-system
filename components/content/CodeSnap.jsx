import React from 'react';

const C = {
  keyword: 'var(--code-keyword)',
  type: 'var(--code-type)',
  fn: 'var(--code-function)',
  param: 'var(--code-param)',
  literal: 'var(--code-literal)',
  comment: 'var(--code-comment)',
  plain: 'var(--code-fg)'
};

export function CodeSnap({ tabs = [], activeTab = 0, children, style, ...rest }) {
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        background: 'var(--code-bg)',
        border: 'var(--hairline) solid var(--code-chrome)',
        boxShadow: 'var(--code-shadow)',
        ...style
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '13px 16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flex: '0 0 auto' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--code-light-close)' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--code-light-min)' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--code-light-max)' }} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-1)', alignItems: 'center', flexWrap: 'wrap', minWidth: 0 }}>
          {tabs.map((t, i) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                padding: '6px 12px',
                whiteSpace: 'nowrap',
                borderRadius: i === activeTab ? 'var(--radius-chip)' : 0,
                background: i === activeTab ? 'var(--code-chrome)' : 'transparent',
                color: i === activeTab ? 'var(--code-fg)' : 'var(--code-comment)'
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ overflowX: 'auto', padding: '4px 20px 22px' }}>
        <pre
          data-code="data-code"
          style={{
            margin: 0,
            minWidth: 'max-content',
            fontFamily: 'var(--font-mono)',
            fontWeight: 'var(--weight-code)',
            fontSize: 'var(--size-code)',
            lineHeight: 'var(--lh-code)',
            color: 'var(--code-fg)'
          }}
        >
          {children}
        </pre>
      </div>
    </figure>
  );
}

/** Syntax span. Use inside CodeSnap children to colour a run. */
export function Syn({ kind = 'plain', italic = false, children }) {
  return <span style={{ color: C[kind] || C.plain, fontStyle: italic ? 'italic' : undefined }}>{children}</span>;
}
