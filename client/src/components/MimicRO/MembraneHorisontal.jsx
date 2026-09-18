import React from "react";

const MembraneHorizontal = ({
  x = 0,
  y = 0,
  width = 200,
  height = 60,

  active = true,
  flowActive = false,

  label = "RO MEMBRANE",
  tag = "RO-101",

  direction = "right",
}) => {
  const isRight = direction === "right";

  const padding = 10;
  const segmentGap = 4;

  const segmentCount = Math.max(3, Math.floor((width - padding * 2) / 24));

  const segmentWidth =
    (width - padding * 2 - segmentGap * (segmentCount - 1)) / segmentCount;

  const flowY = height / 2;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* =========================
          GLOW FILTER
      ========================= */}
      <defs>
        <filter
          id={`flowGlow-${x}-${y}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* =========================
          BODY
      ========================= */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="10"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />

      {/* =========================
          MEMBRANE SEGMENTS
      ========================= */}
      <g opacity={active ? 0.9 : 0.3}>
        {Array.from({ length: segmentCount }).map((_, i) => (
          <rect
            key={i}
            x={padding + i * (segmentWidth + segmentGap)}
            y={15}
            width={segmentWidth}
            height={height - 30}
            fill="#1e88e5"
            opacity="0.6"
          />
        ))}
      </g>

      {/* =========================
          FLOW GUIDE
      ========================= */}
      {flowActive && (
        <line
          x1="10"
          y1={flowY}
          x2={width - 10}
          y2={flowY}
          stroke="#00d4ff"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
      )}

      {/* =========================
          FLOW PARTICLES
      ========================= */}
      {flowActive &&
        Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            {/* TAIL */}
            <ellipse
              cx={isRight ? 10 : width - 10}
              cy={flowY}
              rx="10"
              ry="2.5"
              fill="#00d4ff"
              opacity="0.25"
              filter={`url(#flowGlow-${x}-${y})`}
            >
              <animate
                attributeName="cx"
                values={isRight ? `10;${width - 10}` : `${width - 10};10`}
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="0;0.25;0.25;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </ellipse>

            {/* PARTICLE */}
            <circle
              cx={isRight ? 10 : width - 10}
              cy={flowY}
              r="4"
              fill="#4fc3f7"
              filter={`url(#flowGlow-${x}-${y})`}
            >
              <animate
                attributeName="cx"
                values={isRight ? `10;${width - 10}` : `${width - 10};10`}
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />

              <animate
                attributeName="r"
                values="2;4;5;2"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

      {/* =========================
          LABEL
      ========================= */}
      <text
        x={width / 2}
        y={-8}
        textAnchor="middle"
        fill="#00ffff"
        fontSize="12"
        fontWeight="bold"
      >
        {label}
      </text>

      {/* =========================
          TAG
      ========================= */}
      <text
        x={width / 2}
        y={height + 15}
        textAnchor="middle"
        fill="#aaa"
        fontSize="10"
      >
        {tag}
      </text>

      {/* =========================
          STATUS LED
      ========================= */}
      <circle
        cx={width - 12}
        cy={12}
        r="5"
        fill={active ? "#00ff00" : "#ff1744"}
      >
        {active && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </g>
  );
};

export default MembraneHorizontal;
