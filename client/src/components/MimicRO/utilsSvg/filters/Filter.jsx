import React from "react";

const Filter = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "FIL-101",
  label = "FILTER",

  clogged = false,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = clogged ? "#dc3545" : "#28a745";

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const pipeLength = width * 0.75;
  const bodyWidth = width * 0.28;
  const bodyHeight = height * 0.35;

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

      {/* FILTER BODY (housing) */}
      <rect
        x={-bodyWidth}
        y={-bodyHeight / 2}
        width={bodyWidth * 2}
        height={bodyHeight}
        fill="none"
        stroke={color}
        strokeWidth="3"
        rx="6"
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

      {/* FILTER MESH */}
      <g opacity="0.8">
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={-bodyWidth}
            y1={-bodyHeight / 2 + i * (bodyHeight / 5)}
            x2={bodyWidth}
            y2={-bodyHeight / 2 + i * (bodyHeight / 5)}
            stroke={clogged ? "#dc3545" : "#00bfff"}
            strokeWidth="1"
          />
        ))}
      </g>

      {/* FLOW INDICATOR */}
      <line
        x1={-bodyWidth}
        y1="0"
        x2={bodyWidth}
        y2="0"
        stroke={clogged ? "#666" : "#00bfff"}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* DIRTY PARTICLES (clog effect) */}
      {clogged && (
        <>
          <circle cx="-10" cy="-5" r="2" fill="#444" />
          <circle cx="5" cy="8" r="2" fill="#444" />
          <circle cx="12" cy="-6" r="2" fill="#444" />
        </>
      )}

      {/* LABEL */}
      <text
        x="0"
        y={-bodyHeight / 2 - 14}
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
          fill={clogged ? "#dc3545" : "#28a745"}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {clogged ? "CLOGGED" : "CLEAN"}
        </text>
      )}
    </g>
  );
};

export default Filter;
