import { useState } from "react";
import ButtonBase from "./ButtonBase";

export default function EmergencyStop({
  x = 0,
  y = 0,
  width = 120,
  height = 40,
  labelOn = "EMERGENCY ON",
  labelOff = "EMERGENCY OFF",
  fontSize = 10,
  onToggle = () => {},
  disabled = false,
}) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    const newState = !active;
    setActive(newState);

    onToggle(newState);
  };

  return (
    <ButtonBase
      x={x}
      y={y}
      width={width}
      height={height}
      label={active ? labelOn : labelOff}
      fontSize={fontSize}
      onClick={handleClick}
      disabled={disabled}
      backgroundColor={active ? "#dc2626" : "#374151"} // ON merah, OFF abu
      pressedColor={active ? "#991b1b" : "#1f2937"}
      borderColor={active ? "#facc15" : "#6b7280"}
      labelColor="#ffffff"
    />
  );
}
