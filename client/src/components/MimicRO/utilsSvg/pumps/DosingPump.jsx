// DosingPump.jsx
import React from "react";

const DosingPump = ({
  x = 0,
  y = 0,

  width = 80,
  height = 60,

  tag = "DP-101",
  label = "DOSING PUMP",

  running = false,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const color = alarm ? "#dc3545" : running ? "#28a745" : "#6b7280";

  const pipeLength = width * 0.8;
  const bodyRadius = width * 0.16;
  const motorWidth = width * 0.25;
  const motorHeight = height * 0.28;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* Pipe */}
      <line
        x1={-pipeLength / 2}
        y1="0"
        x2={pipeLength / 2}
        y2="0"
        stroke="#444"
        strokeWidth="4"
      />

      {/* Pump head */}
      <circle
        cx="0"
        cy="0"
        r={bodyRadius}
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

      {/* Diaphragm */}
      <path
        d={`
          M ${-bodyRadius * 0.6} 0
          L 0 ${-bodyRadius * 0.6}
          L ${bodyRadius * 0.6} 0
          L 0 ${bodyRadius * 0.6}
          Z
        `}
        fill={running ? "#00bfff" : "#888"}
      />

      {/* Motor body */}
      <rect
        x={bodyRadius}
        y={-motorHeight / 2}
        width={motorWidth}
        height={motorHeight}
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />

      {/* Coupling */}
      <line
        x1={bodyRadius}
        y1="0"
        x2={bodyRadius + 6}
        y2="0"
        stroke={color}
        strokeWidth="3"
      />

      {/* Injection arrow */}
      <polygon
        points={`${bodyRadius + motorWidth + 8},0 ${
          bodyRadius + motorWidth + 2
        },-4 ${bodyRadius + motorWidth + 2},4`}
        fill={running ? "#00bfff" : "#666"}
      />

      {/* Pulsation animation */}
      {running && (
        <circle
          cx="0"
          cy="0"
          r={bodyRadius}
          fill="none"
          stroke="#00bfff"
          strokeWidth="2"
          opacity="0.7"
        >
          <animate
            attributeName="r"
            values={`${bodyRadius};${bodyRadius + 4};${bodyRadius}`}
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;0.2;0.7"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Label */}
      <text
        x="0"
        y={-height * 0.45}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Tag */}
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

      {/* Status */}
      {showStatus && (
        <text
          x="0"
          y={height * 0.65}
          textAnchor="middle"
          fill={running ? "#28a745" : "#888"}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {running ? "RUNNING" : "STOPPED"}
        </text>
      )}
    </g>
  );
};

export default DosingPump;

// <DosingPump
//   x={100}
//   y={100}
//   tag="DP-101"
//   label="ANTISCALANT"
//   running={true}
// />

// <DosingPump
//   x={250}
//   y={100}
//   tag="DP-102"
//   label="NaOCl"
//   alarm={true}
// />

// <DosingPump
//   x={400}
//   y={100}
//   tag="DP-103"
//   label="HCl"
//   running={false}
// />
