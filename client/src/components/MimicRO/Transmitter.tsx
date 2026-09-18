import React from "react";

// =========================
// TRANSMITTER TYPES
// =========================

export type TransmitterType =
  | "PT"
  | "FT"
  | "LT"
  | "TT"
  | "PH"
  | "EC"
  | "ORP"
  | "DO";

export type TransmitterQuality = "GOOD" | "BAD";

// =========================
// TYPE MAP
// =========================

export const TYPE: Record<TransmitterType, TransmitterType> = {
  PT: "PT",
  FT: "FT",
  LT: "LT",
  TT: "TT",
  PH: "PH",
  EC: "EC",
  ORP: "ORP",
  DO: "DO",
};

// =========================
// COLOR MAP
// =========================

export const COLOR: Record<TransmitterType, string> = {
  PT: "#00BCD4",
  FT: "#4CAF50",
  LT: "#2196F3",
  TT: "#FF9800",
  PH: "#8BC34A",
  EC: "#9C27B0",
  ORP: "#E91E63",
  DO: "#03A9F4",
};

// =========================
// PROPS
// =========================

interface TransmitterProps {
  x?: number;
  y?: number;

  type?: TransmitterType;

  tag?: string;

  value?: number;

  unit?: string;

  quality?: TransmitterQuality;

  alarmHigh?: number | null;

  alarmLow?: number | null;

  size?: number;

  showTag?: boolean;

  showValue?: boolean;

  showUnit?: boolean;
}

// =========================
// COMPONENT
// =========================

const Transmitter: React.FC<TransmitterProps> = ({
  x = 0,
  y = 0,

  type = "PT",

  tag = "PT-101",

  value = 0,

  unit = "bar",

  quality = "GOOD",

  alarmHigh = null,

  alarmLow = null,

  size = 60,

  showTag = true,

  showValue = true,

  showUnit = true,
}) => {
  const r = size / 2;

  // =========================
  // SAFE VALUE
  // =========================

  const numericValue = Number(value);

  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;

  // =========================
  // BASE COLOR
  // =========================

  let color = COLOR[type] ?? "#00d8ff";

  // =========================
  // QUALITY
  // =========================

  if (quality === "BAD") {
    color = "#ff4444";
  }

  // =========================
  // HIGH ALARM
  // =========================

  if (alarmHigh !== null && safeValue >= alarmHigh) {
    color = "#ff4444";
  }

  // =========================
  // LOW ALARM
  // =========================

  if (alarmLow !== null && safeValue <= alarmLow) {
    color = "#ffc107";
  }

  // =========================
  // ALARM STATE
  // =========================

  const isAlarm =
    quality === "BAD" ||
    (alarmHigh !== null && safeValue >= alarmHigh) ||
    (alarmLow !== null && safeValue <= alarmLow);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* =========================
          TAG
      ========================= */}

      {showTag && (
        <text
          x={0}
          y={-r - 12}
          textAnchor="middle"
          fill="white"
          fontSize={size * 0.23}
          fontWeight="bold"
        >
          {tag}
        </text>
      )}

      {/* =========================
          BODY
      ========================= */}

      <circle cx={0} cy={0} r={r} fill="#111" stroke={color} strokeWidth={3} />

      {/* =========================
          TYPE
      ========================= */}

      <text
        x={0}
        y={-8}
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        fontSize={size * 0.28}
      >
        {type}
      </text>

      {/* =========================
          VALUE
      ========================= */}

      {showValue && (
        <text
          x={0}
          y={12}
          textAnchor="middle"
          fill={color}
          fontWeight="bold"
          fontSize={size * 0.2}
        >
          {safeValue.toFixed(2)}
        </text>
      )}

      {/* =========================
          UNIT
      ========================= */}

      {showUnit && (
        <text
          x={0}
          y={25}
          textAnchor="middle"
          fill="#aaa"
          fontSize={size * 0.16}
        >
          {unit}
        </text>
      )}

      {/* =========================
          STEM
      ========================= */}

      <line x1={0} y1={r} x2={0} y2={r + 25} stroke="#ddd" strokeWidth={4} />

      {/* =========================
          ALARM
      ========================= */}

      {isAlarm && (
        <circle
          cx={0}
          cy={0}
          r={r + 5}
          fill="none"
          stroke={color}
          strokeWidth={2}
        >
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </g>
  );
};

export default Transmitter;

{
  /* <Transmitter x={300} y={300} type="PT" tag="PT-101" value={4.25} unit="bar" />; */
}
