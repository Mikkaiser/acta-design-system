import * as React from 'react';

/**
 * Evidence-tier photography: full colour inside a 1px frame with 7px inset,
 * caption always required. Use when the photograph proves something.
 */
export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  /** Required. A photograph without a caption is not evidence. */
  caption: React.ReactNode;
  /** CSS object-position, anchored on the subject rather than frame centre. */
  position?: string;
  /** Defaults to 3:4, the native phone portrait frame. Never 16/9 from a portrait source. */
  ratio?: string;
}

/** Mood-tier photography: grayscale until hovered, no frame, no caption. */
export interface MoodImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  position?: string;
  ratio?: string;
}

export function Figure(props: FigureProps): JSX.Element;
export function MoodImage(props: MoodImageProps): JSX.Element;
