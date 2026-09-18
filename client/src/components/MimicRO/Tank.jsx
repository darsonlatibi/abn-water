import React from "react";

const Tank = ({
  x = 0,
  y = 0,
  width = 100,
  height = 180,
  level = 0,
  tag = "LS-101",
  title = "TANK",
}) => {
  const safeLevel = Math.max(0, Math.min(100, Number(level) || 0));

  const fillHeight = (safeLevel / 100) * height;

  const isLowAlarm = safeLevel < 20;

  const fillColor =
    safeLevel < 20 ? "#dc3545" : safeLevel < 50 ? "#ffc107" : "#00bfff";

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* =========================
          OUTER BODY
      ========================= */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#0b1220"
        stroke="#00bfff"
        strokeWidth="2"
        rx="8"
      />

      {/* =========================
          INNER GLASS FRAME
      ========================= */}
      <rect
        x="4"
        y="4"
        width={width - 8}
        height={height - 8}
        fill="none"
        stroke="#1f3b57"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* =========================
          LIQUID LEVEL
      ========================= */}
      <rect
        x="4"
        y={height - fillHeight}
        width={width - 8}
        height={fillHeight}
        fill={fillColor}
      >
        <animate
          attributeName="opacity"
          values="0.85;1;0.85"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* =========================
          SURFACE LINE
      ========================= */}
      {safeLevel > 0 && (
        <line
          x1="4"
          y1={height - fillHeight}
          x2={width - 4}
          y2={height - fillHeight}
          stroke="#ffffff"
          strokeWidth="2"
        >
          <animate
            attributeName="stroke-width"
            values="2;3;2"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =========================
          LOW ALARM BORDER
      ========================= */}
      {isLowAlarm && (
        <rect
          x="-4"
          y="-4"
          width={width + 8}
          height={height + 8}
          fill="none"
          stroke="#dc3545"
          strokeWidth="3"
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =========================
          TITLE
      ========================= */}
      <text
        x={width / 2}
        y={-10}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="12"
        fontWeight="bold"
      >
        {title}
      </text>

      {/* =========================
          TAG
      ========================= */}
      <text
        x={width / 2}
        y={height + 18}
        textAnchor="middle"
        fill="#aaa"
        fontSize="11"
      >
        {tag}
      </text>

      {/* =========================
          VALUE
      ========================= */}
      <text
        x={width / 2}
        y={height + 38}
        textAnchor="middle"
        fill="#00ffff"
        fontSize="12"
        fontWeight="bold"
      >
        {safeLevel.toFixed(0)}%
      </text>
    </g>
  );
};

export default Tank;
