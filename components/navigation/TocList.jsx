import React from 'react';

export function TocList({ label = 'On this page', items = [], activeId, onSelect, style, ...rest }) {
  return (
    <aside style={{ minWidth: 0, ...style }} {...rest}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--size-micro)', letterSpacing: 'var(--ls-micro)', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 'var(--space-3)' }}>
        {label}
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <a
              key={it.id}
              href={'#' + it.id}
              aria-current={active ? 'true' : 'false'}
              onClick={onSelect ? () => onSelect(it.id) : undefined}
              style={{
                display: 'block',
                padding: '7px 0 7px 13px',
                borderLeft: 'var(--hairline) solid ' + (active ? 'var(--ink)' : 'var(--rule)'),
                fontSize: '12px',
                lineHeight: 1.45,
                fontWeight: active ? 'var(--weight-medium)' : 'var(--weight-body)',
                color: active ? 'var(--ink)' : 'var(--muted)',
                transition: 'color var(--dur-pointer) var(--ease), border-color var(--dur-pointer) var(--ease)'
              }}
            >
              {it.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
