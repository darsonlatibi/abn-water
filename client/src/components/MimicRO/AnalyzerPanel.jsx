import React from "react";

const AnalyzerPanel = ({
  x = 0,
  y = 0,
  width = 260,
  height = 150,

  ph = 7,
  tdsIn = 0,
  tdsOut = 0,
  recoveryRate = 0,
  rejectionRate = 0,
}) => {
  // =========================
  // SAFE VALUE
  // =========================
  const safe = (val, fallback = 0) =>
    isNaN(val) || val === null || val === undefined ? fallback : val;

  const phVal = safe(ph, 7);
  const inVal = safe(tdsIn);
  const outVal = safe(tdsOut);
  const recVal = safe(recoveryRate);
  const rejVal = safe(rejectionRate);

  // =========================
  // SCALE SYSTEM
  // =========================
  const scaleX = width / 260;
  const scaleY = height / 150;

  const sx = (v) => v * scaleX;
  const sy = (v) => v * scaleY;

  const font = (v) => Math.max(10, v * scaleY);

  // =========================
  // STATUS COLOR
  // =========================
  const phColor = phVal < 6.5 || phVal > 8.5 ? "#ff4d4f" : "#00e676";

  const tdsColor =
    outVal > 20 ? "#ff4d4f" : outVal > 10 ? "#ffc107" : "#00e676";

  const panelStroke =
    outVal > 20 || phVal < 6.5 || phVal > 8.5 ? "#ff4d4f" : "#666";

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PANEL */}
      <rect
        width={width}
        height={height}
        rx={sx(10)}
        fill="#121212"
        stroke={panelStroke}
        strokeWidth={sx(2)}
      />

      {/* HEADER */}
      <rect width={width} height={sy(30)} fill="#2b2b2b" rx={sx(10)} />

      <text
        x={width / 2}
        y={sy(20)}
        fill="#fff"
        textAnchor="middle"
        fontWeight="bold"
        fontSize={font(12)}
      >
        WATER QUALITY ANALYZER
      </text>

      {/* PH */}
      <text x={sx(15)} y={sy(55)} fill="#ddd" fontSize={font(12)}>
        AIT-101 pH
      </text>

      <rect
        x={sx(150)}
        y={sy(40)}
        width={sx(95)}
        height={sy(20)}
        fill="#000"
        stroke={phColor}
        strokeWidth={sx(1.5)}
      />

      <text
        x={sx(197)}
        y={sy(54)}
        fill={phColor}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={font(12)}
      >
        {phVal.toFixed(1)}
      </text>

      {/* TDS IN */}
      <text x={sx(15)} y={sy(80)} fill="#ddd" fontSize={font(12)}>
        AIT-102 TDS IN
      </text>

      <rect
        x={sx(150)}
        y={sy(65)}
        width={sx(95)}
        height={sy(20)}
        fill="#000"
        stroke="#00bfff"
        strokeWidth={sx(1.5)}
      />

      <text
        x={sx(197)}
        y={sy(79)}
        fill="#00bfff"
        textAnchor="middle"
        fontWeight="bold"
        fontSize={font(12)}
      >
        {inVal} ppm
      </text>

      {/* TDS OUT */}
      <text x={sx(15)} y={sy(105)} fill="#ddd" fontSize={font(12)}>
        AIT-103 TDS OUT
      </text>

      <rect
        x={sx(150)}
        y={sy(90)}
        width={sx(95)}
        height={sy(20)}
        fill="#000"
        stroke={tdsColor}
        strokeWidth={sx(1.5)}
      />

      <text
        x={sx(197)}
        y={sy(104)}
        fill={tdsColor}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={font(12)}
      >
        {outVal} ppm
      </text>

      {/* BOTTOM */}
      <rect
        x={sx(15)}
        y={sy(118)}
        width={sx(110)}
        height={sy(20)}
        fill="#000"
        stroke="#ffc107"
        strokeWidth={sx(1.2)}
      />

      <text
        x={sx(70)}
        y={sy(132)}
        fill="#ffc107"
        textAnchor="middle"
        fontSize={font(11)}
      >
        REC {recVal}%
      </text>

      <rect
        x={sx(135)}
        y={sy(118)}
        width={sx(110)}
        height={sy(20)}
        fill="#000"
        stroke="#00e676"
        strokeWidth={sx(1.2)}
      />

      <text
        x={sx(190)}
        y={sy(132)}
        fill="#00e676"
        textAnchor="middle"
        fontSize={font(11)}
      >
        REJ {rejVal}%
      </text>
    </g>
  );
};

export default AnalyzerPanel;
