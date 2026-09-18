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
  const centerX = x + width / 2;

  const labelX = x - 15;
  const labelY = y + height / 2;

  return (
    <g>
      {/* =====================================================
          VESSEL
      ====================================================== */}

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

      {/* =====================================================
          HIGHLIGHT
      ====================================================== */}

      <rect
        x={x + 10}
        y={y + 10}
        width={12}
        height={height - 20}
        rx={6}
        fill="rgba(255,255,255,0.25)"
      />

      {/* =====================================================
          TOP CAP
      ====================================================== */}

      <ellipse
        cx={centerX}
        cy={y}
        rx={width / 2}
        ry="8"
        fill="rgba(255,255,255,0.15)"
      />

      {/* =====================================================
          BOTTOM CAP
      ====================================================== */}

      <ellipse
        cx={centerX}
        cy={y + height}
        rx={width / 2}
        ry="8"
        fill="rgba(0,0,0,0.2)"
      />

      {/* =====================================================
          LABEL
          LEFT SIDE / VERTICAL UP
      ====================================================== */}

      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        transform={`rotate(-90 ${labelX} ${labelY})`}
      >
        {label}
      </text>
    </g>
  );
};

export default MembraneVertical;
