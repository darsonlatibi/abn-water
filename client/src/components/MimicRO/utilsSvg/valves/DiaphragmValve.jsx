import React from "react";

const DiaphragmValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "DV-101",
  label = "DIAPHRAGM VALVE",

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
  const stemHeight = height * 0.35;
  const domeRadius = height * 0.14;

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
      <rect
        x={-width * 0.12}
        y={-bodyHeight / 2}
        width={width * 0.24}
        height={bodyHeight}
        fill="none"
        stroke={color}
        strokeWidth="3"
        rx="2"
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

      {/* DIAPHRAGM (flexible membrane symbol) */}
      <path
        d={`
          M ${-width * 0.18} 0
          C ${-width * 0.08} ${active ? -8 : -18},
            ${width * 0.08} ${active ? -8 : -18},
            ${width * 0.18} 0
        `}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* DIAPHRAGM PLATE */}
      <line
        x1={-width * 0.1}
        y1={active ? -6 : -bodyHeight / 2}
        x2={width * 0.1}
        y2={active ? -6 : -bodyHeight / 2}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* STEM */}
      <line
        x1="0"
        y1={-bodyHeight / 2}
        x2="0"
        y2={-bodyHeight / 2 - stemHeight}
        stroke="#222"
        strokeWidth="3"
      />

      {/* ACTUATOR / KNOB */}
      <circle
        cx="0"
        cy={-bodyHeight / 2 - stemHeight - domeRadius}
        r={domeRadius}
        fill="none"
        stroke="#222"
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

      {/* ACTUATOR MARK */}
      <line
        x1={-domeRadius}
        y1={-bodyHeight / 2 - stemHeight - domeRadius}
        x2={domeRadius}
        y2={-bodyHeight / 2 - stemHeight - domeRadius}
        stroke="#222"
        strokeWidth="2"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-bodyHeight / 2 - stemHeight - domeRadius * 2 - 12}
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
          {active ? "OPEN" : "CLOSED"}
        </text>
      )}
    </g>
  );
};

export default DiaphragmValve;
