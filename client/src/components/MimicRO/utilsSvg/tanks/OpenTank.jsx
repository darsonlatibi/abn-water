// OpenTank.jsx
import React from "react";

const OpenTank = ({
  x = 0,
  y = 0,

  width = 100,
  height = 120,

  tag = "OT-101",
  label = "OPEN TANK",

  level = 60, // 0-100%

  alarm = false,

  liquidColor = "#00bfff",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const tankWidth = width * 0.65;
  const tankHeight = height * 0.65;

  const liquidHeight = (tankHeight * level) / 100;

  let status = "NORMAL";
  let statusColor = "#28a745";

  if (level <= 20) {
    status = "LOW";
    statusColor = "#ffc107";
  }

  if (level >= 90) {
    status = "HIGH";
    statusColor = "#dc3545";
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-height * 0.55}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Tank wall */}
      <line
        x1={-tankWidth / 2}
        y1={-tankHeight / 2}
        x2={-tankWidth / 2}
        y2={tankHeight / 2}
        stroke={alarm ? "#dc3545" : "#aaa"}
        strokeWidth="3"
      />

      <line
        x1={tankWidth / 2}
        y1={-tankHeight / 2}
        x2={tankWidth / 2}
        y2={tankHeight / 2}
        stroke={alarm ? "#dc3545" : "#aaa"}
        strokeWidth="3"
      />

      <line
        x1={-tankWidth / 2}
        y1={tankHeight / 2}
        x2={tankWidth / 2}
        y2={tankHeight / 2}
        stroke={alarm ? "#dc3545" : "#aaa"}
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
      </line>

      {/* Liquid */}
      <rect
        x={-tankWidth / 2 + 3}
        y={tankHeight / 2 - liquidHeight}
        width={tankWidth - 6}
        height={liquidHeight}
        fill={liquidColor}
        opacity="0.8"
      />

      {/* Surface animation */}
      <line
        x1={-tankWidth / 2 + 4}
        y1={tankHeight / 2 - liquidHeight}
        x2={tankWidth / 2 - 4}
        y2={tankHeight / 2 - liquidHeight}
        stroke="#ffffff"
        strokeWidth="2"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Inlet */}
      <line
        x1={-tankWidth / 2 - 15}
        y1={-tankHeight / 4}
        x2={-tankWidth / 2}
        y2={-tankHeight / 4}
        stroke="#666"
        strokeWidth="4"
      />

      {/* Outlet */}
      <line
        x1={tankWidth / 2}
        y1={tankHeight / 4}
        x2={tankWidth / 2 + 15}
        y2={tankHeight / 4}
        stroke="#666"
        strokeWidth="4"
      />

      {/* Level */}
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill="#ffffff"
        fontWeight="bold"
        fontSize="12"
        fontFamily={fontFamily}
      >
        {level}%
      </text>

      {/* Tag */}
      <text
        x="0"
        y={height * 0.5}
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
          y={height * 0.68}
          textAnchor="middle"
          fill={statusColor}
          fontWeight="bold"
          fontSize={statusSize}
          fontFamily={fontFamily}
        >
          {status}
        </text>
      )}
    </g>
  );
};

export default OpenTank;
