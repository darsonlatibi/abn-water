import React from "react";

const CrossPipe = ({
  x = 0,
  y = 0,
  size = 60,
  active = true,
  pipeColor = "#cfd8dc",
  flowColor = "#00bfff",
  pipeWidth = 10,
}) => {
  const half = size / 2;

  // MAIN HORIZONTAL
  const x1 = x - half;
  const x2 = x + half;

  // MAIN VERTICAL
  const y1 = y - half;
  const y2 = y + half;

  return (
    <g>
      {/* =========================
          HORIZONTAL PIPE
      ========================= */}
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* FLOW HORIZONTAL */}
      {active && (
        <line
          x1={x1}
          y1={y}
          x2={x2}
          y2={y}
          stroke={flowColor}
          strokeWidth={4}
          strokeDasharray="10 8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================
          VERTICAL PIPE
      ========================= */}
      <line
        x1={x}
        y1={y1}
        x2={x}
        y2={y2}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* FLOW VERTICAL */}
      {active && (
        <line
          x1={x}
          y1={y1}
          x2={x}
          y2={y2}
          stroke={flowColor}
          strokeWidth={4}
          strokeDasharray="10 8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================
          CENTER NODE
      ========================= */}
      <circle
        cx={x}
        cy={y}
        r="7"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />
    </g>
  );
};

export default CrossPipe;
