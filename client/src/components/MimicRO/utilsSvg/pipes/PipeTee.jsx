// PipeTee.jsx
import React from "react";

const PipeTee = ({
  x = 0,
  y = 0,

  length = 60,
  branch = 30,
  diameter = 5,

  direction = "top",
  // top, bottom, left, right

  color = "#444",

  flowing = false,
  flowColor = "#00bfff",
}) => {
  const configs = {
    top: {
      main: {
        x1: -length / 2,
        y1: 0,
        x2: length / 2,
        y2: 0,
      },
      branch: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: -branch,
      },
    },

    bottom: {
      main: {
        x1: -length / 2,
        y1: 0,
        x2: length / 2,
        y2: 0,
      },
      branch: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: branch,
      },
    },

    left: {
      main: {
        x1: 0,
        y1: -length / 2,
        x2: 0,
        y2: length / 2,
      },
      branch: {
        x1: 0,
        y1: 0,
        x2: -branch,
        y2: 0,
      },
    },

    right: {
      main: {
        x1: 0,
        y1: -length / 2,
        x2: 0,
        y2: length / 2,
      },
      branch: {
        x1: 0,
        y1: 0,
        x2: branch,
        y2: 0,
      },
    },
  };

  const cfg = configs[direction];

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Main pipe */}
      <line
        {...cfg.main}
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
      />

      {/* Branch pipe */}
      <line
        {...cfg.branch}
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
      />

      {/* Flow animation */}
      {flowing && (
        <>
          <line
            {...cfg.main}
            stroke={flowColor}
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="16"
              to="0"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>

          <line
            {...cfg.branch}
            stroke={flowColor}
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="16"
              to="0"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
        </>
      )}
    </g>
  );
};

export default PipeTee;

{
  /* <PipeTee x={100} y={100} direction="top" />;

<PipeTee x={200} y={100} direction="bottom" />;

<PipeTee x={300} y={100} direction="left" />;

<PipeTee x={400} y={100} direction="right" flowing={true} />; */
}
