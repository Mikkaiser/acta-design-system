import React from 'react';

export function Tag({ selected = false, children, style, ...rest }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--size-micro)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '5px 9px',
        borderRadius: 'var(--radius-control)',
        border: 'var(--hairline) solid ' + (selected ? 'var(--ink)' : 'var(--rule)'),
        background: selected ? 'var(--ink)' : 'transparent',
        color: selected ? 'var(--on-ink)' : 'var(--ink-soft)',
        whiteSpace: 'nowrap',
        ...style
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
