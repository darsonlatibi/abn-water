import React from "react";

const MembraneVertical = ({
  x = 0,
  y = 0,
  width = 90,
  height = 220,
  color = "#607d8b",
  label = "MMF-101",
  stroke = "#ccc",
}) => {
  return (
    <g>
      {/* Vessel */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={width / 2}
        fill={color}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Highlight */}
      <rect
        x={x + 10}
        y={y + 10}
        width={12}
        height={height - 20}
        rx={6}
        fill="rgba(255,255,255,0.25)"
      />

      {/* Top Cap */}
      <ellipse
        cx={x + width / 2}
        cy={y}
        rx={width / 2}
        ry="8"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Bottom Cap */}
      <ellipse
        cx={x + width / 2}
        cy={y + height}
        rx={width / 2}
        ry="8"
        fill="rgba(0,0,0,0.2)"
      />

      {/* Label */}
      <text
        x={x + width / 2}
        y={y + height + 30}
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
      >
        {label}
      </text>
    </g>
  );
};

export default MembraneVertical;
