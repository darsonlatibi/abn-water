// PipeElbow.jsx
import React from "react";

const PipeElbow = ({
  x = 0,
  y = 0,

  radius = 30,
  diameter = 5,

  direction = "top-right",
  // top-right, top-left, bottom-right, bottom-left

  color = "#444",

  flowing = false,
  flowColor = "#00bfff",

  showArrow = false,
}) => {
  const paths = {
    "top-right": `M 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius} 0`,
    "top-left": `M 0 ${radius} A ${radius} ${radius} 0 0 0 ${-radius} 0`,
    "bottom-right": `M 0 ${-radius} A ${radius} ${radius} 0 0 0 ${radius} 0`,
    "bottom-left": `M 0 ${-radius} A ${radius} ${radius} 0 0 1 ${-radius} 0`,
  };

  const arrowPos = {
    "top-right": `${radius - 2},0 ${radius - 10},-4 ${radius - 10},4`,
    "top-left": `${-radius + 2},0 ${-radius + 10},-4 ${-radius + 10},4`,
    "bottom-right": `${radius - 2},0 ${radius - 10},-4 ${radius - 10},4`,
    "bottom-left": `${-radius + 2},0 ${-radius + 10},-4 ${-radius + 10},4`,
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Main elbow */}
      <path
        d={paths[direction]}
        fill="none"
        stroke={color}
        strokeWidth={diameter}
        strokeLinecap="round"
      />

      {/* Flow animation */}
      {flowing && (
        <path
          d={paths[direction]}
          fill="none"
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
        </path>
      )}

      {/* Flow arrow */}
      {showArrow && (
        <polygon
          points={arrowPos[direction]}
          fill={flowing ? flowColor : color}
        />
      )}
    </g>
  );
};

export default PipeElbow;

// <PipeElbow x={100} y={100} radius={25} direction="top-right" />;
// <PipeElbow x={200} y={100} direction="top-left" />;
// <PipeElbow
//   x={300}
//   y={100}
//   direction="bottom-right"
//   flowing={true}
//   showArrow={true}
// />;
// <PipeElbow x={400} y={100} direction="bottom-left" />;
