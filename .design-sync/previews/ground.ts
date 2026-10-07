// Shared preview scaffolding. Acta is dark by default (tokens live on :root)
// and the light theme is a page-level switch ([data-theme="light"] anywhere
// flips :root), so every cell sits on the system's own --bg rather than the
// card page's white body.
import React from 'react';

type GroundProps = { children: React.ReactNode; style?: React.CSSProperties };

export const Ground = ({ children, style }: GroundProps) =>
  React.createElement(
    'div',
    {
      style: {
        background: 'var(--bg)',
        color: 'var(--ink)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--size-body)',
        lineHeight: 'var(--lh-body)',
        padding: 20,
        ...style,
      },
    },
    children,
  );

export const row: React.CSSProperties = { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' };
