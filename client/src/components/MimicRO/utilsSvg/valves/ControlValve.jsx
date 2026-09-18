import React from "react";

const ControlValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "CV-101",
  label = "CONTROL VALVE",

  position = 50, // 0-100%
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

  // warna berdasarkan posisi
  let color = "#dc3545";

  if (position > 80) color = "#28a745";
  else if (position > 20) color = "#ffc107";

  const pipeLength = width * 0.75;

  const valveSize = width * 0.18;

  const stemHeight = height * 0.18;

  const actuatorRadius = width * 0.12;

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

      {/* ACTUATOR */}
      <circle
        cx="0"
        cy={-valveSize - stemHeight - actuatorRadius}
        r={actuatorRadius}
        fill="#d9d9d9"
        stroke="#222"
        strokeWidth="2"
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

      {/* POSITIONER LABEL */}
      <text
        x="0"
        y={-valveSize - stemHeight - actuatorRadius + 4}
        textAnchor="middle"
        fill="#222"
        fontWeight="bold"
        fontSize={actuatorRadius * 0.8}
      >
        P
      </text>

      {/* LABEL */}
      <text
        x="0"
        y={-valveSize - stemHeight - actuatorRadius * 2 - 10}
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

      {/* POSITION */}
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
          {position.toFixed(0)}%
        </text>
      )}
    </g>
  );
};

export default ControlValve;
