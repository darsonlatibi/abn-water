import React from "react";

const PressureTransmitter = ({
  x = 0,
  y = 0,
  value = 0,
  label = "PT-101",
  unit = "bar",
  alarmHigh = 10,
  alarmLow = 2,
}) => {
  let color = "#00ffff";

  if (value >= alarmHigh) color = "#ff4444";
  else if (value <= alarmLow) color = "#ffc107";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Body */}
      <circle cx="0" cy="0" r="28" fill="#111" stroke={color} strokeWidth="3" />

      {/* Instrument Line */}
      <line x1="0" y1="28" x2="0" y2="60" stroke="#cfd8dc" strokeWidth="4" />

      {/* Label */}
      <text
        x="0"
        y="-40"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="14"
        fontWeight="bold"
      >
        {label}
      </text>

      {/* Value */}
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill={color}
        fontSize="12"
        fontWeight="bold"
      >
        {value}
      </text>

      <text x="0" y="18" textAnchor="middle" fill="#9e9e9e" fontSize="9">
        {unit}
      </text>

      {/* Alarm Blink */}
      {(value >= alarmHigh || value <= alarmLow) && (
        <circle cx="0" cy="0" r="32" fill="none" stroke={color} strokeWidth="2">
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </g>
  );
};

export default PressureTransmitter;
