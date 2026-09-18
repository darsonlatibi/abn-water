import React from "react";

const TdsMeter = ({
  x = 0,
  y = 0,
  value = 100,
  tag = "TDS-101",
  unit = "ppm",
  width = 120,
  height = 60,
}) => {
  const safeValue = Number(value) || 0;

  const color =
    safeValue < 100 ? "#00bfff" : safeValue < 500 ? "#ffc107" : "#dc3545";

  const status = safeValue < 100 ? "LOW" : safeValue < 500 ? "NORMAL" : "HIGH";

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
        {safeValue.toFixed(0)} {unit}
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

export default TdsMeter;
