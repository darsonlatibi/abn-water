import React from "react";

type VenturyDirection = "right" | "down" | "left" | "up";

interface VenturyProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;
  throat?: number;

  direction?: VenturyDirection;

  active?: boolean;

  label?: string;

  color?: string;
  flowColor?: string;

  fontScale?: number;
  minFontSize?: number;
  maxFontSize?: number;
}

const Ventury: React.FC<VenturyProps> = ({
  x = 0,
  y = 0,

  width = 120,
  height = 40,
  throat = 20,

  direction = "right",

  active = true,

  label = "VENT-101",

  color = "#cfd8dc",
  flowColor = "#00bfff",

  fontScale = 0.22,
  minFontSize = 10,
  maxFontSize = 24,
}) => {
  // ==========================================
  // FONT
  // ==========================================
  const fontSize = Math.min(
    maxFontSize,
    Math.max(minFontSize, Math.min(width, height) * fontScale),
  );

  // ==========================================
  // BASIC DIMENSIONS
  // ==========================================
  const h = height / 2;
  const t = throat / 2;

  // ==========================================
  // ROTATION
  // ==========================================
  const rotationMap: Record<VenturyDirection, number> = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  const rotation = rotationMap[direction];

  // ==========================================
  // CENTER OF COMPONENT
  // ==========================================
  const cx = width / 2;
  const cy = 0;

  return (
    <g
      transform={`
        translate(${x}, ${y})
        rotate(${rotation} ${cx} ${cy})
      `}
    >
      {/* ======================================
          BODY
      ====================================== */}
      <path
        d={`
          M 0 ${-h}

          L ${width * 0.35} ${-h}
          L ${width * 0.5} ${-t}
          L ${width * 0.65} ${-h}

          L ${width} ${-h}

          L ${width} ${h}

          L ${width * 0.65} ${h}
          L ${width * 0.5} ${t}
          L ${width * 0.35} ${h}

          L 0 ${h}

          Z
        `}
        fill="#1e293b"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* ======================================
          FLOW
      ====================================== */}
      {active && (
        <line
          x1={10}
          y1={0}
          x2={width - 10}
          y2={0}
          stroke={flowColor}
          strokeWidth={Math.max(2, height * 0.12)}
          strokeDasharray="10 6"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* ======================================
          THROAT
      ====================================== */}
      <line
        x1={width / 2}
        y1={-t}
        x2={width / 2}
        y2={t}
        stroke="#ffc107"
        strokeWidth={2}
      />

      {/* ======================================
          LABEL
      ====================================== */}
      <text
        x={width / 2}
        y={0}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#00ffff"
        fontSize={fontSize}
        fontWeight="bold"
        opacity={0.9}
      >
        {label}
      </text>
    </g>
  );
};

export default Ventury;
