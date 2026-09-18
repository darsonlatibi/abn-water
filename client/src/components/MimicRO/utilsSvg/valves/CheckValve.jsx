import React from "react";

const CheckValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "NRV-101",
  label = "CHECK VALVE",

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
}) => {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const pipeLength = width * 0.75;

  const valveLength = width * 0.22;
  const valveHeight = height * 0.18;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* PIPE LEFT */}
      <line
        x1={-pipeLength / 2}
        y1="0"
        x2={-valveLength}
        y2="0"
        stroke="#444"
        strokeWidth={Math.max(4, width * 0.06)}
      />

      {/* PIPE RIGHT */}
      <line
        x1={valveLength}
        y1="0"
        x2={pipeLength / 2}
        y2="0"
        stroke="#444"
        strokeWidth={Math.max(4, width * 0.06)}
      />

      {/* ARROW */}
      <polygon
        points={`
          ${-valveLength},${-valveHeight}
          ${valveLength * 0.5},0
          ${-valveLength},${valveHeight}
        `}
        fill="#00bfff"
        stroke="#222"
        strokeWidth="2"
      />

      {/* SEAT */}
      <line
        x1={valveLength * 0.6}
        y1={-valveHeight}
        x2={valveLength * 0.6}
        y2={valveHeight}
        stroke="#222"
        strokeWidth="3"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-valveHeight - 12}
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
        y={height * 0.45}
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

export default CheckValve;
