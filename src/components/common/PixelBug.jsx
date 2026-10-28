//
import React from 'react'

// the bug, drawn pixel by pixel on a 12 by 8 grid: each row is the
// columns filled in it - antennae, head with its two eyes left out,
// body, and legs
const ROWS = [
  [2, 9],
  [3, 8],
  [2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 4, 5, 6, 7, 9, 10],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [0, 2, 3, 4, 5, 6, 7, 8, 9, 11],
  [0, 2, 9, 11],
  [3, 4, 7, 8],
];

/**
 * A pixelated bug - the error kind - in the text colour, as an icon: it
 * takes a className as a react-icons icon does (a Button's `icon`), and
 * sizes with the type (1em wide).
 */
function PixelBug({ className = '' }) {
  return (
    <svg className={className} viewBox='0 0 12 8' width='1em' height='0.67em' fill='currentColor'
      shapeRendering='crispEdges' aria-hidden='true' focusable='false'>
      {ROWS.flatMap((columns, y) => columns.map((x) => <rect x={x} y={y} width='1' height='1' key={`${x}-${y}`} />))}
    </svg>
  )
}

export default PixelBug
