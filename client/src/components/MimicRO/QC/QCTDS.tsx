import React from "react";

/* =========================================================
 * QCTDS PROPS
 * ========================================================= */

export interface QCTDSProps {
  /* -------------------------------------------------------
   * POSITION
   * ------------------------------------------------------- */

  x?: number;
  y?: number;

  /* -------------------------------------------------------
   * SIZE
   * ------------------------------------------------------- */

  width?: number;
  height?: number;

  /* -------------------------------------------------------
   * RANGE
   * ------------------------------------------------------- */

  min?: number;
  max?: number;
  value?: number;

  /* -------------------------------------------------------
   * TITLE
   * ------------------------------------------------------- */

  title?: string;

  /* -------------------------------------------------------
   * FONT
   * ------------------------------------------------------- */

  fontFamily?: string;

  titleFontSize?: number;
  valueFontSize?: number;
  statusFontSize?: number;

  titleFontWeight?: string | number;
  statusFontWeight?: string | number;

  /* -------------------------------------------------------
   * COLORS
   * ------------------------------------------------------- */

  titleColor?: string;
  valueColor?: string;
  statusColor?: string;

  backgroundColor?: string;
  borderColor?: string;
  markerColor?: string;

  /* -------------------------------------------------------
   * CURSOR
   * ------------------------------------------------------- */

  cursor?: React.CSSProperties["cursor"];

  /* -------------------------------------------------------
   * CALLBACK
   * ------------------------------------------------------- */

  onValueChange?: (value: number) => void;
}

/* =========================================================
 * QCTDS
 * ========================================================= */

function QCTDS({
  /* -------------------------------------------------------
   * POSITION
   * ------------------------------------------------------- */

  x = 0,
  y = 0,

  /* -------------------------------------------------------
   * SIZE
   * ------------------------------------------------------- */

  width = 320,
  height = 24,

  /* -------------------------------------------------------
   * RANGE
   * ------------------------------------------------------- */

  min = 0,
  max = 120,
  value = 0,

  /* -------------------------------------------------------
   * TITLE
   * ------------------------------------------------------- */

  title = "QC TDS",

  /* -------------------------------------------------------
   * FONT
   * ------------------------------------------------------- */

  fontFamily = "Arial",

  titleFontSize = 18,
  valueFontSize = 18,
  statusFontSize = 16,

  titleFontWeight = "bold",
  statusFontWeight = "bold",

  /* -------------------------------------------------------
   * COLORS
   * ------------------------------------------------------- */

  titleColor = "#ffffff",
  valueColor = "#ffffff",
  statusColor = "#ffffff",

  backgroundColor = "#202020",
  borderColor = "#444444",
  markerColor = "#ffffff",

  /* -------------------------------------------------------
   * CURSOR
   * ------------------------------------------------------- */

  cursor = "pointer",
}: QCTDSProps) {
  /* =======================================================
   * SAFE RANGE
   * ======================================================= */

  const range = max - min || 1;

  const v = Math.max(min, Math.min(max, value));

  const percentage = (v - min) / range;

  const markerX = percentage * width;

  /* =======================================================
   * STATUS
   * ======================================================= */

  let status: string;
  let statusFill = statusColor;

  if (v <= 10) {
    status = "EXCELLENT";
    statusFill = "#2563eb";
  } else if (v <= 30) {
    status = "GOOD";
    statusFill = "#22c55e";
  } else if (v <= 50) {
    status = "ACCEPTABLE";
    statusFill = "#eab308";
  } else if (v <= 100) {
    status = "WARNING";
    statusFill = "#f97316";
  } else {
    status = "REJECT";
    statusFill = "#ef4444";
  }

  /* =======================================================
   * UNIQUE GRADIENT ID
   * ======================================================= */

  const gradientId = React.useId().replace(/:/g, "");

  /* =======================================================
   * RENDER
   * ======================================================= */

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{
        cursor,
      }}
      pointerEvents="all"
    >
      {/* ===================================================
       * DEFINITIONS
       * =================================================== */}

      <defs>
        <linearGradient
          id={`qcTdsGradient-${gradientId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="10%" stopColor="#22c55e" />
          <stop offset="30%" stopColor="#eab308" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* ===================================================
       * TITLE
       * =================================================== */}

      <text
        x={0}
        y={-20}
        fontSize={titleFontSize}
        fontWeight={titleFontWeight}
        fontFamily={fontFamily}
        fill={titleColor}
        pointerEvents="none"
      >
        {title}
      </text>

      {/* ===================================================
       * BACKGROUND
       * =================================================== */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={8}
        fill={backgroundColor}
        stroke={borderColor}
        pointerEvents="all"
      />

      {/* ===================================================
       * COLOR BAR
       * =================================================== */}

      <rect
        x={2}
        y={2}
        width={Math.max(0, width - 4)}
        height={Math.max(0, height - 4)}
        rx={6}
        fill={`url(#qcTdsGradient-${gradientId})`}
        pointerEvents="none"
      />

      {/* ===================================================
       * MARKER
       * =================================================== */}

      <polygon
        points="-6,-6 6,-6 0,0"
        fill={markerColor}
        transform={`translate(${markerX},0)`}
        pointerEvents="none"
      />

      {/* ===================================================
       * VALUE
       * =================================================== */}

      <text
        x={width + 15}
        y={18}
        fontSize={valueFontSize}
        fontFamily={fontFamily}
        fill={valueColor}
        pointerEvents="none"
      >
        {value.toFixed(1)} ppm
      </text>

      {/* ===================================================
       * STATUS
       * =================================================== */}

      <text
        x={width + 15}
        y={42}
        fontSize={statusFontSize}
        fontWeight={statusFontWeight}
        fontFamily={fontFamily}
        fill={statusFill}
        pointerEvents="none"
      >
        {status}
      </text>
    </g>
  );
}

export default QCTDS;
