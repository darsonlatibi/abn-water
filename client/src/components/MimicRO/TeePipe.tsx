import React from "react";

type TeeDirection = "down" | "up" | "right" | "left";

interface TeePipeProps {
  x?: number;
  y?: number;
  size?: number;
  direction?: TeeDirection;
  active?: boolean;
  pipeColor?: string;
  flowColor?: string;
  pipeWidth?: number;
  flowWidth?: number;
}

const TeePipe: React.FC<TeePipeProps> = ({
  x = 0,
  y = 0,
  size = 80,
  direction = "down",
  active = true,
  pipeColor = "#cfd8dc",
  flowColor = "#00bfff",
  pipeWidth = 10,
  flowWidth = 4,
}) => {
  const half = size / 2;

  // =========================
  // TEE PIPE PATHS
  // =========================
  const paths: string[] = (() => {
    switch (direction) {
      case "down":
        return [
          `M ${x} ${y} V ${y + size}`,
          `M ${x} ${y + half} H ${x - half}`,
          `M ${x} ${y + half} H ${x + half}`,
        ];

      case "up":
        return [
          `M ${x} ${y} V ${y - size}`,
          `M ${x} ${y - half} H ${x - half}`,
          `M ${x} ${y - half} H ${x + half}`,
        ];

      case "right":
        return [
          `M ${x} ${y} H ${x + size}`,
          `M ${x + half} V ${y - half}`,
          `M ${x + half} V ${y + half}`,
        ];

      case "left":
        return [
          `M ${x} ${y} H ${x - size}`,
          `M ${x - half} V ${y - half}`,
          `M ${x - half} V ${y + half}`,
        ];

      default:
        return [
          `M ${x} ${y} V ${y + size}`,
          `M ${x} ${y + half} H ${x - half}`,
          `M ${x} ${y + half} H ${x + half}`,
        ];
    }
  })();

  return (
    <g>
      {/* =========================
          PIPE BASE
      ========================= */}
      {paths.map((d, index) => (
        <path
          key={`pipe-${index}`}
          d={d}
          fill="none"
          stroke={pipeColor}
          strokeWidth={pipeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* =========================
          FLOW ANIMATION
      ========================= */}
      {active &&
        paths.map((d, index) => (
          <path
            key={`flow-${index}`}
            d={d}
            fill="none"
            stroke={flowColor}
            strokeWidth={flowWidth}
            strokeDasharray="10 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        ))}
    </g>
  );
};

export default TeePipe;
