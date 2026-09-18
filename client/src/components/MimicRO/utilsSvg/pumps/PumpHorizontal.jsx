// PumpHorizontal.jsx
import React from "react";

const PumpHorizontal = ({
  x = 0,
  y = 0,

  width = 100,
  height = 70,

  tag = "P-101",
  label = "HORIZONTAL PUMP",

  running = false,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const rotationMap = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  const rotation = rotationMap[direction] ?? 0;

  const color = alarm ? "#dc3545" : running ? "#28a745" : "#6b7280";

  const pipeLength = width * 0.85;
  const pumpRadius = width * 0.15;

  const motorWidth = width * 0.28;
  const motorHeight = height * 0.32;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* ================= PIPE + FLOW ================= */}
      <g>
        {/* PIPE BODY */}
        <line
          x1={-pipeLength / 2}
          y1="0"
          x2={pipeLength / 2}
          y2="0"
          stroke="#444"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* FLOW ANIMATION (moving dashes) */}
        {running && (
          <line
            x1={-pipeLength / 2}
            y1="0"
            x2={pipeLength / 2}
            y2="0"
            stroke="#00bfff"
            strokeWidth="3"
            strokeDasharray="8 8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-32"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
        )}
      </g>

      {/* ================= PUMP ================= */}
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

      {/* IMPELLER */}
      <g>
        <path
          d="M -7 0 L 0 -7 L 7 0 L 0 7 Z"
          fill={running ? "#00bfff" : "#888"}
        >
          {running && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="0.8s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </g>

      {/* ================= COUPLING ================= */}
      <line
        x1={pumpRadius}
        y1="0"
        x2={pumpRadius + 8}
        y2="0"
        stroke={color}
        strokeWidth="3"
      />

      {/* ================= MOTOR ================= */}
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
          x1={pumpRadius + 15 + i * 6}
          y1={-motorHeight / 2}
          x2={pumpRadius + 15 + i * 6}
          y2={motorHeight / 2}
          stroke={color}
          strokeWidth="1"
        />
      ))}

      {/* ================= LABEL ================= */}
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

export default PumpHorizontal;

{
  /* <PumpHorizontal
  x={150}
  y={100}
  tag="P-101"
  label="FEED PUMP"
  running={true}
/>

<PumpHorizontal
  x={350}
  y={100}
  tag="P-102"
  label="HIGH PRESSURE PUMP"
  alarm={true}
/> */
}
