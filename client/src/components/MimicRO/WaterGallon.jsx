import React from "react";

const WaterGallon = ({ x = 0, y = 0, w = 90, h = 120, label = "19 L" }) => {
  const sx = w / 100;
  const sy = h / 140;

  return (
    <g transform={`translate(${x},${y}) scale(${sx},${sy})`}>
      <rect x="40" y="5" width="20" height="10" rx="2" fill="#1976d2" />

      <rect x="35" y="15" width="30" height="15" rx="4" fill="#64b5f6" />

      <path
        d="
          M25 30
          L20 45
          L15 110
          Q15 130 35 130
          L65 130
          Q85 130 85 110
          L80 45
          L75 30
          Z
        "
        fill="#90caf9"
        fillOpacity="0.45"
        stroke="#1e88e5"
        strokeWidth="2"
      />

      <path
        d="M30 40 Q25 70 30 110"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        opacity="0.6"
      />

      <rect x="28" y="70" width="44" height="22" rx="4" fill="#1976d2" />

      <text
        x="50"
        y="84"
        textAnchor="middle"
        fill="#fff"
        fontSize="10"
        fontWeight="bold"
      >
        {label}
      </text>
    </g>
  );
};

export default WaterGallon;
