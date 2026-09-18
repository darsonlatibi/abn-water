import React from "react";

const ManualValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "HV-101",
  label = "MANUAL VALVE",

  open = true,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = open ? "#28a745" : "#dc3545";

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const pipeLength = width * 0.75;
  const valveSize = width * 0.18;

  const stemHeight = height * 0.18;

  const wheelRadius = width * 0.12;

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

      {/* VALVE BODY */}
      <polygon
        points={`
          ${-valveSize},${-valveSize}
          0,0
          ${-valveSize},${valveSize}
        `}
        fill={color}
        stroke="#222"
        strokeWidth="2"
      />

      <polygon
        points={`
          ${valveSize},${-valveSize}
          0,0
          ${valveSize},${valveSize}
        `}
        fill={color}
        stroke="#222"
        strokeWidth="2"
      />

      {/* STEM */}
      <line
        x1="0"
        y1={-valveSize}
        x2="0"
        y2={-valveSize - stemHeight}
        stroke="#333"
        strokeWidth="3"
      />

      {/* HANDWHEEL */}
      <circle
        cx="0"
        cy={-valveSize - stemHeight - wheelRadius}
        r={wheelRadius}
        fill="none"
        stroke={color}
        strokeWidth="3"
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Cross inside wheel */}
      <line
        x1={-wheelRadius}
        y1={-valveSize - stemHeight - wheelRadius}
        x2={wheelRadius}
        y2={-valveSize - stemHeight - wheelRadius}
        stroke={color}
        strokeWidth="2"
      />

      <line
        x1="0"
        y1={-valveSize - stemHeight - wheelRadius * 2}
        x2="0"
        y2={-valveSize - stemHeight}
        stroke={color}
        strokeWidth="2"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-valveSize - stemHeight - wheelRadius * 2 - 10}
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
          {open ? "OPEN" : "CLOSE"}
        </text>
      )}
    </g>
  );
};

export default ManualValve;
