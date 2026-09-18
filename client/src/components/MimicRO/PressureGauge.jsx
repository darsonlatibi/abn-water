import React, { useMemo } from "react";

const PressureGauge = ({
  x = 0,
  y = 0,

  width = 140,
  height = 140,

  value = 0,
  min = 0,
  max = 16,

  tag = "PT-101",
  unit = "bar",

  alarmThreshold = 0.85,

  mode = "auto",

  fontSize,
  fontFamily = "Arial",
  fontWeight = "bold",
}) => {
  const isMobile =
    mode === "mobile"
      ? true
      : mode === "desktop"
        ? false
        : window.innerWidth < 500;

  // ======================
  // SCALE ENGINE
  // ======================
  const scale = Math.min(width, height) / 140;

  const cx = width / 2;
  const cy = height / 2;

  const radius = Math.min(width, height) * 0.38;

  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 1;
  const safeValue = Number.isFinite(value) ? value : 0;

  const clamped = Math.max(safeMin, Math.min(safeMax, safeValue));
  const range = safeMax - safeMin || 1;

  const percent = (clamped - safeMin) / range;
  const angle = -135 + percent * 270;
  const rad = (angle * Math.PI) / 180;

  const needleLength = radius * 0.85;

  const needleX = cx + Math.cos(rad) * needleLength;
  const needleY = cy + Math.sin(rad) * needleLength;

  const isAlarm = percent >= alarmThreshold;

  // ======================
  // FONT ENGINE (FIXED)
  // ======================
  const useManualFont = fontSize !== undefined && fontSize !== null;

  const baseFont = useManualFont ? fontSize : 12 * scale;

  const fontTagSize = baseFont * 0.85;
  const fontValueSize = baseFont * 1.6;
  const fontUnitSize = baseFont;
  const fontAlarmSize = baseFont * 0.85;

  const spacing = 14 * scale;

  // ======================
  // TICKS
  // ======================
  const ticks = useMemo(() => {
    if (isMobile) return null;

    return Array.from({ length: 9 }).map((_, i) => {
      const a = (-135 + i * 33.75) * (Math.PI / 180);

      const x1 = cx + Math.cos(a) * (radius * 0.85);
      const y1 = cy + Math.sin(a) * (radius * 0.85);

      const x2 = cx + Math.cos(a) * (radius * 0.95);
      const y2 = cy + Math.sin(a) * (radius * 0.95);

      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#444"
          strokeWidth={1.5 * scale}
        />
      );
    });
  }, [isMobile, cx, cy, radius, scale]);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* ================= TICKS ================= */}
      {ticks}

      {/* ================= NEEDLE ================= */}
      {!isMobile && (
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke={isAlarm ? "#dc3545" : "#000"}
          strokeWidth={3 * scale}
        >
          {isAlarm && (
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="0.6s"
              repeatCount="indefinite"
            />
          )}
        </line>
      )}

      {/* ================= CENTER ================= */}
      {!isMobile && <circle cx={cx} cy={cy} r={4 * scale} fill="#000" />}

      {/* ================= MOBILE ================= */}
      {/* ================= MOBILE MODE ================= */}
      {isMobile && (
        <>
          {/* TAG (atas) */}
          <text
            x={cx}
            y={cy - 18 * scale}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#aaa"
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
          >
            {tag}
          </text>

          {/* VALUE (tengah) */}
          <text
            x={cx}
            y={cy + 6 * scale}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={fontSize * 1.2}
            fontFamily={fontFamily}
            fontWeight="bold"
          >
            {clamped.toFixed(1)} {unit}
          </text>

          {/* ALARM (bawah) */}
          {isAlarm && (
            <text
              x={cx}
              y={cy + 24 * scale}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#dc3545"
              fontSize={fontSize}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
            >
              ALARM HIGH
            </text>
          )}
        </>
      )}

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <>
          <text
            x={cx}
            y={cy + spacing}
            textAnchor="middle"
            fontSize={fontValueSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fill="#000"
          >
            {clamped.toFixed(1)}
          </text>

          <text
            x={cx}
            y={cy + spacing * 2}
            textAnchor="middle"
            fontSize={fontUnitSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fill="#666"
          >
            {unit}
          </text>

          <text
            x={cx}
            y={cy + radius * 1.2}
            textAnchor="middle"
            fontSize={fontTagSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fill="#333"
          >
            {tag}
          </text>
        </>
      )}

      {/* ================= ALARM ================= */}
      {isAlarm && !isMobile && (
        <>
          <rect
            x={cx - 45 * scale}
            y={cy - radius - 25 * scale}
            width={90 * scale}
            height={20 * scale}
            fill="#dc3545"
            rx="4"
          />
          <text
            x={cx}
            y={cy - radius - 11 * scale}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontAlarmSize}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
          >
            HIGH PRESSURE
          </text>
        </>
      )}
    </g>
  );
};

export default PressureGauge;
