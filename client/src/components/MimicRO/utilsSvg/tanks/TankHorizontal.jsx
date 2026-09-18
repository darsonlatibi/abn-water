// TankHorizontal.jsx
import React from "react";

const TankHorizontal = ({
  x = 0,
  y = 0,

  width = 140,
  height = 80,

  tag = "TK-101",
  label = "HORIZONTAL TANK",

  level = 60, // 0-100%

  alarm = false,

  liquidColor = "#00bfff",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const tankWidth = width * 0.7;
  const tankHeight = height * 0.55;

  const liquidWidth = (tankWidth * level) / 100;

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

      {/* Tank body */}
      <rect
        x={-tankWidth / 2}
        y={-tankHeight / 2}
        width={tankWidth}
        height={tankHeight}
        rx={tankHeight / 2}
        fill="none"
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

      {/* Liquid */}
      <rect
        x={-tankWidth / 2 + 3}
        y={-tankHeight / 2 + 3}
        width={liquidWidth}
        height={tankHeight - 6}
        rx={(tankHeight - 6) / 2}
        fill={liquidColor}
        opacity="0.8"
      />

      {/* Liquid surface animation */}
      <line
        x1={-tankWidth / 2 + liquidWidth}
        y1={-tankHeight / 2 + 5}
        x2={-tankWidth / 2 + liquidWidth}
        y2={tankHeight / 2 - 5}
        stroke="#fff"
        strokeWidth="2"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Level text */}
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

      {/* Inlet nozzle */}
      <line
        x1={-tankWidth / 2 - 12}
        y1="0"
        x2={-tankWidth / 2}
        y2="0"
        stroke="#666"
        strokeWidth="4"
      />

      {/* Outlet nozzle */}
      <line
        x1={tankWidth / 2}
        y1="0"
        x2={tankWidth / 2 + 12}
        y2="0"
        stroke="#666"
        strokeWidth="4"
      />

      {/* Support legs */}
      <line
        x1={-tankWidth / 4}
        y1={tankHeight / 2}
        x2={-tankWidth / 4}
        y2={tankHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      <line
        x1={tankWidth / 4}
        y1={tankHeight / 2}
        x2={tankWidth / 4}
        y2={tankHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      {/* Base */}
      <line
        x1={-tankWidth / 4 - 8}
        y1={tankHeight / 2 + 12}
        x2={-tankWidth / 4 + 8}
        y2={tankHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      <line
        x1={tankWidth / 4 - 8}
        y1={tankHeight / 2 + 12}
        x2={tankWidth / 4 + 8}
        y2={tankHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

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
          y={height * 0.72}
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

export default TankHorizontal;

{
  /* <TankHorizontal
  x={200}
  y={120}
  tag="TK-201"
  label="PRODUCT TANK"
  level={78}
/>

<TankHorizontal
  x={450}
  y={120}
  tag="TK-202"
  label="CHEMICAL TANK"
  level={15}
  alarm
  liquidColor="#00ff80"
/> */
}
