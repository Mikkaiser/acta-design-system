import React from 'react';
import { Tag } from 'mikkaiser-design-system';
import { Ground } from './ground';

const tags = { display: 'flex', gap: 8, flexWrap: 'wrap' } as const;

export const Stack = () => (
  <Ground>
    <div style={tags}>
      <Tag>.NET</Tag><Tag>Next.js</Tag><Tag>Oracle</Tag><Tag>Kubernetes</Tag><Tag>MariaDB</Tag>
    </div>
  </Ground>
);

export const FilterSet = () => (
  <Ground>
    <div style={tags}>
      <Tag selected>All</Tag><Tag>Work</Tag><Tag>Writing</Tag><Tag>Talks</Tag>
    </div>
  </Ground>
);
