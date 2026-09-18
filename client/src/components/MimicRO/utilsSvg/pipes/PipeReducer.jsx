// PipeReducer.jsx
import React from "react";

const PipeReducer = ({
  x = 0,
  y = 0,

  length = 60,

  inletDiameter = 8,
  outletDiameter = 4,

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
      {/* Reducer body */}
      <polygon
        points={`
          ${-length / 2},${-inletDiameter / 2}
          ${length / 2},${-outletDiameter / 2}
          ${length / 2},${outletDiameter / 2}
          ${-length / 2},${inletDiameter / 2}
        `}
        fill="none"
        stroke={color}
        strokeWidth="2"
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
          strokeDasharray="8 8"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="16"
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

export default PipeReducer;

{
  /* <PipeReducer
  x={200}
  y={100}
  length={70}
  inletDiameter={10}
  outletDiameter={4}
  direction="right"
  flowing={true}
  showArrow={true}
/>; */
}
