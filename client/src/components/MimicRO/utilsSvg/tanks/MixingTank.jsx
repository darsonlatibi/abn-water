// MixingTank.jsx
import React from "react";

const MixingTank = ({
  x = 0,
  y = 0,

  width = 90,
  height = 150,

  tag = "MX-101",
  label = "MIXING TANK",

  level = 60,

  running = false,
  alarm = false,

  liquidColor = "#00bfff",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const tankWidth = width * 0.65;
  const tankHeight = height * 0.7;

  const liquidHeight = (tankHeight * level) / 100;

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

      {/* Shaft */}
      <line
        x1="0"
        y1={-tankHeight / 2 - 15}
        x2="0"
        y2="5"
        stroke="#ccc"
        strokeWidth="3"
      />

      {/* Impeller */}
      <g>
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#ccc" strokeWidth="3" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#ccc" strokeWidth="3" />

        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* Motor */}
      <rect
        x="-10"
        y={-tankHeight / 2 - 30}
        width="20"
        height="15"
        rx="3"
        fill="none"
        stroke="#aaa"
        strokeWidth="2"
      />

      {/* Level */}
      <text
        x="0"
        y="25"
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
        y={height * 0.48}
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
          y={height * 0.65}
          textAnchor="middle"
          fill={running ? "#28a745" : "#888"}
          fontWeight="bold"
          fontSize={statusSize}
          fontFamily={fontFamily}
        >
          {running ? "MIXING" : "STOPPED"}
        </text>
      )}
    </g>
  );
};

export default MixingTank;
