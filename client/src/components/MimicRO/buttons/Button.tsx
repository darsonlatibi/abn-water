import ButtonBase, { type ButtonBaseProps } from "./ButtonBase";

/* =========================================================
 * BUTTON
 * =========================================================
 *
 * Generic SCADA button.
 *
 * Position, size, shape, typography, colors and behavior
 * are fully dynamic through ButtonBaseProps.
 *
 * The label is the only functional/content difference
 * between START, STOP, RESET, etc.
 * ========================================================= */

function Button({
  x = 0,
  y = 0,

  width = 120,
  height = 50,

  radius = 8,

  label = "BUTTON",

  fontSize = 18,

  backgroundColor = "#1e293b",
  pressedColor = "#0f172a",
  borderColor = "#38bdf8",
  labelColor = "#ffffff",

  ...props
}: ButtonBaseProps) {
  return (
    <ButtonBase
      {...props}
      x={x}
      y={y}
      width={width}
      height={height}
      radius={radius}
      label={label}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      pressedColor={pressedColor}
      borderColor={borderColor}
      labelColor={labelColor}
    />
  );
}

export default Button;
