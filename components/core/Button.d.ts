import * as React from 'react';

/**
 * Three button variants, five states each. Minimum target 44px tall on touch.
 * Nothing scales or lifts on hover; only fill and border colour change.
 *
 * @startingPoint section="Core" subtitle="Primary, secondary and ghost buttons" viewport="700x150"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual weight. Primary is an ink fill, secondary a hairline outline, ghost an underline only. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Renders an anchor instead of a button. Ignored when disabled. */
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
