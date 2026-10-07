import React from 'react';
import { Avatar } from 'acta-design-system';
import { Ground, row } from './ground';
import portrait from './assets/burj-view.jpg';

export const RailSize = () => (
  <Ground>
    <div style={{ ...row, gap: 14 }}>
      <Avatar src={portrait} alt="Mikael Ribeiro" size={56} />
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em' }}>Mikael Ribeiro</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', marginTop: 3 }}>Senior software developer</div>
      </div>
    </div>
  </Ground>
);

export const Sizes = () => (
  <Ground>
    <div style={{ ...row, gap: 16, alignItems: 'flex-end' }}>
      <Avatar src={portrait} alt="" size={40} />
      <Avatar src={portrait} alt="" size={56} />
      <Avatar src={portrait} alt="" size={132} />
    </div>
  </Ground>
);
