import React from "react";

const ButterflyValve = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  tag = "BFV-101",
  label = "BUTTERFLY VALVE",

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
  const radius = height * 0.18;
  const handleHeight = height * 0.22;

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
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
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

      {/* DISC */}
      <line
        x1={active ? -radius * 0.7 : 0}
        y1={active ? radius * 0.7 : -radius}
        x2={active ? radius * 0.7 : 0}
        y2={active ? -radius * 0.7 : radius}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* STEM */}
      <line
        x1="0"
        y1={-radius}
        x2="0"
        y2={-radius - handleHeight}
        stroke="#222"
        strokeWidth="3"
      />

      {/* HANDLE */}
      <line
        x1="-10"
        y1={-radius - handleHeight}
        x2="10"
        y2={-radius - handleHeight}
        stroke="#222"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-radius - handleHeight - 12}
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

export default ButterflyValve;

//
{
  /* <ButterflyValve
  x={150}
  y={100}
  tag="BFV-201"
  label="BUTTERFLY VALVE"
  active={true}
/>

<ButterflyValve
  x={300}
  y={100}
  tag="BFV-202"
  active={false}
  direction="down"
  alarm={true}
/> */
}
