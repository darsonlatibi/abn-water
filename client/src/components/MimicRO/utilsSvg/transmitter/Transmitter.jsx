import React from "react";

const Transmitter = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "LT-101",
  label = "TRANSMITTER",

  type = "LT",

  value = 0,
  unit = "",

  alarm = false,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  valueSize = 14,
  unitSize = 10,

  showValue = true,
}) => {
  const radius = Math.min(width, height) * 0.3;

  const color = alarm ? "#dc3545" : "#28a745";

  const getTypeColor = () => {
    switch (type) {
      case "LT":
        return "#3b82f6";

      case "FT":
        return "#06b6d4";

      case "PT":
        return "#f59e0b";

      default:
        return "#64748b";
    }
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* STEM */}
      <line
        x1="0"
        y1={radius}
        x2="0"
        y2={radius + height * 0.15}
        stroke="#666"
        strokeWidth="2"
      />

      {/* BODY */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill="#1e293b"
        stroke={getTypeColor()}
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

      {/* TYPE */}
      <text
        x="0"
        y="-8"
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
        fontSize={radius * 0.45}
        fontFamily={fontFamily}
      >
        {type}
      </text>

      {/* VALUE */}
      {showValue && (
        <>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            fill={color}
            fontWeight="bold"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            {Number(value).toFixed(1)}
          </text>

          <text
            x="0"
            y="24"
            textAnchor="middle"
            fill="#aaa"
            fontSize={unitSize}
            fontFamily={fontFamily}
          >
            {unit}
          </text>
        </>
      )}

      {/* LABEL */}
      <text
        x="0"
        y={-(radius + 15)}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* TAG */}
      <text
        x="0"
        y={radius + 35}
        textAnchor="middle"
        fill="#aaa"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>
    </g>
  );
};

export default Transmitter;

//type="LT" | "FT" | "PT" | "TT" | "AIT" | "pH"
// <Transmitter
//   x={150}
//   y={120}
//   width={80}
//   height={80}
//   tag="LT-101"
//   label="LEVEL"
//   type="LT"
//   value={65}
//   unit="%"
// />

// <Transmitter
//   x={350}
//   y={120}
//   width={80}
//   height={80}
//   tag="FT-101"
//   label="FLOW"
//   type="FT"
//   value={12.5}
//   unit="m³/h"
// />

// <Transmitter
//   x={550}
//   y={120}
//   width={80}
//   height={80}
//   tag="PT-101"
//   label="PRESSURE"
//   type="PT"
//   value={3.2}
//   unit="bar"
// />
