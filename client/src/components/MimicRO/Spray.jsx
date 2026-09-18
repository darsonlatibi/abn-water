import React from "react";

const Spray = ({
  x = 0,
  y = 0,
  length = 80,
  direction = "up",
  active = true,
  color = "#4fc3f7",
  width = 2,
  label = "AIR",
  value = null,
  zIndex = 999,
}) => {
  const id = `spray-${Math.random()}`;

  let x1 = x;
  let y1 = y;
  let x2 = x;
  let y2 = y;

  switch (direction) {
    case "right":
      x2 = x + length;
      break;

    case "left":
      x2 = x - length;
      break;

    case "down":
      y2 = y + length;
      break;

    case "up":
      y2 = y - length;
      break;
  }

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <g>
      {/* =========================
          AIR FLOW LINE
      ========================= */}
      <defs>
        <marker
          id={id}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
      </defs>

      {/* MAIN LINE */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeDasharray="6 6"
        opacity={active ? 1 : 0.3}
      >
        {/* FLOW ANIMATION */}
        {active && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {/* =========================
          LABEL BOX
      ========================= */}
      {label && (
        <rect
          x={mx - 25}
          y={my - 12}
          width="50"
          height="18"
          fill="#111"
          stroke="#4fc3f7"
          rx="4"
          opacity="0.9"
        />
      )}

      {/* LABEL TEXT */}
      {label && (
        <text x={mx} y={my} textAnchor="middle" fill="#4fc3f7" fontSize="10">
          {label}
        </text>
      )}

      {/* VALUE */}
      {value !== null && (
        <text
          x={mx}
          y={my + 14}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          opacity="0.8"
        >
          {value}
        </text>
      )}
    </g>
  );
};

export default Spray;
