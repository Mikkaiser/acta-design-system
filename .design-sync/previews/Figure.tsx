import React from 'react';
import { Figure } from 'mikkaiser-design-system';
import { Ground } from './ground';
import lyon from './assets/worldskills-lyon-2024.jpg';
import dusk from './assets/desert-dusk.jpg';

const pair = { display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' } as const;

export const Evidence = () => (
  <Ground>
    <Figure src={lyon} alt="WorldSkills Lyon 2024" position="50% 22%"
      caption="WorldSkills Lyon, September 2024. Evidence keeps its colour." style={{ maxWidth: 260 }} />
  </Ground>
);

export const SubjectPosition = () => (
  <Ground>
    <div style={pair}>
      <Figure src={dusk} alt="In the desert at dusk" position="50% 30%"
        caption="Desert camp at dusk. The frame stays 3:4 as shot." style={{ width: 200 }} />
      <Figure src={dusk} alt="In the desert at dusk" position="50% 100%"
        caption="Same source, object-position anchored low." style={{ width: 200 }} />
    </div>
  </Ground>
);
