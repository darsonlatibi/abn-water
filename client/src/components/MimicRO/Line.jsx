import React from "react";

const Line = ({
  x = 0,
  y = 0,
  length = 100,
  direction = "right",
  active = true,
  pipeColor = "#cfd8dc",
  flowColor = "#00bfff",
  pipeWidth = 12,
  flowWidth = 4,
}) => {
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

    default:
      x2 = x + length;
  }

  return (
    <g>
      {/* PIPE BASE */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={pipeColor}
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* FLOW ANIMATION */}
      {active && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={flowColor}
          strokeWidth={flowWidth}
          strokeDasharray="12 8"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      )}
    </g>
  );
};

export default Line;
