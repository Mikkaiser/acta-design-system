import * as React from 'react';

/**
 * A labelled text input or textarea. Six states: default, focus, filled,
 * error, disabled, and multiline. Focus is a 2px ink ring at 2px offset,
 * never the browser default.
 *
 * @startingPoint section="Forms" subtitle="Labelled input with helper and error" viewport="700x160"
 */
export interface FieldProps {
  /** Mono uppercase label rendered above the control. */
  label?: string;
  /** Required when label is set, so the label binds to the control. */
  id?: string;
  value?: string;
  placeholder?: string;
  /** Muted helper line below the control. Hidden when error is set. */
  helper?: string;
  /** Signal-coloured message. Also turns the border to signal. */
  error?: string;
  disabled?: boolean;
  /** Renders a textarea instead of an input. */
  multiline?: boolean;
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function Field(props: FieldProps): JSX.Element;
