import React from "react";

const LevelMeter = ({
  x = 0,
  y = 0,

  width = 40,
  height = 250,

  value = 0,

  min = 0,
  max = 100,

  tag = "LT-101",
  title = "LEVEL",

  unit = "%",

  showScale = true,
}) => {
  const safeValue = Math.max(min, Math.min(max, Number(value) || 0));

  const ratio = (safeValue - min) / (max - min);

  const levelHeight = ratio * height;

  const liquidY = height - levelHeight;

  const levelColor =
    safeValue < 20 ? "#dc3545" : safeValue < 50 ? "#ffc107" : "#00bfff";

  return (
    <g transform={`translate(${x},${y})`}>
      {/* =====================
          TITLE
      ===================== */}

      <text
        x={width / 2}
        y={-20}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="12"
        fontWeight="bold"
      >
        {title}
      </text>

      {/* =====================
          BODY
      ===================== */}

      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="5"
        fill="#071421"
        stroke="#777"
        strokeWidth="2"
      />

      {/* =====================
          LIQUID
      ===================== */}

      <rect
        x="3"
        y={liquidY}
        width={width - 6}
        height={levelHeight}
        fill={levelColor}
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* =====================
          SCALE
      ===================== */}

      {showScale &&
        Array.from({ length: 11 }, (_, i) => {
          const percent = i * 10;

          const yy = height - (percent / 100) * height;

          return (
            <g key={percent}>
              <line
                x1={width}
                y1={yy}
                x2={width + 10}
                y2={yy}
                stroke="#aaa"
                strokeWidth="1"
              />

              <text x={width + 15} y={yy + 4} fill="#aaa" fontSize="10">
                {percent}
              </text>
            </g>
          );
        })}

      {/* =====================
          ALARM LOW
      ===================== */}

      {safeValue < 20 && (
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

      {/* =====================
          VALUE
      ===================== */}

      <text
        x={width / 2}
        y={height + 25}
        textAnchor="middle"
        fill="#00ffff"
        fontSize="12"
        fontWeight="bold"
      >
        {safeValue.toFixed(0)} {unit}
      </text>

      {/* =====================
          TAG
      ===================== */}

      <text
        x={width / 2}
        y={height + 42}
        textAnchor="middle"
        fill="#aaa"
        fontSize="10"
      >
        {tag}
      </text>
    </g>
  );
};

export default LevelMeter;
