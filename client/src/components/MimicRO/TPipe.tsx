import React from "react";

type PipeOrientation = "horizontal" | "vertical";

type PipeBranch = "up" | "down" | "left" | "right";

interface TPipeProps {
  x?: number;
  y?: number;

  size?: number;

  orientation?: PipeOrientation;

  branch?: PipeBranch;

  active?: boolean;

  pipeColor?: string;

  flowColor?: string;

  pipeWidth?: number;
}

const TPipe: React.FC<TPipeProps> = ({
  x = 0,
  y = 0,
  size = 60,

  orientation = "horizontal",

  branch = "down",

  active = true,

  pipeColor = "#cfd8dc",

  flowColor = "#00bfff",

  pipeWidth = 10,
}) => {
  const half = size / 2;

  // =====================================================
  // MAIN LINE
  // =====================================================

  const isHorizontal = orientation === "horizontal";

  const x1 = isHorizontal ? x - half : x;
  const y1 = isHorizontal ? y : y - half;

  const x2 = isHorizontal ? x + half : x;
  const y2 = isHorizontal ? y : y + half;

  // =====================================================
  // BRANCH LINE
  // =====================================================

  let bx1 = x;
  let by1 = y;

  let bx2 = x;
  let by2 = y;

  switch (branch) {
    case "up":
      bx2 = x;
      by2 = y - half;
      break;

    case "down":
      bx2 = x;
      by2 = y + half;
      break;

    case "left":
      bx2 = x - half;
      by2 = y;
      break;

    case "right":
      bx2 = x + half;
      by2 = y;
      break;
  }

  return (
    <g>
      {/* =================================================
          MAIN PIPE
      ================================================= */}

      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* =================================================
          MAIN FLOW
      ================================================= */}

      {active && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={flowColor}
          strokeWidth={4}
          strokeDasharray="10 8"
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

      {/* =================================================
          BRANCH PIPE
      ================================================= */}

      <line
        x1={bx1}
        y1={by1}
        x2={bx2}
        y2={by2}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* =================================================
          BRANCH FLOW
      ================================================= */}

      {active && (
        <line
          x1={bx1}
          y1={by1}
          x2={bx2}
          y2={by2}
          stroke={flowColor}
          strokeWidth={4}
          strokeDasharray="10 8"
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

      {/* =================================================
          CENTER JOINT
      ================================================= */}

      <circle
        cx={x}
        cy={y}
        r={6}
        fill="#111"
        stroke="#00bfff"
        strokeWidth={2}
      />
    </g>
  );
};

export default TPipe;
