import React, { useState } from "react";

/* =========================================================
 * BUTTON BASE PROPS
 * ========================================================= */

export interface ButtonBaseProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  label?: string;

  radius?: number;

  backgroundColor?: string;
  pressedColor?: string;
  borderColor?: string;
  labelColor?: string;

  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;

  disabled?: boolean;

  cursor?: React.CSSProperties["cursor"];
  hoverCursor?: React.CSSProperties["cursor"];

  onClick?: () => void;
}

/* =========================================================
 * BUTTON BASE
 * ========================================================= */

function ButtonBase({
  x = 0,
  y = 0,

  width = 100,
  height = 40,

  label = "BUTTON",

  radius = 8,

  backgroundColor = "#1e293b",
  pressedColor = "#0f172a",
  borderColor = "#38bdf8",
  labelColor = "#ffffff",

  fontSize = 14,
  fontFamily = "Segoe UI",
  fontWeight = "bold",

  disabled = false,

  cursor = "pointer",
  hoverCursor = "pointer",

  onClick,
}: ButtonBaseProps) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* =======================================================
   * CLICK
   * ======================================================= */

  const handleClick = (event: React.MouseEvent<SVGRectElement>) => {
    event.stopPropagation();

    console.log("🟢 ButtonBase CLICK:", label);

    if (disabled) {
      console.log("⚠️ Button disabled:", label);
      return;
    }

    onClick?.();
  };

  /* =======================================================
   * POINTER DOWN
   * ======================================================= */

  const handlePointerDown = (event: React.PointerEvent<SVGRectElement>) => {
    event.stopPropagation();

    if (disabled) return;

    setPressed(true);
  };

  /* =======================================================
   * POINTER UP
   * ======================================================= */

  const handlePointerUp = (event: React.PointerEvent<SVGRectElement>) => {
    event.stopPropagation();

    if (disabled) return;

    setPressed(false);
  };

  /* =======================================================
   * POINTER ENTER
   * ======================================================= */

  const handlePointerEnter = () => {
    if (disabled) return;

    setHovered(true);
  };

  /* =======================================================
   * POINTER LEAVE
   * ======================================================= */

  const handlePointerLeave = () => {
    setHovered(false);
    setPressed(false);
  };

  /* =======================================================
   * BUTTON COLOR
   * ======================================================= */

  const fillColor = disabled
    ? "#475569"
    : pressed
      ? pressedColor
      : backgroundColor;

  /* =======================================================
   * CURSOR
   * ======================================================= */

  const currentCursor = disabled
    ? "not-allowed"
    : hovered
      ? hoverCursor
      : cursor;

  /* =======================================================
   * RENDER
   * ======================================================= */

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {/* ===================================================
       * SHADOW
       * =================================================== */}

      <rect
        x={2}
        y={2}
        width={width}
        height={height}
        rx={radius}
        fill="#000000"
        opacity={0.3}
        pointerEvents="none"
      />

      {/* ===================================================
       * CLICKABLE BUTTON AREA
       * =================================================== */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill={fillColor}
        stroke={borderColor}
        strokeWidth={2}
        style={{
          cursor: currentCursor,
        }}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />

      {/* ===================================================
       * LABEL
       * =================================================== */}

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

export default ButtonBase;
