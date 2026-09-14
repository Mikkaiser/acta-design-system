import React from 'react';

/** Evidence tier: full colour inside a hairline frame, caption required. */
export function Figure({ src, alt, caption, position = '50% 50%', ratio = '3/4', style, ...rest }) {
  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <div style={{ border: 'var(--hairline) solid var(--rule)', padding: '7px' }}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', aspectRatio: ratio, objectFit: 'cover', objectPosition: position }} />
      </div>
      <figcaption style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5, marginTop: '10px', paddingLeft: '11px', borderLeft: '2px solid var(--rule)' }}>
        {caption}
      </figcaption>
    </figure>
  );
}

/** Mood tier: grayscale, unframed, uncaptioned. At most one per page. */
export function MoodImage({ src, alt, position = '50% 50%', ratio = '3/4', style, ...rest }) {
  return (
    <img
      data-photo="data-photo"
      src={src}
      alt={alt}
      style={{ display: 'block', width: '100%', aspectRatio: ratio, objectFit: 'cover', objectPosition: position, ...style }}
      {...rest}
    />
  );
}
