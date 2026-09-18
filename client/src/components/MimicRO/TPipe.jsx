import React from "react";

const TPipe = ({
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

  // MAIN LINE (horizontal / vertical)
  const isHorizontal = orientation === "horizontal";

  // MAIN PIPE
  const x1 = isHorizontal ? x - half : x;
  const y1 = isHorizontal ? y : y - half;
  const x2 = isHorizontal ? x + half : x;
  const y2 = isHorizontal ? y : y + half;

  // BRANCH PIPE
  let bx1 = x;
  let by1 = y;
  let bx2 = x;
  let by2 = y;

  switch (branch) {
    case "up":
      by2 = y - half;
      break;
    case "down":
      by2 = y + half;
      break;
    case "left":
      bx2 = x - half;
      break;
    case "right":
      bx2 = x + half;
      break;
  }

  return (
    <g>
      {/* =========================
          MAIN PIPE
      ========================= */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* FLOW MAIN */}
      {active && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={flowColor}
          strokeWidth={4}
          strokeDasharray="10 8"
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

      {/* =========================
          BRANCH PIPE
      ========================= */}
      <line
        x1={bx1}
        y1={by1}
        x2={bx2}
        y2={by2}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* FLOW BRANCH */}
      {active && (
        <line
          x1={bx1}
          y1={by1}
          x2={bx2}
          y2={by2}
          stroke={flowColor}
          strokeWidth={4}
          strokeDasharray="10 8"
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

      {/* =========================
          CENTER JOINT (FITTING LOOK)
      ========================= */}
      <circle
        cx={x}
        cy={y}
        r="6"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />
    </g>
  );
};

export default TPipe;
