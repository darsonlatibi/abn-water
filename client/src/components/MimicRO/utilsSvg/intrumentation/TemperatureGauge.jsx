// TemperatureGauge.jsx
import React from "react";

const TemperatureGauge = ({
  x = 0,
  y = 0,

  radius = 30,

  tag = "TI-101",
  label = "TEMPERATURE",

  value = 35,
  min = 0,
  max = 100,

  unit = "°C",

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const temperature = Math.max(min, Math.min(value, max));

  // -135° sampai +135°
  const angle = -135 + ((temperature - min) / (max - min)) * 270;

  const needleLength = radius * 0.75;

  const x2 = needleLength * Math.cos((angle * Math.PI) / 180);

  const y2 = needleLength * Math.sin((angle * Math.PI) / 180);

  let status = "NORMAL";
  let statusColor = "#28a745";

  if (temperature <= min + (max - min) * 0.2) {
    status = "LOW";
    statusColor = "#ffc107";
  }

  if (temperature >= min + (max - min) * 0.8) {
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
      <line x1="0" y1="0" x2={x2} y2={y2} stroke="#ff5722" strokeWidth="2.5" />

      {/* Center */}
      <circle cx="0" cy="0" r="4" fill="#ff5722" />

      {/* Value */}
      <text
        x="0"
        y={radius * 0.55}
        textAnchor="middle"
        fill="#ffffff"
        fontWeight="bold"
        fontSize="11"
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

export default TemperatureGauge;

{
  /* <TemperatureGauge
  x={200}
  y={150}
  tag="TI-101"
  label="PRODUCT TEMP"
  value={72}
  min={0}
  max={100}
  unit="°C"
/>; */
}
