import React from "react";

const AlarmBanner = ({
  x = 0,
  y = 0,
  width = 320,
  height = 50,
  status = "NORMAL",
  message = "",
}) => {
  const config = {
    NORMAL: {
      color: "#28a745",
      text: "SYSTEM NORMAL",
      glow: "#28a745",
    },
    WARNING: {
      color: "#ffc107",
      text: "WARNING CONDITION",
      glow: "#ffc107",
    },
    CRITICAL: {
      color: "#dc3545",
      text: "CRITICAL ALARM",
      glow: "#dc3545",
    },
    OFFLINE: {
      color: "#6c757d",
      text: "DEVICE OFFLINE",
      glow: "#6c757d",
    },
  };

  const { color, text, glow } = config[status] || config.NORMAL;
  const finalText = message || text;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* GLOW FILTER */}
      <defs>
        <filter id={`glow-${x}-${y}`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* BACKGROUND */}
      <rect
        width={width}
        height={height}
        rx="8"
        fill="#111"
        stroke={color}
        strokeWidth="2"
        filter={`url(#glow-${x}-${y})`}
      >
        {status !== "NORMAL" && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur={status === "CRITICAL" ? "0.4s" : "1.2s"}
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* STATUS LED */}
      <circle cx="22" cy={height / 2} r="7" fill={color}>
        {status !== "NORMAL" && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* ICON WARNING */}
      <text
        x="22"
        y={height / 2 + 5}
        textAnchor="middle"
        fontSize="12"
        fill="#fff"
        fontWeight="bold"
      >
        !
      </text>

      {/* TEXT */}
      <text
        x={width / 2}
        y={height / 2 + 5}
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
        fontSize="14"
      >
        {finalText}
      </text>

      {/* RIGHT STATUS LABEL */}
      <text
        x={width - 10}
        y={height / 2 + 5}
        textAnchor="end"
        fill={color}
        fontSize="10"
        fontWeight="bold"
      >
        {status}
      </text>
    </g>
  );
};

export default AlarmBanner;
