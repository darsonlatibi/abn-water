// UndergroundTank.jsx
import React from "react";

const UndergroundTank = ({
  x = 0,
  y = 0,

  width = 120,
  height = 80,

  tag = "UTK-101",
  label = "UNDERGROUND TANK",

  level = 60, // 0-100%

  alarm = false,

  liquidColor = "#00bfff",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const tankWidth = width * 0.8;
  const tankHeight = height * 0.4;

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
        y={-height * 0.8}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Ground line */}
      <line
        x1={-width / 2}
        y1={-tankHeight}
        x2={width / 2}
        y2={-tankHeight}
        stroke="#777"
        strokeWidth="3"
      />

      {/* Ground hatch */}
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1={-width / 2 + i * 15}
          y1={-tankHeight}
          x2={-width / 2 + i * 15 + 10}
          y2={-tankHeight + 8}
          stroke="#666"
          strokeWidth="1"
        />
      ))}

      {/* Tank body */}
      <ellipse
        cx="0"
        cy="0"
        rx={tankWidth / 2}
        ry={tankHeight / 2}
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
      </ellipse>

      {/* Liquid */}
      <clipPath id={`${tag}-clip`}>
        <ellipse cx="0" cy="0" rx={tankWidth / 2 - 3} ry={tankHeight / 2 - 3} />
      </clipPath>

      <rect
        x={-tankWidth / 2}
        y={tankHeight / 2 - liquidHeight}
        width={tankWidth}
        height={liquidHeight}
        fill={liquidColor}
        opacity="0.8"
        clipPath={`url(#${tag}-clip)`}
      />

      {/* Liquid surface */}
      <line
        x1={-tankWidth / 2 + 8}
        y1={tankHeight / 2 - liquidHeight}
        x2={tankWidth / 2 - 8}
        y2={tankHeight / 2 - liquidHeight}
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

      {/* Manhole */}
      <line
        x1="0"
        y1={-tankHeight}
        x2="0"
        y2={-tankHeight / 2}
        stroke="#888"
        strokeWidth="3"
      />

      <circle cx="0" cy={-tankHeight} r="6" fill="#333" stroke="#aaa" />

      {/* Inlet */}
      <line
        x1={-tankWidth / 2 - 15}
        y1="0"
        x2={-tankWidth / 2}
        y2="0"
        stroke="#666"
        strokeWidth="4"
      />

      {/* Outlet */}
      <line
        x1={tankWidth / 2}
        y1="0"
        x2={tankWidth / 2 + 15}
        y2="0"
        stroke="#666"
        strokeWidth="4"
      />

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
          y={height * 0.9}
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

export default UndergroundTank;
