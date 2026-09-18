import ButtonBase from "./ButtonBase";
export default function StopButton({
  x = 0,
  y = 0,
  width = 100,
  height = 40,
  label = "STOP",
  fontSize = "10",
  onClick = () => {},
  disabled = false,
}) {
  return (
    <ButtonBase
      x={x}
      y={y}
      width={width}
      height={height}
      label={label}
      fontSize={fontSize}
      onClick={onClick}
      disabled={disabled}
      backgroundColor="#dc2626" // merah
      pressedColor="#991b1b"
      borderColor="#ef4444"
      labelColor="#ffffff"
    />
  );
}
