// PressureGauge.jsx
import React from "react";

const PressureGauge = ({
  x = 0,
  y = 0,

  radius = 30,

  tag = "PI-101",
  label = "PRESSURE",

  value = 4.5,
  min = 0,
  max = 10,

  unit = "bar",

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  // Clamp value
  const pressure = Math.max(min, Math.min(value, max));

  // Convert value to angle (-135° sampai +135°)
  const angle = -135 + ((pressure - min) / (max - min)) * 270;

  const needleLength = radius * 0.75;

  const x2 = needleLength * Math.cos((angle * Math.PI) / 180);
  const y2 = needleLength * Math.sin((angle * Math.PI) / 180);

  let status = "NORMAL";
  let statusColor = "#28a745";

  if (pressure <= min + (max - min) * 0.2) {
    status = "LOW";
    statusColor = "#ffc107";
  }

  if (pressure >= min + (max - min) * 0.9) {
    status = "HIGH";
    statusColor = "#dc3545";
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-radius * 1.8}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Gauge body */}
      <circle
        cx="0"
        cy="0"
        r={radius}
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
      </circle>

      {/* Tick marks */}
      {[...Array(7)].map((_, i) => {
        const a = ((-135 + i * 45) * Math.PI) / 180;

        const x1 = (radius - 8) * Math.cos(a);
        const y1 = (radius - 8) * Math.sin(a);

        const x2 = radius * Math.cos(a);
        const y2 = radius * Math.sin(a);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fff"
            strokeWidth="2"
          />
        );
      })}

      {/* Needle */}
      <line x1="0" y1="0" x2={x2} y2={y2} stroke="#ff3b30" strokeWidth="2.5" />

      {/* Center */}
      <circle cx="0" cy="0" r="4" fill="#ff3b30" />

      {/* Value */}
      <text
        x="0"
        y={radius * 0.55}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="11"
        fontWeight="bold"
        fontFamily={fontFamily}
      >
        {value} {unit}
      </text>

      {/* Tag */}
      <text
        x="0"
        y={radius * 1.8}
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
          y={radius * 2.3}
          textAnchor="middle"
          fill={statusColor}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {status}
        </text>
      )}
    </g>
  );
};

export default PressureGauge;

{
  /* <PressureGauge
  x={100}
  y={100}
  tag="PI-101"
  label="FEED PRESSURE"
  value={6.8}
  min={0}
  max={10}
  unit="bar"
/>

<PressureGauge
  x={250}
  y={100}
  tag="PI-102"
  label="HIGH PRESSURE"
  value={18}
  min={0}
  max={20}
  unit="bar"
  alarm={true}
/> */
}
