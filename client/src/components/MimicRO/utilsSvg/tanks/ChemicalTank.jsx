// ChemicalTank.jsx
import React from "react";

const ChemicalTank = ({
  x = 0,
  y = 0,

  width = 80,
  height = 140,

  tag = "CT-101",
  label = "CHEMICAL TANK",

  level = 70,

  alarm = false,

  liquidColor = "#ff9800",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const tankWidth = width * 0.6;
  const tankHeight = height * 0.7;

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
        y={-height * 0.45}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Tank */}
      <rect
        x={-tankWidth / 2}
        y={-tankHeight / 2}
        width={tankWidth}
        height={tankHeight}
        rx="15"
        fill="none"
        stroke={alarm ? "#dc3545" : "#aaa"}
        strokeWidth="3"
      />

      {/* Liquid */}
      <rect
        x={-tankWidth / 2 + 3}
        y={tankHeight / 2 - liquidHeight}
        width={tankWidth - 6}
        height={liquidHeight}
        fill={liquidColor}
        opacity="0.8"
      />

      {/* Chemical symbol */}
      <text
        x="0"
        y="-5"
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
        fontSize="16"
      >
        ⚗
      </text>

      {/* Level */}
      <text
        x="0"
        y="18"
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
        fontSize="12"
      >
        {level}%
      </text>

      {/* Tag */}
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

      {showStatus && (
        <text
          x="0"
          y={height * 0.62}
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

export default ChemicalTank;
