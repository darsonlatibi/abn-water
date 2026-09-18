import React from "react";

const PHMeter = ({
  x = 0,
  y = 0,
  value = 7,
  tag = "PH-101",
  width = 120,
  height = 60,
}) => {
  const safeValue = Number(value) || 0;

  const color =
    safeValue < 6
      ? "#dc3545" // acidic
      : safeValue > 8
        ? "#ffc107" // alkaline warning
        : "#00bfff"; // normal

  const status =
    safeValue < 6 ? "ACIDIC" : safeValue > 8 ? "ALKALINE" : "NORMAL";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* BODY */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="8"
        fill="#0b1220"
        stroke={color}
        strokeWidth="2"
      />

      {/* VALUE */}
      <text
        x={width / 2}
        y={28}
        textAnchor="middle"
        fill={color}
        fontSize="18"
        fontWeight="bold"
      >
        pH {safeValue.toFixed(2)}
      </text>

      {/* STATUS */}
      <text x={width / 2} y={48} textAnchor="middle" fill="#aaa" fontSize="10">
        {status}
      </text>

      {/* TAG */}
      <text
        x={width / 2}
        y={height + 15}
        textAnchor="middle"
        fill="#666"
        fontSize="10"
      >
        {tag}
      </text>
    </g>
  );
};

export default PHMeter;
