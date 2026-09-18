import React from "react";

const TT = ({
  x = 0,
  y = 0,
  width = 180,
  height = 70,
  tag = "TT-101",
  value = 25,
  unit = "°C",
  alarmHigh = 50,
  alarmLow = 5,
}) => {
  const isAlarm = value >= alarmHigh || value <= alarmLow;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PANEL */}
      <rect
        width={width}
        height={height}
        rx="10"
        fill="#111"
        stroke={isAlarm ? "#ff1744" : "#00ffff"}
        strokeWidth="2"
      >
        {isAlarm && (
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* TAG */}
      <text
        x={width / 2}
        y="28"
        fill="#00ffff"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
      >
        {tag}
      </text>

      {/* VALUE */}
      <text
        x={width / 2}
        y="55"
        fill={isAlarm ? "#ff5252" : "#00ffff"}
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
      >
        {value} {unit}
      </text>

      {/* STATUS LED */}
      <circle
        cx={width - 15}
        cy={15}
        r="5"
        fill={isAlarm ? "#ff1744" : "#00ff00"}
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
};

export default TT;
