// FlowMeter.jsx
import React from "react";

const FlowMeter = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "FI-101",
  label = "FLOW",

  value = 12.5,
  min = 0,
  max = 100,

  unit = "m³/h",

  running = true,
  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  let status = "NORMAL";
  let statusColor = "#28a745";

  if (value <= min + (max - min) * 0.1) {
    status = "LOW";
    statusColor = "#ffc107";
  }

  if (value >= min + (max - min) * 0.9) {
    status = "HIGH";
    statusColor = "#dc3545";
  }

  const bodyColor = alarm ? "#dc3545" : running ? "#28a745" : "#888";

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-height * 0.7}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Pipe inlet */}
      <line
        x1={-width / 2}
        y1="0"
        x2={-18}
        y2="0"
        stroke="#666"
        strokeWidth="5"
      />

      {/* Pipe outlet */}
      <line
        x1="18"
        y1="0"
        x2={width / 2}
        y2="0"
        stroke="#666"
        strokeWidth="5"
      />

      {/* Meter body */}
      <circle
        cx="0"
        cy="0"
        r="18"
        fill="#111"
        stroke={bodyColor}
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

      {/* Flow arrow */}
      <polygon points="-6,-5 6,0 -6,5" fill={running ? "#00bfff" : "#888"}>
        {running && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-2 0;2 0;-2 0"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </polygon>

      {/* Value */}
      <text
        x="0"
        y={height * 0.45}
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
        y={height * 0.7}
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
          y={height * 0.95}
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

export default FlowMeter;

{
  /* <FlowMeter
  x={100}
  y={100}
  tag="FI-101"
  label="RAW WATER FLOW"
  value={18.7}
  unit="m³/h"
  running={true}
/>

<FlowMeter
  x={250}
  y={100}
  tag="FIT-102"
  label="PRODUCT FLOW"
  value={95}
  max={100}
  unit="m³/h"
  alarm={true}
/> */
}
