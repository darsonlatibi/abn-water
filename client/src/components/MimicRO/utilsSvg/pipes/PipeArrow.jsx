// PipeArrow.jsx
import React from "react";

const PipeArrow = ({
  x = 0,
  y = 0,

  size = 10,

  direction = "right",
  // right, left, up, down

  color = "#00bfff",

  animated = false,
}) => {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  }[direction];

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      <polygon
        points={`
          0,0
          ${-size},${-size / 2}
          ${-size},${size / 2}
        `}
        fill={color}
      >
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-5 0;0 0;-5 0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </polygon>
    </g>
  );
};

export default PipeArrow;

{
  /* <PipeArrow x={100} y={50} direction="right" />;

<PipeArrow x={200} y={100} direction="up" color="#28a745" />;
<PipeArrow x={300} y={80} direction="left" animated={true} />; */
}
