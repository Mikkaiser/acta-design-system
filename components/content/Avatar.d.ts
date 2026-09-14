import * as React from 'react';

/**
 * Chrome-tier photography: a circular portrait, grayscale with colour
 * returning on hover. object-fit cannot reach a good circular crop when the
 * subject sits off to one side, so the image is scaled inside the circle and
 * offset until the face lands on the centre. The percentage offsets scale
 * proportionally, so the same values work at 56px and 132px.
 *
 * @startingPoint section="Content" subtitle="Circular portrait, grayscale to colour" viewport="700x150"
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  /** Diameter in px. 56 in the rail, 132 on an about header. */
  size?: number;
  /** Inner image width as a percentage of the circle. Default 248. */
  scale?: number;
  /** Inner image left offset, percent of the circle. Default -121. */
  offsetX?: number;
  /** Inner image top offset, percent of the circle. Default -36. */
  offsetY?: number;
}

export function Avatar(props: AvatarProps): JSX.Element;
