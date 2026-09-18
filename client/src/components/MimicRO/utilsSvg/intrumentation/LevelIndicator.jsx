// LevelIndicator.jsx
import React from "react";

const LevelIndicator = ({
  x = 0,
  y = 0,

  width = 50,
  height = 100,

  tag = "LI-101",
  label = "LEVEL",

  value = 60,
  min = 0,
  max = 100,

  unit = "%",

  liquidColor = "#00bfff",

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const level = Math.max(min, Math.min(value, max));

  const percent = ((level - min) / (max - min)) * 100;

  const liquidHeight = (height * 0.7 * percent) / 100;

  let status = "NORMAL";
  let statusColor = "#28a745";

  if (percent <= 20) {
    status = "LOW";
    statusColor = "#ffc107";
  }

  if (percent >= 90) {
    status = "HIGH";
    statusColor = "#dc3545";
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-height * 0.6}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Indicator body */}
      <rect
        x={-width / 4}
        y={-height * 0.35}
        width={width / 2}
        height={height * 0.7}
        rx="8"
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

      {/* Liquid */}
      <rect
        x={-width / 4 + 3}
        y={height * 0.35 - liquidHeight}
        width={width / 2 - 6}
        height={liquidHeight}
        rx="5"
        fill={liquidColor}
        opacity="0.8"
      />

      {/* Surface animation */}
      <line
        x1={-width / 4 + 4}
        y1={height * 0.35 - liquidHeight}
        x2={width / 4 - 4}
        y2={height * 0.35 - liquidHeight}
        stroke="#ffffff"
        strokeWidth="2"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Scale marks */}
      {[0, 25, 50, 75, 100].map((v) => {
        const yy = height * 0.35 - (v / 100) * height * 0.7;

        return (
          <line
            key={v}
            x1={width / 4 + 3}
            y1={yy}
            x2={width / 4 + 10}
            y2={yy}
            stroke="#fff"
            strokeWidth="1"
          />
        );
      })}

      {/* Value */}
      <text
        x="0"
        y="5"
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
        y={height * 0.65}
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

export default LevelIndicator;

{
  /* <LevelIndicator
  x={100}
  y={100}
  tag="LI-101"
  label="RAW WATER LEVEL"
  value={72}
/>

<LevelIndicator
  x={200}
  y={100}
  tag="LIT-102"
  label="CHEMICAL LEVEL"
  value={18}
  liquidColor="#ff9800"
/>

<LevelIndicator
  x={300}
  y={100}
  tag="LI-103"
  label="PRODUCT LEVEL"
  value={95}
  alarm={true}
/> */
}
