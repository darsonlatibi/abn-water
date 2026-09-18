// PipeCross.jsx
import React from "react";

const PipeCross = ({
  x = 0,
  y = 0,

  length = 60,
  diameter = 5,

  color = "#444",

  flowing = false,
  flowColor = "#00bfff",
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Horizontal */}
      <line
        x1={-length / 2}
        y1="0"
        x2={length / 2}
        y2="0"
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
      />

      {/* Vertical */}
      <line
        x1="0"
        y1={-length / 2}
        x2="0"
        y2={length / 2}
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
      />

      {/* Flow animation */}
      {flowing && (
        <>
          {/* Horizontal flow */}
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

          {/* Vertical flow */}
          <line
            x1="0"
            y1={-length / 2}
            x2="0"
            y2={length / 2}
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
        </>
      )}

      {/* Center node */}
      <circle cx="0" cy="0" r={diameter} fill={flowing ? flowColor : color} />
    </g>
  );
};

export default PipeCross;
