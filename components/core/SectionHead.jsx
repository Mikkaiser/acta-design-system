import React from 'react';

export function SectionHead({ label, meta, style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingBottom: 'var(--space-3)',
        borderBottom: 'var(--hairline) solid var(--ink)',
        marginBottom: 'var(--space-6)',
        ...style
      }}
      {...rest}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--size-section-head)',
          letterSpacing: 'var(--ls-section-head)',
          textTransform: 'uppercase',
          fontWeight: 'var(--weight-title)',
          color: 'var(--ink)'
        }}
      >
        {label}
      </h2>
      {meta ? (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--size-micro)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--faint)'
          }}
        >
          {meta}
        </span>
      ) : null}
    </div>
  );
}
