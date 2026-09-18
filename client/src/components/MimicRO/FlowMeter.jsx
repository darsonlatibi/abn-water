import React from "react";

const FlowMeter = ({
  x = 0,
  y = 0,
  width = 200,
  height = 80,

  tagNumber = "FT-101",
  value = 0,
  unit = "L/min",

  min = 0,
  max = 100,

  alarm = {
    status: false,
    level: "NONE",
  },
}) => {
  const safeValue = Math.max(min, Math.min(max, value));
  const percent = ((safeValue - min) / (max - min)) * 100;

  const isMobile = width <= 140;

  let color = "#00ff00";
  if (alarm.status || alarm.level === "HIGH") color = "#ffc107";
  if (alarm.level === "CRITICAL") color = "#dc3545";

  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* FRAME */}
      {!isMobile && (
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#111"
          stroke={color}
          strokeWidth="2"
          rx="6"
        />
      )}

      {/* TAG */}
      <text x="8" y="18" fill="#aaa" fontSize={isMobile ? "12" : "10"}>
        {tagNumber}
      </text>

      {/* VALUE */}
      <text x="8" y="40" fill="#fff" fontSize="16" fontWeight="bold">
        {safeValue.toFixed(1)} {!isMobile && unit}
      </text>

      {/* UNIT (mobile only) */}
      {isMobile && (
        <text x="8" y="58" fill="#aaa" fontSize="10">
          {unit}
        </text>
      )}

      {/* FLOW BAR (desktop only) */}
      {!isMobile && (
        <>
          <rect
            x="10"
            y={height - 25}
            width={width - 20}
            height="10"
            fill="#333"
            rx="5"
          />
          <rect
            x="10"
            y={height - 25}
            width={(width - 20) * (percent / 100)}
            height="10"
            fill={color}
          />
        </>
      )}

      {/* MOBILE MINI BAR */}
      {isMobile && (
        <>
          <rect x="8" y="65" width={width - 16} height="6" fill="#333" rx="3" />
          <rect
            x="8"
            y="65"
            width={(width - 16) * (percent / 100)}
            height="6"
            fill={color}
          />
        </>
      )}

      {/* ALARM */}
      <text x="8" y={height - 5} fontSize="10" fill={color}>
        {alarm.status ? `ALARM ${alarm.level}` : "NORMAL"}
      </text>
    </svg>
  );
};

export default FlowMeter;
