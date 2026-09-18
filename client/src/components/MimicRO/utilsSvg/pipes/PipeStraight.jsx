// PipeStraight.jsx
import React from "react";

const PipeStraight = ({
  x = 0,
  y = 0,

  length = 100,
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

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* Main pipe */}
      <line
        x1={-length / 2}
        y1="0"
        x2={length / 2}
        y2="0"
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
      />

      {/* Flow animation */}
      {flowing && (
        <line
          x1={-length / 2}
          y1="0"
          x2={length / 2}
          y2="0"
          stroke={flowColor}
          strokeWidth="2"
          strokeDasharray="10 10"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="20"
            to="0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* Flow arrow */}
      {showArrow && (
        <polygon
          points={`
            ${length / 2 - 8},0
            ${length / 2 - 16},-4
            ${length / 2 - 16},4
          `}
          fill={flowing ? flowColor : color}
        />
      )}
    </g>
  );
};

export default PipeStraight;
