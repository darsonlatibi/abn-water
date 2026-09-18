// ConductivityMeter.jsx
import React from "react";

const ConductivityMeter = ({
  x = 0,
  y = 0,

  width = 90,
  height = 90,

  tag = "CI-101",
  label = "CONDUCTIVITY",

  value = 850,
  min = 0,
  max = 2000,

  unit = "µS/cm",

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const conductivity = Math.max(min, Math.min(value, max));

  let status = "NORMAL";
  let statusColor = "#28a745";

  if (conductivity <= min + (max - min) * 0.2) {
    status = "LOW";
    statusColor = "#ffc107";
  }

  if (conductivity >= min + (max - min) * 0.8) {
    status = "HIGH";
    statusColor = "#dc3545";
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

      {/* EC symbol */}
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
        EC
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
        {value}
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

export default ConductivityMeter;

{
  /* <ConductivityMeter
  x={100}
  y={100}
  tag="CI-101"
  label="RO PERMEATE EC"
  value={18}
  min={0}
  max={100}
  unit="µS/cm"
/>

<ConductivityMeter
  x={250}
  y={100}
  tag="CI-102"
  label="RAW WATER EC"
  value={950}
  min={0}
  max={2000}
  unit="µS/cm"
/>

<ConductivityMeter
  x={400}
  y={100}
  tag="CI-103"
  label="PRODUCT WATER EC"
  value={5}
  min={0}
  max={50}
  unit="µS/cm"
  alarm
/> */
}
