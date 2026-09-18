import { useState } from "react";

export default function ButtonBase({
  x = 0,
  y = 0,

  width = 100,
  height = 40,

  label = "BUTTON",

  onClick = () => {},

  fontSize = 14,
  fontFamily = "Segoe UI",
  fontWeight = "bold",

  labelColor = "#ffffff",

  backgroundColor = "#1e293b",
  pressedColor = "#0f172a",

  borderColor = "#38bdf8",

  radius = 8,

  disabled = false,
}) {
  const [pressed, setPressed] = useState(false);

  const handlePointerDown = () => {
    if (!disabled) {
      setPressed(true);
    }
  };

  const handlePointerUp = () => {
    if (!disabled) {
      setPressed(false);
      onClick();
    }
  };

  const handlePointerLeave = () => {
    setPressed(false);
  };

  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {/* Shadow */}
      <rect
        x={2}
        y={2}
        width={width}
        height={height}
        rx={radius}
        fill="#000"
        opacity={0.3}
        pointerEvents="none"
      />

      {/* Button */}
      <rect
        width={width}
        height={height}
        rx={radius}
        fill={disabled ? "#475569" : pressed ? pressedColor : backgroundColor}
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* Text */}
      <text
        x={width / 2}
        y={height / 2}
        fill={labelColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        textAnchor="middle"
        dominantBaseline="middle"
        pointerEvents="none"
      >
        {label}
      </text>
    </g>
  );
}
/*
<PushButtonSvg
  x={50}
  y={100}
  width={100}
  height={40}
  label="START"
  backgroundColor="#16a34a"
  pressedColor="#15803d"
  borderColor="#22c55e"
  onClick={handleStart}
/>;

<PushButtonSvg
  x={170}
  y={100}
  width={100}
  height={40}
  label="STOP"
  backgroundColor="#dc2626"
  pressedColor="#991b1b"
  borderColor="#ef4444"
  onClick={handleStop}
/>;

<PushButtonSvg
  label="RESET"
  backgroundColor="#ea580c"
  pressedColor="#c2410c"
  borderColor="#fb923c"
/>

<PushButtonSvg
  label="SAVE"
  backgroundColor="#2563eb"
  pressedColor="#1d4ed8"
  borderColor="#60a5fa"
/>
*/
