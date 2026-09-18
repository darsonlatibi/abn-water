import React from "react";

const Valve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "XV-101",
  label = "VALVE",

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

  const handleWidth = width * 0.25;
  const handleHeight = height * 0.08;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* =========================
          PIPE
      ========================= */}
      <line
        x1={-pipeLength / 2}
        y1="0"
        x2={pipeLength / 2}
        y2="0"
        stroke="#444"
        strokeWidth={Math.max(4, width * 0.06)}
      />

      {/* =========================
          VALVE BODY
      ========================= */}
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

      {/* =========================
          STEM
      ========================= */}
      <line
        x1="0"
        y1={-valveSize}
        x2="0"
        y2={-valveSize - stemHeight}
        stroke="#333"
        strokeWidth="3"
      />

      {/* =========================
          HANDLE
      ========================= */}
      <rect
        x={-handleWidth / 2}
        y={-valveSize - stemHeight - handleHeight}
        width={handleWidth}
        height={handleHeight}
        fill={color}
        stroke="#222"
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* =========================
          LABEL
      ========================= */}
      <text
        x="0"
        y={-valveSize - stemHeight - handleHeight - 10}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* =========================
          TAG
      ========================= */}
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

      {/* =========================
          STATUS
      ========================= */}
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

export default Valve;
