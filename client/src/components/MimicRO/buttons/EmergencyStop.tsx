import ButtonBase, { type ButtonBaseProps } from "./ButtonBase";

/* =========================================================
 * EMERGENCY STOP PROPS
 * ========================================================= */

export interface EmergencyStopProps extends ButtonBaseProps {
  /* Position */
  x?: number;
  y?: number;

  /* Size */
  width?: number;
  height?: number;

  /* Appearance */
  radius?: number;
  fontSize?: number;

  /* Text */
  label?: string;

  /* Colors */
  backgroundColor?: string;
  pressedColor?: string;
  borderColor?: string;
  labelColor?: string;
}

/* =========================================================
 * EMERGENCY STOP
 * ========================================================= */

function EmergencyStop({
  /* -------------------------------------------------------
   * POSITION
   * ------------------------------------------------------- */

  x = 0,
  y = 0,

  /* -------------------------------------------------------
   * SIZE
   * ------------------------------------------------------- */

  width = 140,
  height = 60,

  /* -------------------------------------------------------
   * STYLE
   * ------------------------------------------------------- */

  radius = 8,
  fontSize = 18,

  /* -------------------------------------------------------
   * LABEL
   * ------------------------------------------------------- */

  label = "EMERGENCY",

  /* -------------------------------------------------------
   * COLORS
   * ------------------------------------------------------- */

  backgroundColor = "#dc2626",
  pressedColor = "#991b1b",
  borderColor = "#facc15",
  labelColor = "#ffffff",

  /* -------------------------------------------------------
   * OTHER BUTTON BASE PROPS
   * ------------------------------------------------------- */

  ...props
}: EmergencyStopProps) {
  return (
    <ButtonBase
      {...props}
      /* Position */
      x={x}
      y={y}
      /* Size */
      width={width}
      height={height}
      /* Appearance */
      radius={radius}
      fontSize={fontSize}
      /* Colors */
      backgroundColor={backgroundColor}
      pressedColor={pressedColor}
      borderColor={borderColor}
      labelColor={labelColor}
      /* Label */
      label={label}
    />
  );
}

export default EmergencyStop;
