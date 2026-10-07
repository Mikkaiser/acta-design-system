import React from 'react';
import { Field } from 'acta-design-system';
import { Ground } from './ground';

export const Default = () => (
  <Ground>
    <Field id="email" label="Email" placeholder="you@company.com" helper="Helper text sits here." />
  </Ground>
);

export const Filled = () => (
  <Ground>
    <Field id="email-filled" label="Email" value="mikaelrsimoes19@gmail.com" helper="Value in full ink." onChange={() => {}} />
  </Ground>
);

export const Error = () => (
  <Ground>
    <Field id="email-error" label="Email" value="not-an-email" error="Enter a valid address." onChange={() => {}} />
  </Ground>
);

export const Disabled = () => (
  <Ground>
    <Field id="email-disabled" label="Email" value="locked" disabled helper="Sunken ground, muted ink." onChange={() => {}} />
  </Ground>
);

export const Multiline = () => (
  <Ground>
    <Field id="note" label="Message" multiline rows={3} placeholder="What are you building?" helper="Two or three sentences is plenty." />
  </Ground>
);
