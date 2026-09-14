import * as React from 'react';

/**
 * The section divider used by every section in the system: a 10px uppercase
 * label on a 1px ink rule, with optional mono metadata pushed to the right.
 */
export interface SectionHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short uppercase label, e.g. "Selected work". Numbering is part of the string. */
  label: string;
  /** Optional right-aligned mono count or range, e.g. "Four of eleven". */
  meta?: string;
}

export function SectionHead(props: SectionHeadProps): JSX.Element;
