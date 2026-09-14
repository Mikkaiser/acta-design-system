import * as React from 'react';

/**
 * An article table of contents. Sits beside the text from 1180px and above it
 * below that, via order:-1 on the stacked case. The active mark should be
 * driven from offsetTop against scrollY, not getBoundingClientRect, because
 * the section reveal transform shifts the rect.
 *
 * @startingPoint section="Navigation" subtitle="Article contents with active mark" viewport="700x180"
 */
export interface TocItem {
  /** Matches the id of the heading it points at. */
  id: string;
  label: string;
}

export interface TocListProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  items?: TocItem[];
  /** Id of the heading currently at the top of the viewport. */
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function TocList(props: TocListProps): JSX.Element;
