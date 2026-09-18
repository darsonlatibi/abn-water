// CausticDosing.jsx
import React from "react";

const CausticDosing = ({
  x = 0,
  y = 0,

  width = 90,
  height = 90,

  tag = "D-102",
  label = "CAUSTIC DOSING",

  running = true,
  alarm = false,
  level = 80,

  direction = "right",

  fontFamily = "Arial",

  labelSize = 11,
  tagSize = 11,
  statusSize = 10,

  showStatus = true,
}) => {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  const color = alarm ? "#dc3545" : running ? "#28a745" : "#888";

  const status = alarm ? "ALARM" : running ? "RUNNING" : "STOP";

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      {/* Label */}
      <text
        x="0"
        y="-45"
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize={labelSize}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* Pipe */}
      <line x1="-40" y1="0" x2="40" y2="0" stroke="#444" strokeWidth="5" />

      {/* Chemical Tank */}
      <rect
        x="-30"
        y="-20"
        width="20"
        height="40"
        rx="3"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />

      {/* Caustic Level */}
      <rect
        x="-30"
        y={20 - (level / 100) * 40}
        width="20"
        height={(level / 100) * 40}
        fill="#00ccff"
      />

      {/* Dosing Pump */}
      <circle cx="10" cy="0" r="14" fill="#111" stroke={color} strokeWidth="3">
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Pump Impeller */}
      <polygon points="-4,-4 6,0 -4,4" fill="#00bfff">
        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 10 0"
            to="360 10 0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </polygon>

      {/* Injection Line */}
      <line x1="24" y1="0" x2="40" y2="0" stroke="#00bfff" strokeWidth="3" />

      {/* Chemical Symbol */}
      <text
        x="-20"
        y="5"
        textAnchor="middle"
        fill="#00ccff"
        fontWeight="bold"
        fontSize="9"
        fontFamily={fontFamily}
      >
        OH-
      </text>

      {/* Tag */}
      <text
        x="0"
        y="55"
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
          y="70"
          textAnchor="middle"
          fill={color}
          fontWeight="bold"
          fontSize={statusSize}
          fontFamily={fontFamily}
        >
          {status}
        </text>
      )}
    </g>
  );
};

export default CausticDosing;
