import React from 'react';
import { Button } from 'mikkaiser-design-system';
import { Ground, row } from './ground';

export const Variants = () => (
  <Ground>
    <div style={row}>
      <Button variant="primary">Get in touch</Button>
      <Button variant="secondary">Read the case</Button>
      <Button variant="ghost">All posts</Button>
    </div>
  </Ground>
);

export const AsLink = () => (
  <Ground>
    <div style={row}>
      <Button variant="primary" href="mailto:mikaelrsimoes19@gmail.com">Get in touch</Button>
      <Button variant="ghost" href="#posts">All posts ↓</Button>
    </div>
  </Ground>
);

export const Disabled = () => (
  <Ground>
    <div style={row}>
      <Button variant="primary" disabled>Sending</Button>
      <Button variant="secondary" disabled>Read the case</Button>
      <Button variant="ghost" disabled>All posts</Button>
    </div>
  </Ground>
);
