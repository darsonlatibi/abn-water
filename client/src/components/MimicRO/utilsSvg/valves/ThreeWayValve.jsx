import React from "react";

const ThreeWayValve = ({
  x = 0,
  y = 0,

  width = 90,
  height = 90,

  tag = "3WV-101",
  label = "3 WAY VALVE",

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
  const bodySize = height * 0.22;
  const stemHeight = height * 0.35;

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

      {/* VALVE BODY (central junction) */}
      <circle
        cx="0"
        cy="0"
        r={bodySize}
        fill="none"
        stroke={color}
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

      {/* FLOW PATH 1 (left-right) */}
      <line
        x1={-bodySize}
        y1="0"
        x2={bodySize}
        y2="0"
        stroke={color}
        strokeWidth="4"
      />

      {/* FLOW PATH 2 (top-down) */}
      <line
        x1="0"
        y1={-bodySize}
        x2="0"
        y2={bodySize}
        stroke={color}
        strokeWidth="4"
      />

      {/* SELECTED FLOW INDICATOR */}
      {active ? (
        <>
          {/* horizontal active path */}
          <line
            x1={-bodySize}
            y1="0"
            x2={bodySize}
            y2="0"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          {/* vertical closed path */}
          <line
            x1="0"
            y1={-bodySize}
            x2="0"
            y2={bodySize}
            stroke="#666"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      )}

      {/* STEM */}
      <line
        x1="0"
        y1={-bodySize}
        x2="0"
        y2={-bodySize - stemHeight}
        stroke="#222"
        strokeWidth="3"
      />

      {/* HANDLE */}
      <line
        x1="-10"
        y1={-bodySize - stemHeight}
        x2="10"
        y2={-bodySize - stemHeight}
        stroke="#222"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-bodySize - stemHeight - 14}
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
          fill={active ? "#00ff66" : "#666"}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {active ? "FLOW A-B" : "FLOW A-C"}
        </text>
      )}
    </g>
  );
};

export default ThreeWayValve;
