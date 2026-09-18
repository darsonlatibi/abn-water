// PLC.jsx
import React from "react";

const PLC = ({
  x = 0,
  y = 0,

  width = 120,
  height = 70,

  tag = "PLC-01",
  label = "PLC CONTROLLER",

  status = "RUN", // RUN | STOP | FAULT

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,

  inputs = 4,
  outputs = 4,
}) => {
  let statusColor = "#28a745";

  if (status === "STOP") statusColor = "#ffc107";
  if (status === "FAULT") statusColor = "#dc3545";

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-height * 0.75}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* PLC Body */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx="8"
        fill="#1a1a1a"
        stroke={alarm ? "#dc3545" : "#666"}
        strokeWidth="3"
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* Input indicators (left side) */}
      {Array.from({ length: inputs }).map((_, i) => (
        <circle
          key={`in-${i}`}
          cx={-width / 2 - 6}
          cy={-height / 2 + 10 + i * 12}
          r="3"
          fill="#00bfff"
        />
      ))}

      {/* Output indicators (right side) */}
      {Array.from({ length: outputs }).map((_, i) => (
        <circle
          key={`out-${i}`}
          cx={width / 2 + 6}
          cy={-height / 2 + 10 + i * 12}
          r="3"
          fill="#28a745"
        />
      ))}

      {/* Center Icon */}
      <rect
        x={-18}
        y={-10}
        width={36}
        height={20}
        rx="4"
        fill="#0d0d0d"
        stroke="#00bfff"
        strokeWidth="1.5"
      />

      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize="10"
        fontFamily={fontFamily}
      >
        PLC
      </text>

      {/* Status */}
      {showStatus && (
        <text
          x="0"
          y={height * 0.75}
          textAnchor="middle"
          fill={statusColor}
          fontWeight="bold"
          fontSize={statusSize}
          fontFamily={fontFamily}
        >
          {status}
        </text>
      )}

      {/* Tag */}
      <text
        x="0"
        y={height * 0.95}
        textAnchor="middle"
        fill="#aaa"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>
    </g>
  );
};

export default PLC;
