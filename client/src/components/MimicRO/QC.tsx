import React from "react";

interface QCProps {
  x?: number;
  y?: number;

  value?: number;

  tag?: string;

  unit?: string;

  width?: number;
  height?: number;
}

const QC: React.FC<QCProps> = ({
  x = 0,
  y = 0,

  value = 100,

  tag = "QC-101",

  unit = "%",

  width = 120,
  height = 60,
}) => {
  // =========================
  // VALUE SAFETY
  // =========================
  const numericValue = Number(value);

  const safeValue = Number.isFinite(numericValue)
    ? Math.max(0, Math.min(100, numericValue))
    : 0;

  // =========================
  // QUALITY STATUS
  // =========================
  const status = safeValue >= 80 ? "GOOD" : safeValue >= 50 ? "WARNING" : "BAD";

  // =========================
  // COLOR
  // =========================
  const color =
    safeValue >= 80 ? "#00bfff" : safeValue >= 50 ? "#ffc107" : "#dc3545";

  // =========================
  // PROGRESS BAR
  // =========================
  const barWidth = (width - 20) * (safeValue / 100);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* =========================
          BODY
      ========================= */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={8}
        fill="#0b1220"
        stroke={color}
        strokeWidth={2}
      />

      {/* =========================
          VALUE
      ========================= */}
      <text
        x={width / 2}
        y={24}
        textAnchor="middle"
        fill={color}
        fontSize={17}
        fontWeight="bold"
      >
        {safeValue.toFixed(0)} {unit}
      </text>

      {/* =========================
          QUALITY BAR
      ========================= */}
      <rect x={10} y={32} width={width - 20} height={7} rx={3} fill="#1f2937" />

      <rect x={10} y={32} width={barWidth} height={7} rx={3} fill={color} />

      {/* =========================
          STATUS
      ========================= */}
      <text
        x={width / 2}
        y={54}
        textAnchor="middle"
        fill="#aaa"
        fontSize={10}
        fontWeight="bold"
      >
        {status}
      </text>

      {/* =========================
          TAG
      ========================= */}
      <text
        x={width / 2}
        y={height + 15}
        textAnchor="middle"
        fill="#666"
        fontSize={10}
      >
        {tag}
      </text>
    </g>
  );
};

export default QC;
