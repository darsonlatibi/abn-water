// MembraneRO.jsx
import React from "react";

const MembraneRO = ({
  x = 0,
  y = 0,

  width = 160,
  height = 70,

  tag = "RO-101",
  label = "RO MEMBRANE",

  running = true,
  alarm = false,

  permeateFlow = true,

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const color = alarm ? "#dc3545" : running ? "#28a745" : "#6b7280";

  const vesselWidth = width * 0.75;
  const vesselHeight = height * 0.35;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Label */}
      <text
        x="0"
        y={-height * 0.55}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Feed pipe */}
      <line
        x1={-width / 2}
        y1="0"
        x2={-vesselWidth / 2}
        y2="0"
        stroke="#444"
        strokeWidth="4"
      />

      {/* Concentrate outlet */}
      <line
        x1={vesselWidth / 2}
        y1="0"
        x2={width / 2}
        y2="0"
        stroke="#444"
        strokeWidth="4"
      />

      {/* Vessel body */}
      <rect
        x={-vesselWidth / 2}
        y={-vesselHeight / 2}
        width={vesselWidth}
        height={vesselHeight}
        rx={vesselHeight / 2}
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
      </rect>

      {/* Membrane elements */}
      {[...Array(3)].map((_, i) => (
        <circle
          key={i}
          cx={-30 + i * 30}
          cy="0"
          r="10"
          fill="none"
          stroke={running ? "#00bfff" : "#888"}
          strokeWidth="2"
        />
      ))}

      {/* Spiral lines */}
      {[...Array(3)].map((_, i) => (
        <path
          key={i}
          d={`
            M ${-38 + i * 30} -5
            Q ${-30 + i * 30} 0
            ${-38 + i * 30} 5
          `}
          fill="none"
          stroke="#00bfff"
          strokeWidth="1.5"
        />
      ))}

      {/* Permeate branch */}
      <line
        x1="0"
        y1={-vesselHeight / 2}
        x2="0"
        y2={-40}
        stroke="#666"
        strokeWidth="3"
      />

      {/* Permeate arrow */}
      <polygon
        points="-4,-40 0,-48 4,-40"
        fill={permeateFlow ? "#00bfff" : "#666"}
      />

      {/* Support legs */}
      <line
        x1={-40}
        y1={vesselHeight / 2}
        x2={-40}
        y2={vesselHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      <line
        x1={40}
        y1={vesselHeight / 2}
        x2={40}
        y2={vesselHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      {/* Base */}
      <line
        x1={-48}
        y1={vesselHeight / 2 + 12}
        x2={-32}
        y2={vesselHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      <line
        x1={32}
        y1={vesselHeight / 2 + 12}
        x2={48}
        y2={vesselHeight / 2 + 12}
        stroke="#666"
        strokeWidth="3"
      />

      {/* Tag */}
      <text
        x="0"
        y={height * 0.55}
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
          y={height * 0.75}
          textAnchor="middle"
          fill={color}
          fontWeight="bold"
          fontSize={statusSize}
          fontFamily={fontFamily}
        >
          {running ? "RUNNING" : "STOPPED"}
        </text>
      )}
    </g>
  );
};

export default MembraneRO;

{
  /* <MembraneRO
  x={200}
  y={150}
  tag="RO-101"
  label="MEMBRANE BANK A"
  running={true}
/>

<MembraneRO
  x={450}
  y={150}
  tag="RO-102"
  label="MEMBRANE BANK B"
  running={false}
  alarm={true}
/> */
}
