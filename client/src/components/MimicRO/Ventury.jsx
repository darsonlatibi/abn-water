import React from "react";

const Ventury = ({
  x = 0,
  y = 0,

  // ukuran dinamis
  width = 120,
  height = 40,
  throat = 20,

  direction = "right",

  active = true,

  label = "VENT-101",

  color = "#cfd8dc",
  flowColor = "#00bfff",

  fontScale = 0.22,
  minFontSize = 10,
  maxFontSize = 24,
}) => {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const fontSize = Math.min(
    maxFontSize,
    Math.max(minFontSize, Math.min(width, height) * fontScale),
  );

  const h = height / 2;
  const t = throat / 2;

  return (
    <g transform={`translate(${x},${y})`}>
      <g transform={`rotate(${rotation})`}>
        {/* BODY */}
        <path
          d={`
        M 0 ${-h}
        L ${width * 0.35} ${-h}
        L ${width * 0.5} ${-t}
        L ${width * 0.65} ${-h}
        L ${width} ${-h}

        L ${width} ${h}
        L ${width * 0.65} ${h}
        L ${width * 0.5} ${t}
        L ${width * 0.35} ${h}
        L 0 ${h}
        Z
      `}
          fill="#1e293b"
          stroke={color}
          strokeWidth="2"
        />

        {/* FLOW */}
        {active && (
          <line
            x1={10}
            y1={0}
            x2={width - 10}
            y2={0}
            stroke={flowColor}
            strokeWidth={Math.max(2, height * 0.12)}
            strokeDasharray="10 6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
        )}

        {/* THROAT */}
        <line
          x1={width / 2}
          y1={-t}
          x2={width / 2}
          y2={t}
          stroke="#ffc107"
          strokeWidth="2"
        />

        {/* ================= LABEL (DI DALAM BODY) ================= */}
        <text
          x={width * 0.5}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#00ffff"
          fontSize={fontSize}
          fontWeight="bold"
          opacity="0.9"
        >
          {label}
        </text>
      </g>

      {/* STATUS LED (tetap luar supaya tidak ikut rotate) */}
      {/* <circle
        cx={width - 5}
        cy={-(height / 2 + 10)}
        r={Math.max(4, height * 0.12)}
        fill={active ? "#00ff00" : "#ff1744"}
      >
        {active && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </circle> */}
    </g>
  );
};

export default Ventury;
