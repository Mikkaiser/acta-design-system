import React from 'react';

export function Field({ label, id, value, placeholder, helper, error, disabled = false, multiline = false, rows = 3, onChange, style, ...rest }) {
  const borderColor = error ? 'var(--signal)' : 'var(--rule)';
  const control = {
    width: '100%',
    background: disabled ? 'var(--sunken)' : 'var(--bg)',
    border: 'var(--hairline) solid ' + borderColor,
    color: disabled ? 'var(--muted)' : 'var(--ink)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    lineHeight: multiline ? 'var(--lh-small)' : 'normal',
    padding: '12px 13px',
    borderRadius: 'var(--radius-control)',
    cursor: disabled ? 'not-allowed' : 'auto',
    resize: multiline ? 'vertical' : undefined
  };
  return (
    <div style={style}>
      {label ? (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--size-micro)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '7px'
          }}
        >
          {label}
        </label>
      ) : null}
      {multiline ? (
        <textarea id={id} rows={rows} value={value} placeholder={placeholder} disabled={disabled} onChange={onChange} style={control} {...rest} />
      ) : (
        <input id={id} type="text" value={value} placeholder={placeholder} disabled={disabled} onChange={onChange} style={control} {...rest} />
      )}
      {error || helper ? (
        <div style={{ fontSize: '11px', lineHeight: 1.45, marginTop: '6px', color: error ? 'var(--signal)' : 'var(--muted)' }}>
          {error || helper}
        </div>
      ) : null}
    </div>
  );
}
