import React from 'react';

const elements = {
  1: <path d="M 0 0 V -7 A 7 7 0 0 1 7 0 z" />,
  2: <path d="M 0 0 V -7 A 7 7 0 1 1 0 7 z" />,
  3: <path d="M 0 0 V -7 A 7 7 0 1 1 -7 0 z" />,
  4: <circle r="7" />
}

export default function Cheese({parts, onClick}) {
   return (
    <svg overflow="visible" viewBox="0 0 13 13" >
      <g stroke="black" fill="yellow" strokeWidth=".5" onClick={onClick}>
        {elements[parts]}
      </g>
    </svg>
  )
}
