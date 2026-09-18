import ButtonBase from "./ButtonBase";
export default function StartButton({
  x = 0,
  y = 0,
  width = 100,
  height = 40,
  label = "START",
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
      backgroundColor="#16a34a" // hijau
      pressedColor="#15803d"
      borderColor="#22c55e"
      labelColor="#ffffff"
    />
  );
}
