import React from 'react';

const BASE = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--size-button)',
  fontWeight: 'var(--weight-medium)',
  lineHeight: 1,
  borderRadius: 'var(--radius-control)',
  whiteSpace: 'nowrap',
  flex: '0 0 auto',
  cursor: 'pointer',
  display: 'inline-block',
  transition: 'background var(--dur-pointer) var(--ease), border-color var(--dur-pointer) var(--ease), color var(--dur-pointer) var(--ease)'
};

const VARIANTS = {
  primary: {
    background: 'var(--ink)',
    color: 'var(--on-ink)',
    border: 'none',
    padding: '13px 20px'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--ink)',
    border: 'var(--hairline) solid var(--rule)',
    padding: '12px 19px'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink)',
    border: 'none',
    borderBottom: 'var(--hairline) solid var(--rule)',
    borderRadius: 0,
    padding: '0 0 2px'
  }
};

const DISABLED = {
  primary: { background: 'var(--sunken)', color: 'var(--muted)' },
  secondary: { borderColor: 'var(--rule)', color: 'var(--faint)' },
  ghost: { color: 'var(--faint)', borderBottomColor: 'transparent' }
};

const HOVER = {
  primary: { background: 'var(--ink-hover)' },
  secondary: { borderColor: 'var(--ink)' },
  ghost: { borderBottomColor: 'var(--ink)' }
};

export function Button({ variant = 'primary', href, disabled = false, children, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const merged = {
    ...BASE,
    ...v,
    ...(disabled ? DISABLED[variant] : hover ? HOVER[variant] : null),
    ...(disabled ? { cursor: 'not-allowed' } : null),
    ...style
  };
  const handlers = disabled
    ? {}
    : { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), onClick };

  if (href && !disabled) {
    return <a href={href} style={merged} {...handlers} {...rest}>{children}</a>;
  }
  return <button type="button" disabled={disabled} style={merged} {...handlers} {...rest}>{children}</button>;
}
