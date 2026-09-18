import React from "react";

const Motor = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "MTR-101",
  label = "MOTOR",

  running = true,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = running ? "#00ff66" : "#666";

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const bodySize = Math.min(width, height) * 0.28;
  const shaftLength = width * 0.25;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* SHAFT LINE */}
      <line
        x1={-shaftLength}
        y1="0"
        x2={shaftLength}
        y2="0"
        stroke="#444"
        strokeWidth={Math.max(3, width * 0.04)}
      />

      {/* MOTOR BODY */}
      <rect
        x={-bodySize}
        y={-bodySize}
        width={bodySize * 2}
        height={bodySize * 2}
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

      {/* ROTOR / INNER CIRCLE */}
      <circle
        cx="0"
        cy="0"
        r={bodySize * 0.5}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* ROTATION INDICATOR */}
      {running && (
        <line
          x1="0"
          y1="0"
          x2={bodySize * 0.5}
          y2="0"
          stroke={color}
          strokeWidth="3"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* LABEL */}
      <text
        x="0"
        y={-bodySize - 14}
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
        y={bodySize + 18}
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
          y={bodySize + 34}
          textAnchor="middle"
          fill={color}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {running ? "RUNNING" : "STOP"}
        </text>
      )}
    </g>
  );
};

export default Motor;
