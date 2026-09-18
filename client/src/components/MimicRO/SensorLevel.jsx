import React from "react";

const SensorLevel = ({
  x = 0,
  y = 0,
  value = 0,
  width = 20,
  height = 120,
  label = "LT-101",
  minAlarm = 20,
  maxAlarm = 80,
}) => {
  const safeValue = Math.max(0, Math.min(100, value));

  const fillHeight = (safeValue / 100) * height;

  const getColor = () => {
    if (safeValue < minAlarm) return "#dc3545"; // LOW ALARM
    if (safeValue > maxAlarm) return "#ffc107"; // HIGH WARNING
    return "#00bfff"; // NORMAL
  };

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* OUTER FRAME */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />

      {/* LEVEL FILL */}
      <rect
        x="2"
        y={height - fillHeight}
        width={width - 4}
        height={fillHeight}
        fill={getColor()}
      >
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ALARM BLINK LOW */}
      {safeValue < minAlarm && (
        <rect
          x="-4"
          y="-4"
          width={width + 8}
          height={height + 8}
          fill="none"
          stroke="#dc3545"
          strokeWidth="2"
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* ALARM BLINK HIGH */}
      {safeValue > maxAlarm && (
        <rect
          x="-4"
          y="-4"
          width={width + 8}
          height={height + 8}
          fill="none"
          stroke="#ffc107"
          strokeWidth="2"
        >
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* LABEL */}
      <text
        x={width / 2}
        y={-10}
        textAnchor="middle"
        fill="#00ffff"
        fontSize="10"
      >
        {label}
      </text>

      {/* VALUE */}
      <text
        x={width / 2}
        y={height + 15}
        textAnchor="middle"
        fill="#00ffff"
        fontSize="11"
      >
        {safeValue.toFixed(0)}%
      </text>
    </g>
  );
};

export default SensorLevel;
