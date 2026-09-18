// PHMeter.jsx
import React from "react";

const PHMeter = ({
  x = 0,
  y = 0,

  width = 90,
  height = 90,

  tag = "PH-101",
  label = "PH",

  value = 7,
  min = 0,
  max = 14,

  unit = "pH",

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const ph = Math.max(min, Math.min(value, max));

  let status = "NORMAL";
  let statusColor = "#28a745";

  // Acidic
  if (ph < 6) {
    status = "ACIDIC";
    statusColor = "#dc3545";
  }

  // Alkaline
  if (ph > 8) {
    status = "ALKALINE";
    statusColor = "#ffc107";
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-height * 0.65}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Meter body */}
      <rect
        x={-width / 2}
        y={-height * 0.25}
        width={width}
        height={height * 0.5}
        rx="10"
        fill="#111"
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
      </rect>

      {/* PH symbol */}
      <circle
        cx="-22"
        cy="0"
        r="10"
        fill="none"
        stroke="#00bfff"
        strokeWidth="2"
      />

      <text
        x="-22"
        y="4"
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize="9"
        fontFamily={fontFamily}
      >
        pH
      </text>

      {/* Value */}
      <text
        x="12"
        y="-4"
        textAnchor="middle"
        fill="#ffffff"
        fontWeight="bold"
        fontSize="13"
        fontFamily={fontFamily}
      >
        {ph.toFixed(2)}
      </text>

      {/* Unit */}
      <text
        x="12"
        y="12"
        textAnchor="middle"
        fill="#00bfff"
        fontSize="10"
        fontFamily={fontFamily}
      >
        {unit}
      </text>

      {/* Tag */}
      <text
        x="0"
        y={height * 0.55}
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
          y={height * 0.8}
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

export default PHMeter;
