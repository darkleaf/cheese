import React from 'react';

function hexCorner(size, i) {
  var angle_deg = 60 * i + 30;
  var angle_rad = Math.PI / 180 * angle_deg;
  var x = size * Math.cos(angle_rad);
  var y = size * Math.sin(angle_rad);
  return `${x},${y}`;
}

function hexPoints(size) {
  return new Array(6)
    .fill()
    .map((_, i) => hexCorner(size, i))
    .join(" ");
}

function hexToPixel(hex, size) {
  let x = size * Math.sqrt(3) * (hex.x + hex.y/2)
  let y = size * 3/2 * hex.y
  return {x, y}
}

export default function Grid({grid, renderCell}) {
  const size = 20;
  const map_radius = size + (2 * grid.radius * size);
  const a = 500;
  return (
    <svg height={a} width={a}>
      <g transform={`translate(${a/2} ${a/2}) scale(0.5)`}>
        <svg overflow="visible" viewBox={`0 0 ${map_radius} ${map_radius}`} >
          <defs>
            <clipPath id="clip">
              <polygon points={ hexPoints(size) } />
            </clipPath>
            <g id="sub">
              <polygon points={ hexPoints(size) } fill="white" stroke="black" strokeWidth=".5" />
            </g>
          </defs>
          {grid.cells.map( (c) => {
             let {x, y} = hexToPixel(c, size);
             let elem = renderCell(c);
             return (
               <g key={c.key} transform={`translate(${x} ${y})`} >
                 <use href="#sub" />
                 <g clipPath="url(#clip)" >
                   <svg overflow="visible" height={size} width={size} >
                       {elem}
                   </svg>
                 </g>
               </g>
             )
           })}
        </svg>
      </g>
    </svg>
  )
}
