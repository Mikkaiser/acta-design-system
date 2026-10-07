import React from 'react';
import { TocList } from 'mikkaiser-design-system';
import { Ground } from './ground';

const items = [
  { id: 'a-contract', label: 'The schema is the contract' },
  { id: 'a-boundary', label: 'Where the boundary lands' },
  { id: 'a-buys', label: 'What it buys you' },
  { id: 'a-after', label: 'Two years on' },
];

export const ActiveSecond = () => (
  <Ground>
    <TocList activeId="a-boundary" items={items} />
  </Ground>
);

export const CustomLabel = () => (
  <Ground>
    <TocList label="Contents" activeId="a-contract" items={items.slice(0, 3)} />
  </Ground>
);
