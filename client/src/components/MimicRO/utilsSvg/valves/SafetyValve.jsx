import React from "react";

const SafetyValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "SV-101",
  label = "SAFETY VALVE",

  active = true,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = active ? "#00ff66" : "#666";

  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const pipeLength = width * 0.75;
  const bodyHeight = height * 0.22;
  const springHeight = height * 0.28;
  const arrowSize = height * 0.14;

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
      <line x1={-12} y1="0" x2={12} y2="0" stroke={color} strokeWidth="4">
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {/* SEAT / VALVE BODY */}
      <circle
        cx="0"
        cy="0"
        r={bodyHeight / 2}
        fill="none"
        stroke={color}
        strokeWidth="3"
      />

      {/* SPRING */}
      <polyline
        points={`
          -6,${-bodyHeight / 2}
          6,${-bodyHeight / 2 - 6}
          -6,${-bodyHeight / 2 - 12}
          6,${-bodyHeight / 2 - 18}
          -6,${-bodyHeight / 2 - 24}
        `}
        fill="none"
        stroke="#222"
        strokeWidth="2"
      />

      {/* RELEASE ARROW */}
      <line
        x1="0"
        y1={-bodyHeight / 2 - springHeight}
        x2="0"
        y2={-bodyHeight / 2 - springHeight - arrowSize}
        stroke={color}
        strokeWidth="3"
      />

      <polygon
        points={`
          -6,${-bodyHeight / 2 - springHeight - arrowSize + 8}
          0,${-bodyHeight / 2 - springHeight - arrowSize}
          6,${-bodyHeight / 2 - springHeight - arrowSize + 8}
        `}
        fill={color}
      />

      {/* STEM */}
      <line
        x1="0"
        y1={-bodyHeight / 2}
        x2="0"
        y2={-bodyHeight / 2 - springHeight}
        stroke="#222"
        strokeWidth="3"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-bodyHeight / 2 - springHeight - arrowSize - 12}
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
          {active ? "RELIEVING" : "SAFE"}
        </text>
      )}
    </g>
  );
};

export default SafetyValve;
