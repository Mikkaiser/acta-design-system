import * as React from 'react';

/**
 * The organising unit of the whole system: one row in a dated register.
 * Work and posts share the same row, distinguished only by whether a
 * reading duration is present. Rows divide on a 1px rule hairline and
 * fill with one background step on hover. Nothing scales.
 *
 * @startingPoint section="Content" subtitle="Dated row for work and posts" viewport="700x190"
 */
export interface EntryRowProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Mono date gutter. A year for work ("2025"), month-year for posts ("03·26"). */
  date: string;
  title: string;
  /** Short uppercase mono qualifier, e.g. "ADVETI" or "Design system". */
  kicker?: string;
  /** One sentence, occasionally two. */
  summary?: string;
  /** Reading time, e.g. "8 min". Its presence makes this a post row. */
  duration?: string;
  href?: string;
}

export function EntryRow(props: EntryRowProps): JSX.Element;
