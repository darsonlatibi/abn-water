import React from "react";

const UV = ({
  x = 0,
  y = 0,
  width = 140,
  height = 60,

  active = true,
  flowActive = false,

  label = "UV-101",
  text = "UV",
  subText = "",

  showStatus = true,

  // FONT CONFIG
  fontFamily = "Arial",

  textSize = 13,
  textColor = "#000",
  textWeight = "bold",

  subTextSize = 8,
  subTextColor = "#111",
  subTextWeight = "normal",

  labelSize = 12,
  labelColor = "#00ffff",
  labelWeight = "bold",

  statusSize = 9,

  direction = "left", // left | right | up | down
}) => {
  const flowColor = active ? "#00bfff" : "#555";

  const cx = width / 2;
  const cy = height / 2;

  let x1, y1, x2, y2, dashAnimFrom, dashAnimTo;

  switch (direction) {
    case "right":
      x1 = 0;
      y1 = cy;
      x2 = width;
      y2 = cy;
      dashAnimFrom = "0";
      dashAnimTo = "-30";
      break;

    case "left":
      x1 = width;
      y1 = cy;
      x2 = 0;
      y2 = cy;
      dashAnimFrom = "0";
      dashAnimTo = "30";
      break;

    case "down":
      x1 = cx;
      y1 = 0;
      x2 = cx;
      y2 = height;
      dashAnimFrom = "0";
      dashAnimTo = "-30";
      break;

    case "up":
      x1 = cx;
      y1 = height;
      x2 = cx;
      y2 = 0;
      dashAnimFrom = "0";
      dashAnimTo = "30";
      break;

    default:
      x1 = 0;
      y1 = cy;
      x2 = width;
      y2 = cy;
      dashAnimFrom = "0";
      dashAnimTo = "-30";
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* BODY */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="10"
        fill="#111"
        stroke="#00bfff"
        strokeWidth="2"
      />

      {/* UV CORE */}
      <rect
        x="10"
        y="15"
        width={width - 20}
        height={height - 30}
        rx="8"
        fill={active ? "#4fc3f7" : "#263238"}
        opacity={active ? 0.85 : 0.3}
      >
        {active && (
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="1.5s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* TEXT */}
      <text
        x={width / 2}
        y={height / 2 + (subText ? -2 : 5)}
        textAnchor="middle"
        fill={textColor}
        fontSize={textSize}
        fontWeight={textWeight}
        fontFamily={fontFamily}
      >
        {text}
      </text>

      {/* SUB TEXT */}
      {subText && (
        <text
          x={width / 2}
          y={height / 2 + 12}
          textAnchor="middle"
          fill={subTextColor}
          fontSize={subTextSize}
          fontWeight={subTextWeight}
          fontFamily={fontFamily}
        >
          {subText}
        </text>
      )}

      {/* FLOW LINE */}
      {flowActive && (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={flowColor}
          strokeWidth="3"
          strokeDasharray="8 6"
          opacity={active ? 1 : 0.4}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={dashAnimFrom}
            to={dashAnimTo}
            dur="0.8s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* LABEL */}
      <text
        x={width / 2}
        y={-8}
        textAnchor="middle"
        fill={labelColor}
        fontSize={labelSize}
        fontWeight={labelWeight}
        fontFamily={fontFamily}
      >
        {label}
      </text>

      {/* STATUS */}
      {showStatus && (
        <text
          x={width / 2}
          y={height + 14}
          textAnchor="middle"
          fill={active ? "#00ff00" : "#ff1744"}
          fontSize={statusSize}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          {active ? "RUN" : "STOP"}
        </text>
      )}

      {/* STATUS LED */}
      <circle
        cx={width - 15}
        cy={15}
        r="5"
        fill={active ? "#00ff00" : "#ff1744"}
      >
        {active && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </g>
  );
};

export default UV;
