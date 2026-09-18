import { useState } from "react";

/* =========================================================
 * SCADA GLOBAL TYPE
 * ========================================================= */

declare global {
  interface Window {
    SCADA?: {
      writeTag?: (tag: string, value: boolean) => void;
    };
  }
}

/* =========================================================
 * SELECTOR PROPS
 * ========================================================= */

export interface SelectorProps {
  /* -------------------------------------------------------
   * POSITION
   * ------------------------------------------------------- */

  x?: number;
  y?: number;

  /* -------------------------------------------------------
   * SIZE
   * ------------------------------------------------------- */

  width?: number;
  height?: number;
  radius?: number;

  /* -------------------------------------------------------
   * SCADA TAG
   * ------------------------------------------------------- */

  tag?: string;

  /* -------------------------------------------------------
   * TITLE
   * ------------------------------------------------------- */

  label?: string;

  /* -------------------------------------------------------
   * SELECTOR LABEL
   * ------------------------------------------------------- */

  leftLabel?: string;
  rightLabel?: string;

  /* -------------------------------------------------------
   * COLORS
   * ------------------------------------------------------- */

  backgroundColor?: string;

  leftColor?: string;
  rightColor?: string;

  borderColor?: string;

  labelColor?: string;
  activeLabelColor?: string;

  /* -------------------------------------------------------
   * TYPOGRAPHY
   * ------------------------------------------------------- */

  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;

  /* -------------------------------------------------------
   * STATE
   *
   * false = AUTO
   * true  = MAN
   * ------------------------------------------------------- */

  value?: boolean;

  /* -------------------------------------------------------
   * CALLBACK
   * ------------------------------------------------------- */

  onChange?: (state: boolean) => void;
  onClick?: (state: boolean) => void;
}

/* =========================================================
 * SELECTOR
 *
 * Two-position SCADA selector
 *
 * false = AUTO
 * true  = MAN
 *
 * ========================================================= */

function Selector({
  /* -------------------------------------------------------
   * POSITION
   * ------------------------------------------------------- */

  x = 0,
  y = 0,

  /* -------------------------------------------------------
   * SIZE
   * ------------------------------------------------------- */

  width = 150,
  height = 50,
  radius = 5,

  /* -------------------------------------------------------
   * SCADA TAG
   * ------------------------------------------------------- */

  tag = "",

  /* -------------------------------------------------------
   * TITLE
   * ------------------------------------------------------- */

  label = "MODE",

  /* -------------------------------------------------------
   * LABEL
   * ------------------------------------------------------- */

  leftLabel = "AUTO",
  rightLabel = "MAN",

  /* -------------------------------------------------------
   * COLORS
   * ------------------------------------------------------- */

  backgroundColor = "#1e293b",

  leftColor = "#2563eb",
  rightColor = "#f97316",

  borderColor = "#64748b",

  labelColor = "#94a3b8",
  activeLabelColor = "#ffffff",

  /* -------------------------------------------------------
   * TYPOGRAPHY
   * ------------------------------------------------------- */

  fontSize = 16,
  fontFamily = "Inter, Segoe UI, Arial, sans-serif",
  fontWeight = "bold",

  /* -------------------------------------------------------
   * STATE
   * ------------------------------------------------------- */

  value,

  /* -------------------------------------------------------
   * CALLBACK
   * ------------------------------------------------------- */

  onChange,
  onClick,
}: SelectorProps) {
  /* =======================================================
   * INTERNAL STATE
   * ======================================================= */

  const [internalState, setInternalState] = useState(false);

  /* =======================================================
   * CONTROLLED / UNCONTROLLED
   * ======================================================= */

  const state = value !== undefined ? value : internalState;

  /* =======================================================
   * CURRENT STATE
   * ======================================================= */

  const currentLabel = state ? rightLabel : leftLabel;
  const currentColor = state ? rightColor : leftColor;

  /* =======================================================
   * SELECTOR HANDLER
   * ======================================================= */

  const handleSelect = () => {
    const nextState = !state;

    /* -----------------------------------------------------
     * INTERNAL STATE
     * ----------------------------------------------------- */

    if (value === undefined) {
      setInternalState(nextState);
    }

    /* -----------------------------------------------------
     * SCADA WRITE
     *
     * false = AUTO
     * true  = MAN
     * ----------------------------------------------------- */

    if (tag && window.SCADA?.writeTag) {
      window.SCADA.writeTag(tag, nextState);
    }

    /* -----------------------------------------------------
     * CALLBACK
     * ----------------------------------------------------- */

    onChange?.(nextState);
    onClick?.(nextState);
  };

  /* =======================================================
   * POINTER HANDLER
   * ======================================================= */

  const handlePointerDown = (event: React.PointerEvent<SVGGElement>) => {
    event.stopPropagation();
  };

  /* =======================================================
   * ACTIVE SELECTOR RADIUS
   *
   * Jangan lebih besar dari setengah tinggi selector.
   * ======================================================= */

  const activeRadius = Math.min(radius, (height - 4) / 2);

  /* =======================================================
   * RENDER
   * ======================================================= */

  return (
    <g
      transform={`translate(${x}, ${y})`}
      pointerEvents="all"
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onClick={handleSelect}
      role="button"
      aria-label={label}
      aria-pressed={state}
    >
      {/* =================================================
       * TOOLTIP
       * ================================================= */}

      <title>
        {label}: {currentLabel}
      </title>

      {/* =================================================
       * TITLE
       * ================================================= */}

      <text
        x={0}
        y={-8}
        fill={labelColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        pointerEvents="none"
      >
        {label}
      </text>

      {/* =================================================
       * OUTER BODY
       * ================================================= */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={2}
        pointerEvents="none"
      />

      {/* =================================================
       * ACTIVE SELECTOR
       * ================================================= */}

      <rect
        x={state ? width / 2 : 2}
        y={2}
        width={width / 2 - 2}
        height={height - 4}
        rx={activeRadius}
        fill={currentColor}
        pointerEvents="none"
      />

      {/* =================================================
       * LEFT LABEL
       * ================================================= */}

      <text
        x={width / 4}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={!state ? activeLabelColor : labelColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        pointerEvents="none"
      >
        {leftLabel}
      </text>

      {/* =================================================
       * RIGHT LABEL
       * ================================================= */}

      <text
        x={(width * 3) / 4}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={state ? activeLabelColor : labelColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        pointerEvents="none"
      >
        {rightLabel}
      </text>

      {/* =================================================
       * HIT AREA
       * ================================================= */}

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={radius}
        fill="transparent"
        pointerEvents="all"
      />
    </g>
  );
}

export default Selector;
