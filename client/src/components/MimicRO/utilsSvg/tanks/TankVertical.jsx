// TankVertical.jsx
import React from "react";

const TankVertical = ({
  x = 0,
  y = 0,

  width = 80,
  height = 140,

  tag = "TK-101",
  label = "VERTICAL TANK",

  level = 60, // 0-100 %

  alarm = false,

  liquidColor = "#00bfff",

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

      {/* Tank body */}
      <rect
        x={-tankWidth / 2}
        y={-tankHeight / 2}
        width={tankWidth}
        height={tankHeight}
        rx="15"
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
        y={tankHeight / 2 - liquidHeight}
        width={tankWidth - 6}
        height={liquidHeight}
        fill={liquidColor}
        opacity="0.8"
      />

      {/* Liquid surface animation */}
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
          values="1;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Level text */}
      <text
        x="0"
        y="5"
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
        fontSize="12"
        fontFamily={fontFamily}
      >
        {level}%
      </text>

      {/* Inlet nozzle */}
      <line
        x1={-tankWidth / 2 - 12}
        y1={-tankHeight / 4}
        x2={-tankWidth / 2}
        y2={-tankHeight / 4}
        stroke="#666"
        strokeWidth="4"
      />

      {/* Outlet nozzle */}
      <line
        x1={tankWidth / 2}
        y1={tankHeight / 4}
        x2={tankWidth / 2 + 12}
        y2={tankHeight / 4}
        stroke="#666"
        strokeWidth="4"
      />

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

      {/* Status */}
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

export default TankVertical;

{
  /* <TankVertical
  x={200}
  y={150}
  tag="TK-101"
  label="RAW WATER TANK"
  level={75}
/>

<TankVertical
  x={400}
  y={150}
  tag="TK-102"
  label="PRODUCT WATER"
  level={15}
  liquidColor="#4ade80"
/>

<TankVertical
  x={600}
  y={150}
  tag="TK-103"
  label="CHEMICAL TANK"
  level={95}
  alarm={true}
  liquidColor="#f59e0b"
/> */
}
