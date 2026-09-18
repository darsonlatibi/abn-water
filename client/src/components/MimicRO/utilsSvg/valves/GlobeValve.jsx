import React from "react";

const GlobeValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "GLV-101",
  label = "GLOBE VALVE",

  active = true,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = active ? "#00ff66" : "#666";

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const pipeLength = width * 0.75;
  const bodyHeight = height * 0.22;
  const stemHeight = height * 0.35;
  const wheelRadius = height * 0.12;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* PIPE */}
      <line
        x1={-pipeLength / 2}
        y1="0"
        x2={pipeLength / 2}
        y2="0"
        stroke="#444"
        strokeWidth={Math.max(4, width * 0.06)}
      />

      {/* BODY (Globe shape hint) */}
      <circle
        cx="0"
        cy="0"
        r={bodyHeight / 2}
        fill="none"
        stroke={color}
        strokeWidth="3"
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* SEAT / FLOW RESTRICTION LINE (typical globe symbol) */}
      <path
        d={`
          M ${-width * 0.18} 0
          Q 0 ${active ? 0 : -bodyHeight / 2}
            ${width * 0.18} 0
        `}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* STEM */}
      <line
        x1="0"
        y1={-bodyHeight / 2}
        x2="0"
        y2={-bodyHeight / 2 - stemHeight}
        stroke="#222"
        strokeWidth="3"
      />

      {/* HAND WHEEL */}
      <circle
        cx="0"
        cy={-bodyHeight / 2 - stemHeight - wheelRadius}
        r={wheelRadius}
        fill="none"
        stroke="#222"
        strokeWidth="3"
      />

      <line
        x1={-wheelRadius}
        y1={-bodyHeight / 2 - stemHeight - wheelRadius}
        x2={wheelRadius}
        y2={-bodyHeight / 2 - stemHeight - wheelRadius}
        stroke="#222"
        strokeWidth="2"
      />

      <line
        x1="0"
        y1={-bodyHeight / 2 - stemHeight - wheelRadius * 2}
        x2="0"
        y2={-bodyHeight / 2 - stemHeight}
        stroke="#222"
        strokeWidth="2"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-bodyHeight / 2 - stemHeight - wheelRadius * 2 - 12}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* TAG */}
      <text
        x="0"
        y={height * 0.45}
        textAnchor="middle"
        fill="#aaa"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      {/* STATUS */}
      {showStatus && (
        <text
          x="0"
          y={height * 0.65}
          textAnchor="middle"
          fill={color}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {active ? "OPEN" : "CLOSED"}
        </text>
      )}
    </g>
  );
};

export default GlobeValve;
