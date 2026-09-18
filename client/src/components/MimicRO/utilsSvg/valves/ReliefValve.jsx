import React from "react";

const ReliefValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "PRV-101",
  label = "RELIEF VALVE",

  active = false,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = active ? "#ffc107" : "#00bfff";

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const pipeLength = width * 0.75;
  const valveHeight = height * 0.18;
  const springHeight = height * 0.18;
  const arrowHeight = height * 0.16;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* PIPE */}
      <line
        x1={-pipeLength / 2}
        y1="0"
        x2={pipeLength / 2}
        y2="0"
        stroke="#444"
        strokeWidth={Math.max(4, width * 0.06)}
      />

      {/* BODY */}
      <line x1="-10" y1="0" x2="10" y2="0" stroke={color} strokeWidth="4" />

      {/* STEM */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={-springHeight}
        stroke="#222"
        strokeWidth="2"
      />

      {/* SPRING */}
      <polyline
        points={`
          -5,${-springHeight + 2}
          5,${-springHeight + 8}
          -5,${-springHeight + 14}
          5,${-springHeight + 20}
        `}
        fill="none"
        stroke="#222"
        strokeWidth="2"
      />

      {/* RELIEF ARROW */}
      <line
        x1="0"
        y1={-springHeight - 5}
        x2="0"
        y2={-springHeight - arrowHeight}
        stroke={color}
        strokeWidth="3"
      />

      <polygon
        points={`
          -6,${-springHeight - arrowHeight + 8}
          0,${-springHeight - arrowHeight}
          6,${-springHeight - arrowHeight + 8}
        `}
        fill={color}
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </polygon>

      {/* LABEL */}
      <text
        x="0"
        y={-springHeight - arrowHeight - 12}
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

      {/* STATUS */}
      {showStatus && (
        <text
          x="0"
          y={height * 0.65}
          textAnchor="middle"
          fill={color}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {active ? "RELIEF" : "NORMAL"}
        </text>
      )}
    </g>
  );
};

export default ReliefValve;
