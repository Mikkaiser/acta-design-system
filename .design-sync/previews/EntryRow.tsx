import React from 'react';
import { EntryRow } from 'ledger-design-system';
import { Ground } from './ground';

const set = { borderTop: '1px solid var(--rule)' } as const;

export const WorkRows = () => (
  <Ground>
    <div style={set}>
      <EntryRow date="2025" kicker="ADVETI" title="Student Management Platform"
        summary="Training tracking, performance monitoring and reporting for Emirates Skills and WorldSkills competitors. Next.js and MariaDB." />
      <EntryRow date="2024" kicker="ADVETI" title="Institute service mesh"
        summary="Roughly 15 microservices over RabbitMQ, Docker and Kubernetes, with Grafana, Loki and Prometheus for observability." />
    </div>
  </Ground>
);

export const PostRows = () => (
  <Ground>
    <div style={set}>
      <EntryRow date="03·26" duration="8 min" title="Clean architecture in a government codebase"
        summary="What survives contact with a ten-year-old Oracle schema, and what you quietly give up." />
      <EntryRow date="01·26" duration="5 min" title="One idea per diagram"
        summary="If it needs a legend, it needs splitting." />
    </div>
  </Ground>
);

export const TitleOnly = () => (
  <Ground>
    <div style={set}>
      <EntryRow date="2023" title="Emirates Skills scoring app" />
      <EntryRow date="2022" kicker="Freelance" title="Clinic booking portal" />
    </div>
  </Ground>
);
