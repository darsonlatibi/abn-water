import React from "react";

const TeePipe = ({
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

  // arah T
  let paths = [];

  switch (direction) {
    case "down":
      paths = [
        // vertical main line
        `M ${x} ${y} V ${y + size}`,
        // left branch
        `M ${x} ${y + half} H ${x - half}`,
        // right branch
        `M ${x} ${y + half} H ${x + half}`,
      ];
      break;

    case "up":
      paths = [
        `M ${x} ${y} V ${y - size}`,
        `M ${x} ${y - half} H ${x - half}`,
        `M ${x} ${y - half} H ${x + half}`,
      ];
      break;

    case "right":
      paths = [
        `M ${x} ${y} H ${x + size}`,
        `M ${x + half} V ${y - half}`,
        `M ${x + half} V ${y + half}`,
      ];
      break;

    case "left":
      paths = [
        `M ${x} ${y} H ${x - size}`,
        `M ${x - half} V ${y - half}`,
        `M ${x - half} V ${y + half}`,
      ];
      break;

    default:
      paths = [
        `M ${x} ${y} V ${y + size}`,
        `M ${x} ${y + half} H ${x - half}`,
        `M ${x} ${y + half} H ${x + half}`,
      ];
  }

  return (
    <g>
      {/* PIPE BASE */}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={pipeColor}
          strokeWidth={pipeWidth}
          strokeLinecap="round"
        />
      ))}

      {/* FLOW ANIMATION */}
      {active &&
        paths.map((d, i) => (
          <path
            key={`flow-${i}`}
            d={d}
            fill="none"
            stroke={flowColor}
            strokeWidth={flowWidth}
            strokeDasharray="10 8"
            strokeLinecap="round"
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
