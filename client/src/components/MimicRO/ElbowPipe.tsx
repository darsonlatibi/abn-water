import React from "react";

type ElbowDirection = "right-down" | "right-up" | "left-down" | "left-up";

interface ElbowPipeProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  direction?: ElbowDirection;

  active?: boolean;

  pipeColor?: string;
  flowColor?: string;

  pipeWidth?: number;
  flowWidth?: number;
}

const ElbowPipe: React.FC<ElbowPipeProps> = ({
  x = 0,
  y = 0,

  width = 80,
  height = 80,

  direction = "right-down",

  active = true,

  pipeColor = "#cfd8dc",
  flowColor = "#00bfff",

  pipeWidth = 12,
  flowWidth = 4,
}) => {
  // =========================
  // PIPE PATH
  // =========================
  let d: string;

  switch (direction) {
    case "right-down":
      d = `M ${x} ${y} H ${x + width} V ${y + height}`;
      break;

    case "right-up":
      d = `M ${x} ${y} H ${x + width} V ${y - height}`;
      break;

    case "left-down":
      d = `M ${x} ${y} H ${x - width} V ${y + height}`;
      break;

    case "left-up":
      d = `M ${x} ${y} H ${x - width} V ${y - height}`;
      break;

    default:
      d = `M ${x} ${y} H ${x + width} V ${y + height}`;
      break;
  }

  return (
    <g>
      {/* =========================
          PIPE
      ========================= */}
      <path
        d={d}
        fill="none"
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* =========================
          FLOW ANIMATION
      ========================= */}
      {active && (
        <path
          d={d}
          fill="none"
          stroke={flowColor}
          strokeWidth={flowWidth}
          strokeDasharray="12 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      )}
    </g>
  );
};

export default ElbowPipe;
