import React from 'react';

export function Avatar({ src, alt = '', size = 56, scale = 248, offsetX = -121, offsetY = -36, style, ...rest }) {
  return (
    <div
      data-photo="data-photo"
      style={{
        position: 'relative',
        width: size,
        height: size,
        flex: '0 0 auto',
        borderRadius: 'var(--radius-round)',
        overflow: 'hidden',
        ...style
      }}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        style={{ position: 'absolute', width: scale + '%', height: 'auto', left: offsetX + '%', top: offsetY + '%', display: 'block' }}
      />
    </div>
  );
}
