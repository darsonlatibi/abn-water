// PipeFlexible.jsx
import React from "react";

const PipeFlexible = ({
  x = 0,
  y = 0,

  length = 80,
  amplitude = 6,
  segments = 12,

  diameter = 5,

  direction = "right", // right, left, up, down

  color = "#444",

  flowing = false,
  flowColor = "#00bfff",

  showArrow = false,
}) => {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  // Generate zig-zag path
  let path = "";
  for (let i = 0; i <= segments; i++) {
    const px = -length / 2 + (i * length) / segments;
    const py = i % 2 === 0 ? -amplitude : amplitude;

    if (i === 0) {
      path += `M ${px} ${py}`;
    } else {
      path += ` L ${px} ${py}`;
    }
  }

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* Flexible pipe */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flow animation */}
      {flowing && (
        <path
          d={path}
          fill="none"
          stroke={flowColor}
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="16"
            to="0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* Flow arrow */}
      {showArrow && (
        <polygon
          points={`
            ${length / 2 - 2},0
            ${length / 2 - 10},-4
            ${length / 2 - 10},4
          `}
          fill={flowing ? flowColor : color}
        />
      )}
    </g>
  );
};

export default PipeFlexible;

{
  /* <PipeFlexible
  x={200}
  y={100}
  length={100}
  amplitude={8}
  segments={14}
  flowing={true}
  showArrow={true}
/>; */
}
