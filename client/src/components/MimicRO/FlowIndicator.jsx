import React from "react";

const FlowIndicator = ({ x = 0, y = 0, width = 120, flowRate = 0 }) => {
  const active = flowRate > 0;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PIPE */}
      <line
        x1="0"
        y1="0"
        x2={width}
        y2="0"
        stroke="#00bfff"
        strokeWidth="10"
        strokeDasharray="12 6"
      >
        {active && (
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-36"
            dur="0.8s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {/* FLOW ARROWS */}
      {[20, 50, 80].map((pos) => (
        <polygon
          key={pos}
          points={`${pos},0 ${pos - 10},-6 ${pos - 10},6`}
          fill={active ? "#00e5ff" : "#666"}
        >
          {active && (
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="25 0"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </polygon>
      ))}

      {/* FLOW VALUE */}
      <rect
        x={width + 10}
        y="-18"
        width="90"
        height="36"
        rx="5"
        fill="#111"
        stroke="#00ff88"
      />

      <text
        x={width + 55}
        y="6"
        textAnchor="middle"
        fill="#00ff88"
        fontSize="14"
        fontWeight="bold"
      >
        {flowRate} L/min
      </text>
    </g>
  );
};

export default FlowIndicator;
