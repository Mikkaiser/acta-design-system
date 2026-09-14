import * as React from 'react';

/** A mono, uppercase taxonomy chip. Used for stacks, categories and filters. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Inverts to an ink fill. Use for the active filter in a set. */
  selected?: boolean;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
