import React from "react";

const Arrow = ({
  x = 0,
  y = 0,

  width = 120,
  height = 40,

  direction = "right",

  label = "",
  value = null,

  color = "#00bfff",

  strokeWidth = 3,

  active = true,
  animated = true,
}) => {
  const markerId = `arrow-${x}-${y}-${direction}`;

  let x1, y1, x2, y2;

  switch (direction) {
    case "left":
      x1 = width;
      y1 = height / 2;
      x2 = 0;
      y2 = height / 2;
      break;

    case "up":
      x1 = width / 2;
      y1 = height;
      x2 = width / 2;
      y2 = 0;
      break;

    case "down":
      x1 = width / 2;
      y1 = 0;
      x2 = width / 2;
      y2 = height;
      break;

    default:
      x1 = 0;
      y1 = height / 2;
      x2 = width;
      y2 = height / 2;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* MARKER */}
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={color} />
        </marker>

        {/* Glow */}
        <filter id={`${markerId}-glow`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* LINE */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
        opacity={active ? 1 : 0.3}
        filter={`url(#${markerId}-glow)`}
      />

      {/* FLOW PARTICLES */}
      {active &&
        animated &&
        Array.from({ length: 4 }).map((_, i) => (
          <circle key={i} r={strokeWidth + 1} fill="#7dd3fc" opacity="0">
            {/* Horizontal */}
            {(direction === "right" || direction === "left") && (
              <>
                <animate
                  attributeName="cx"
                  values={direction === "right" ? `0;${width}` : `${width};0`}
                  dur="1.5s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />

                <animate
                  attributeName="cy"
                  values={`${height / 2};${height / 2}`}
                  dur="1.5s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </>
            )}

            {/* Vertical */}
            {(direction === "up" || direction === "down") && (
              <>
                <animate
                  attributeName="cy"
                  values={direction === "down" ? `0;${height}` : `${height};0`}
                  dur="1.5s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />

                <animate
                  attributeName="cx"
                  values={`${width / 2};${width / 2}`}
                  dur="1.5s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </>
            )}

            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur="1.5s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />

            <animate
              attributeName="r"
              values="1;4;1"
              dur="1.5s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      {/* LABEL */}
      {label && (
        <>
          <rect
            x={width / 2 - 35}
            y={height / 2 - 12}
            width="70"
            height="18"
            fill="#111"
            stroke="#00bfff"
            rx="4"
          />

          <text
            x={width / 2}
            y={height / 2}
            textAnchor="middle"
            fill="#00ffff"
            fontSize="10"
          >
            {label}
          </text>
        </>
      )}

      {/* VALUE */}
      {value !== null && (
        <text
          x={width / 2}
          y={height / 2 + 16}
          textAnchor="middle"
          fill="#fff"
          fontSize="9"
        >
          {value}
        </text>
      )}
    </g>
  );
};

export default Arrow;
