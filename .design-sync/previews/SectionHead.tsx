import React from 'react';
import { SectionHead } from 'mikkaiser-design-system';
import { Ground } from './ground';

export const WithMeta = () => (
  <Ground>
    <SectionHead label="Selected work" meta="Four of eleven" style={{ marginBottom: 0 }} />
  </Ground>
);

export const Numbered = () => (
  <Ground>
    <SectionHead label="03 Writing" meta="2022 to 2026" style={{ marginBottom: 0 }} />
  </Ground>
);

export const LabelOnly = () => (
  <Ground>
    <SectionHead label="Contact" style={{ marginBottom: 0 }} />
  </Ground>
);
