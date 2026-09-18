// PumpVSD.jsx
import React from "react";

const PumpVSD = ({
  x = 0,
  y = 0,

  width = 110,
  height = 80,

  tag = "P-101",
  label = "VSD PUMP",

  running = false,
  alarm = false,

  speedHz = 50,

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

  const pipeLength = width * 0.85;

  const pumpRadius = width * 0.14;

  const motorWidth = width * 0.22;
  const motorHeight = height * 0.28;

  const vsdWidth = width * 0.18;
  const vsdHeight = height * 0.4;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* Pipe */}
      <line
        x1={-pipeLength / 2}
        y1="0"
        x2={pipeLength / 2}
        y2="0"
        stroke="#444"
        strokeWidth="5"
      />

      {/* Pump Casing */}
      <circle
        cx="0"
        cy="0"
        r={pumpRadius}
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

      {/* Impeller */}
      <g>
        <path
          d="
            M -7 0
            L 0 -7
            L 7 0
            L 0 7
            Z
          "
          fill={running ? "#00bfff" : "#888"}
        />

        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur={`${60 / speedHz}s`}
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* Coupling */}
      <line
        x1={pumpRadius}
        y1="0"
        x2={pumpRadius + 8}
        y2="0"
        stroke={color}
        strokeWidth="3"
      />

      {/* Motor */}
      <rect
        x={pumpRadius + 8}
        y={-motorHeight / 2}
        width={motorWidth}
        height={motorHeight}
        rx="6"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />

      {/* Motor fins */}
      {[...Array(4)].map((_, i) => (
        <line
          key={i}
          x1={pumpRadius + 16 + i * 6}
          y1={-motorHeight / 2}
          x2={pumpRadius + 16 + i * 6}
          y2={motorHeight / 2}
          stroke={color}
          strokeWidth="1"
        />
      ))}

      {/* Cable */}
      <line
        x1={pumpRadius + 8 + motorWidth}
        y1="0"
        x2={pumpRadius + 8 + motorWidth + 8}
        y2="0"
        stroke={color}
        strokeWidth="2"
      />

      {/* VFD Panel */}
      <rect
        x={pumpRadius + 8 + motorWidth + 8}
        y={-vsdHeight / 2}
        width={vsdWidth}
        height={vsdHeight}
        rx="5"
        fill="#111827"
        stroke={color}
        strokeWidth="2"
      />

      {/* VFD Display */}
      <rect
        x={pumpRadius + 8 + motorWidth + 12}
        y={-vsdHeight / 2 + 5}
        width={vsdWidth - 8}
        height={12}
        fill="#001f1f"
        stroke="#00bfff"
      />

      <text
        x={pumpRadius + 8 + motorWidth + 8 + vsdWidth / 2}
        y={-vsdHeight / 2 + 15}
        fill="#00ff88"
        fontSize="8"
        textAnchor="middle"
        fontFamily="Consolas"
      >
        {speedHz} Hz
      </text>

      {/* Status LED */}
      <circle
        cx={pumpRadius + 8 + motorWidth + vsdWidth / 2 + 8}
        cy={10}
        r="3"
        fill={running ? "#00ff00" : "#666"}
      />

      {/* Label */}
      <text
        x="0"
        y={-height * 0.5}
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
        y={height * 0.48}
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
          y={height * 0.66}
          textAnchor="middle"
          fill={running ? "#28a745" : "#888"}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {running ? `RUNNING (${speedHz} Hz)` : "STOPPED"}
        </text>
      )}
    </g>
  );
};

export default PumpVSD;

{
  /* <PumpVSD
  x={400}
  y={200}
  tag="P-101"
  label="FEED PUMP"
  running={true}
  speedHz={42}
/>; */
}
