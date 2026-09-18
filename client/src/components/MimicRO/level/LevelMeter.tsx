import React from "react";

type ScalePosition = "left" | "right";

interface LevelMeterProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  value?: number;

  min?: number;
  max?: number;

  tag?: string;
  title?: string;

  unit?: string;

  showScale?: boolean;

  // =========================
  // SCALE CONFIG
  // =========================

  scalePosition?: ScalePosition;

  // Jarak body ke scale
  scaleGap?: number;

  // Panjang garis scale
  scaleWidth?: number;

  // Jarak scale ke angka
  scaleLabelGap?: number;
}

const LevelMeter: React.FC<LevelMeterProps> = ({
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

  scalePosition = "right",

  scaleGap = 5,
  scaleWidth = 10,
  scaleLabelGap = 5,
}) => {
  // =====================================================
  // RANGE SAFETY
  // =====================================================

  const safeMin = Number.isFinite(min) ? min : 0;

  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 100;

  // =====================================================
  // VALUE SAFETY
  // =====================================================

  const numericValue = Number(value);

  const safeValue = Math.max(
    safeMin,
    Math.min(safeMax, Number.isFinite(numericValue) ? numericValue : safeMin),
  );

  // =====================================================
  // LEVEL
  // =====================================================

  const ratio = (safeValue - safeMin) / (safeMax - safeMin);

  const levelHeight = ratio * height;

  const liquidY = height - levelHeight;

  // =====================================================
  // LEVEL COLOR
  // =====================================================

  const percent = ratio * 100;

  const levelColor =
    percent < 20 ? "#dc3545" : percent < 50 ? "#ffc107" : "#00bfff";

  // =====================================================
  // SCALE
  // =====================================================

  const isLeft = scalePosition === "left";

  /*
   * Semua scale dibuat relatif terhadap body.
   *
   * LEFT:
   *
   * angka
   *  |
   *  |────
   *       GAP
   *       BODY
   *
   * RIGHT:
   *
   * BODY
   *       GAP
   *       ────|
   *           |
   *         angka
   */

  const scaleStartX = isLeft ? -(scaleGap + scaleWidth) : width + scaleGap;

  const scaleEndX = isLeft ? -scaleGap : width + scaleGap + scaleWidth;

  const labelX = isLeft
    ? scaleStartX - scaleLabelGap
    : scaleEndX + scaleLabelGap;

  const labelAnchor: "start" | "end" = isLeft ? "end" : "start";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <g transform={`translate(${x},${y})`}>
      {/* =================================================
          TITLE
      ================================================= */}

      <text
        x={width / 2}
        y={-20}
        textAnchor="middle"
        fill="#00bfff"
        fontSize={12}
        fontWeight="bold"
      >
        {title}
      </text>

      {/* =================================================
          BODY
      ================================================= */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={5}
        fill="#071421"
        stroke="#777"
        strokeWidth={2}
      />

      {/* =================================================
          LIQUID
      ================================================= */}

      <rect
        x={3}
        y={liquidY}
        width={Math.max(0, width - 6)}
        height={Math.max(0, levelHeight)}
        fill={levelColor}
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>

      {/* =================================================
          SCALE
      ================================================= */}

      {showScale && (
        <g>
          {Array.from({ length: 11 }, (_, i) => {
            const scaleRatio = i / 10;

            const scaleValue = safeMin + scaleRatio * (safeMax - safeMin);

            const yy = height - scaleRatio * height;

            return (
              <g key={`scale-${i}`}>
                {/* TICK */}

                <line
                  x1={scaleStartX}
                  y1={yy}
                  x2={scaleEndX}
                  y2={yy}
                  stroke="#aaa"
                  strokeWidth={1}
                />

                {/* LABEL */}

                <text
                  x={labelX}
                  y={yy + 4}
                  textAnchor={labelAnchor}
                  fill="#aaa"
                  fontSize={10}
                >
                  {scaleValue.toFixed(0)}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* =================================================
          LOW ALARM
      ================================================= */}

      {percent < 20 && (
        <rect
          x={-4}
          y={-4}
          width={width + 8}
          height={height + 8}
          fill="none"
          stroke="#dc3545"
          strokeWidth={3}
          pointerEvents="none"
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      )}

      {/* =================================================
          VALUE
      ================================================= */}

      <text
        x={width / 2}
        y={height + 25}
        textAnchor="middle"
        fill="#00ffff"
        fontSize={12}
        fontWeight="bold"
      >
        {safeValue.toFixed(0)} {unit}
      </text>

      {/* =================================================
          TAG
      ================================================= */}

      <text
        x={width / 2}
        y={height + 42}
        textAnchor="middle"
        fill="#aaa"
        fontSize={10}
      >
        {tag}
      </text>
    </g>
  );
};

export default LevelMeter;
