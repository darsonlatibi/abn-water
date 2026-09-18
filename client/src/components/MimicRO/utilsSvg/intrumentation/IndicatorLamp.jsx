import React from "react";

const IndicatorLamp = ({
  x = 0,
  y = 0,

  radius = 10,

  tag = "L-101",
  label = "LAMP",

  status = "OFF", // ON | OFF | ALARM | BLINK

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 10,

  showLabel = true,
  showTag = true,
}) => {
  let fill = "#333";
  let stroke = "#666";
  let blink = false;

  if (status === "ON") {
    fill = "#28a745";
    stroke = "#1e7e34";
  }

  if (status === "OFF") {
    fill = "#2b2b2b";
    stroke = "#555";
  }

  if (status === "ALARM") {
    fill = "#dc3545";
    stroke = "#a71d2a";
    blink = true;
  }

  if (status === "BLINK") {
    fill = "#ffc107";
    stroke = "#d39e00";
    blink = true;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      {showLabel && (
        <text
          x="0"
          y={-radius * 2}
          textAnchor="middle"
          fill="#00bfff"
          fontWeight="bold"
          fontSize={labelSize}
          fontFamily={fontFamily}
        >
          {label}
        </text>
      )}

      {/* Lamp body */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      >
        {blink && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Inner glow */}
      <circle cx="0" cy="0" r={radius * 0.5} fill="rgba(255,255,255,0.15)" />

      {/* Tag */}
      {showTag && (
        <text
          x="0"
          y={radius * 2.2}
          textAnchor="middle"
          fill="#aaa"
          fontSize={tagSize}
          fontFamily={fontFamily}
        >
          {tag}
        </text>
      )}
    </g>
  );
};

export default IndicatorLamp;
