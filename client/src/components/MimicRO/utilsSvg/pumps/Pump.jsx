import React from "react";

const Pump = ({
  x = 0,
  y = 0,

  width = 90,
  height = 70,

  tag = "P-101",
  label = "PUMP",

  running = false,
  alarm = false,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const rotationMap = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  const rotation = rotationMap[direction] ?? 0;

  const color = alarm ? "#dc3545" : running ? "#28a745" : "#6b7280";

  const pipeLength = width * 0.8;
  const bodyRadius = width * 0.18;
  const motorWidth = width * 0.25;
  const motorHeight = height * 0.28;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* PIPE (FIX: no arrow effect anymore) */}
      <rect
        x={-pipeLength / 2}
        y={-2.5}
        width={pipeLength}
        height={5}
        fill="#444"
        shapeRendering="crispEdges"
      />

      {/* PUMP BODY */}
      <g>
        <circle
          cx={0}
          cy={0}
          r={bodyRadius}
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

        {/* IMPELLER */}
        <g>
          <path
            d="M -6 0 L 0 -6 L 6 0 L 0 6 Z"
            fill={running ? "#00bfff" : "#888"}
          >
            {running && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="0.8s"
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>
      </g>

      {/* MOTOR */}
      <rect
        x={bodyRadius}
        y={-motorHeight / 2}
        width={motorWidth}
        height={motorHeight}
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />

      {/* COUPLING */}
      <line
        x1={bodyRadius}
        y1="0"
        x2={bodyRadius + 6}
        y2="0"
        stroke={color}
        strokeWidth="3"
      />

      {/* LABEL */}
      <text
        x="0"
        y={-height * 0.45}
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
          fill={running ? "#28a745" : "#888"}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {running ? "RUNNING" : "STOPPED"}
        </text>
      )}
    </g>
  );
};

export default Pump;

{
  /* <Pump
  x={100}
  y={100}
  tag="P-101"
  label="FEED PUMP"
  running={true}
/>

<Pump
  x={250}
  y={100}
  tag="P-102"
  label="HP PUMP"
  running={false}
/>

<Pump
  x={400}
  y={100}
  tag="P-103"
  label="DOSING PUMP"
  alarm={true}
/> */
}
