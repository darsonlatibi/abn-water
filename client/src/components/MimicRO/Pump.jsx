import React from "react";

const Pump = ({
  x = 0,
  y = 0,

  width = 180,
  height = 140,

  tag = "P-101",

  running = false,
  fault = false,

  runtime = 0,
  frequency = 50,
  current = 0,

  direction = "right", // 🔥 NEW: LEFT / RIGHT

  fontFamily = "Arial",

  tagSize = 12,
  statusSize = 11,
  valueSize = 10,
  isdetail = true,
  sendCommand,
}) => {
  const bodyColor = fault ? "#dc3545" : running ? "#28a745" : "#6c757d";

  const pumpRadius = width * 0.2;

  const motorWidth = width * 0.22;
  const motorHeight = height * 0.28;

  const suctionLength = width * 0.3;
  const dischargeLength = width * 0.3;

  const pipeWidth = Math.max(4, width * 0.04);

  const isLeft = direction === "left";

  return (
    <g transform={`translate(${x},${y}) ${isLeft ? "scale(-1,1)" : ""}`}>
      {/* MOTOR */}
      <rect
        x={-pumpRadius - motorWidth - 10}
        y={-motorHeight / 2}
        width={motorWidth}
        height={motorHeight}
        rx="4"
        fill="#495057"
        stroke="#222"
      />

      {/* PUMP BODY */}
      <circle
        cx="0"
        cy="0"
        r={pumpRadius}
        fill={bodyColor}
        stroke="#222"
        strokeWidth="3"
      >
        {fault && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* IMPELLER */}
      <g>
        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}

        <path
          d={`M0,${-pumpRadius * 0.6} L${pumpRadius * 0.25},${-pumpRadius * 0.15} L0,0 L${-pumpRadius * 0.25},${-pumpRadius * 0.15} Z`}
          fill="#fff"
        />
        <path
          d={`M${pumpRadius * 0.6},0 L${pumpRadius * 0.15},${pumpRadius * 0.25} L0,0 L${pumpRadius * 0.15},${-pumpRadius * 0.25} Z`}
          fill="#fff"
        />
        <path
          d={`M0,${pumpRadius * 0.6} L${pumpRadius * 0.25},${pumpRadius * 0.15} L0,0 L${-pumpRadius * 0.25},${pumpRadius * 0.15} Z`}
          fill="#fff"
        />
        <path
          d={`M${-pumpRadius * 0.6},0 L${-pumpRadius * 0.15},${-pumpRadius * 0.25} L0,0 L${-pumpRadius * 0.15},${pumpRadius * 0.25} Z`}
          fill="#fff"
        />
      </g>

      {/* SUCTION PIPE */}
      <line
        x1={-pumpRadius - suctionLength}
        y1="0"
        x2={-pumpRadius}
        y2="0"
        stroke="#00bfff"
        strokeWidth={pipeWidth}
      />

      {/* SUCTION FLOW ARROW */}
      <polygon points="-70,-6 -60,0 -70,6" fill="#00bfff" />

      {/* DISCHARGE PIPE */}
      <line
        x1={pumpRadius}
        y1="0"
        x2={pumpRadius + dischargeLength}
        y2="0"
        stroke="#00bfff"
        strokeWidth={pipeWidth}
      />

      {/* DISCHARGE FLOW ARROW */}
      <polygon points="70,-6 60,0 70,6" fill="#00bfff" />

      {/* TAG */}
      <text
        x="0"
        y={pumpRadius + 25}
        textAnchor="middle"
        fill="#00ffff"
        fontWeight="bold"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      {/* DETAIL */}
      {isdetail && (
        <>
          <text
            x="0"
            y={pumpRadius + 42}
            textAnchor="middle"
            fill={bodyColor}
            fontWeight="bold"
            fontSize={statusSize}
          >
            {fault ? "FAULT" : running ? "RUNNING" : "STOP"}
          </text>

          <text
            x="0"
            y={pumpRadius + 58}
            textAnchor="middle"
            fill="#fff"
            fontSize={valueSize}
          >
            RT {runtime} h
          </text>

          <text
            x="0"
            y={pumpRadius + 74}
            textAnchor="middle"
            fill="#ffc107"
            fontSize={valueSize}
          >
            {frequency} Hz
          </text>

          <text
            x="0"
            y={pumpRadius + 90}
            textAnchor="middle"
            fill="#00bfff"
            fontSize={valueSize}
          >
            {current} A
          </text>
        </>
      )}
    </g>
  );
};

export default Pump;
