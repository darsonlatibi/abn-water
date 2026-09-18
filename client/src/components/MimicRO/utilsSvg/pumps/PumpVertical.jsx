// PumpVertical.jsx
import React from "react";

const PumpVertical = ({
  x = 0,
  y = 0,

  width = 70,
  height = 100,

  tag = "P-101",
  label = "VERTICAL PUMP",

  running = false,
  alarm = false,

  direction = "up",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const rotation = {
    up: 0,
    right: 90,
    down: 180,
    left: -90,
  }[direction];

  const color = alarm ? "#dc3545" : running ? "#28a745" : "#6b7280";

  const pipeLength = height * 0.8;

  const bodyWidth = width * 0.22;
  const bodyHeight = height * 0.42;

  const motorWidth = width * 0.4;
  const motorHeight = height * 0.18;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* Pipe */}
      <line
        x1="0"
        y1={-pipeLength / 2}
        x2="0"
        y2={pipeLength / 2}
        stroke="#444"
        strokeWidth="5"
      />

      {/* Pump body */}
      <rect
        x={-bodyWidth / 2}
        y={-bodyHeight / 2}
        width={bodyWidth}
        height={bodyHeight}
        rx="6"
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
      </rect>

      {/* Pump stages */}
      {[...Array(4)].map((_, i) => (
        <line
          key={i}
          x1={-bodyWidth / 2}
          y1={-bodyHeight / 2 + (i + 1) * (bodyHeight / 5)}
          x2={bodyWidth / 2}
          y2={-bodyHeight / 2 + (i + 1) * (bodyHeight / 5)}
          stroke={color}
          strokeWidth="1"
        />
      ))}

      {/* Motor */}
      <rect
        x={-motorWidth / 2}
        y={-bodyHeight / 2 - motorHeight}
        width={motorWidth}
        height={motorHeight}
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />

      {/* Coupling */}
      <line
        x1="0"
        y1={-bodyHeight / 2}
        x2="0"
        y2={-bodyHeight / 2 - 6}
        stroke={color}
        strokeWidth="3"
      />

      {/* Base */}
      <line
        x1={-width * 0.25}
        y1={bodyHeight / 2 + 6}
        x2={width * 0.25}
        y2={bodyHeight / 2 + 6}
        stroke={color}
        strokeWidth="3"
      />

      {/* Flow arrow */}
      <polygon
        points="-5,-32 0,-42 5,-32"
        fill={running ? "#00bfff" : "#666"}
      />

      {/* Rotation effect */}
      {running && (
        <circle cx="0" cy={-bodyHeight / 2 - 6} r="4" fill="#00bfff">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 0 ${-bodyHeight / 2 - 6}`}
            to={`360 0 ${-bodyHeight / 2 - 6}`}
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Label */}
      <text
        x="0"
        y={-height * 0.65}
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
        y={height * 0.55}
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
          y={height * 0.72}
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

export default PumpVertical;

{
  /* <PumpVertical
  x={120}
  y={120}
  tag="P-101"
  label="FEED PUMP"
  running={true}
/>

<PumpVertical
  x={260}
  y={120}
  tag="P-102"
  label="HP PUMP"
  alarm={true}
/> */
}
