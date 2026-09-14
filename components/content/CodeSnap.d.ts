import * as React from 'react';

/**
 * The only card in the system. A dark Dracula code window with traffic lights
 * and a real filename in a tab, set in JetBrains Mono 600 with ligatures on.
 * It never adopts the page theme: identical in dark and light, so a screenshot
 * of a post reads the same wherever it lands. Twelve lines maximum.
 *
 * @startingPoint section="Content" subtitle="Dracula code card with window chrome" viewport="700x260"
 */
export interface CodeSnapProps extends React.HTMLAttributes<HTMLElement> {
  /** Real filenames. Never "example" or "snippet". */
  tabs?: string[];
  /** Index of the active tab. */
  activeTab?: number;
  /** Code content. Wrap runs in <Syn> to colour them. */
  children?: React.ReactNode;
}

export interface SynProps {
  kind?: 'keyword' | 'type' | 'fn' | 'param' | 'literal' | 'comment' | 'plain';
  /** Parameters are italic in this system. */
  italic?: boolean;
  children?: React.ReactNode;
}

export function CodeSnap(props: CodeSnapProps): JSX.Element;
export function Syn(props: SynProps): JSX.Element;
