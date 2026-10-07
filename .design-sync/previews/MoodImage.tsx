import React from 'react';
import { MoodImage } from 'mikkaiser-design-system';
import { Ground } from './ground';
import view from './assets/burj-view.jpg';
import dusk from './assets/desert-dusk.jpg';

export const Portrait = () => (
  <Ground>
    <MoodImage src={view} alt="Looking out over the city" style={{ maxWidth: 240 }} />
  </Ground>
);

export const AnchoredHigh = () => (
  <Ground>
    <MoodImage src={dusk} alt="In the desert at dusk" position="50% 20%" style={{ maxWidth: 240 }} />
  </Ground>
);
