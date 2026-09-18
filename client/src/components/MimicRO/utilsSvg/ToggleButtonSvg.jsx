// ToggleButtonSvg.jsx

import { useEffect, useState } from "react";

export default function ToggleButtonSvg({
  x = 0,
  y = 0,

  width = 80,
  height = 36,

  title = "",

  value = false,
  onChange = () => {},

  onText = "ON",
  offText = "OFF",

  // warna
  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  onColor = "#22c55e",
  offColor = "#475569",

  knobColor = "#ffffff",

  titleColor = "#94a3b8",
  textColor = "#ffffff",

  // font
  fontFamily = "Segoe UI",
  fontWeight = "bold",

  titleFontSize = 11,
  valueFontSize = 12,

  radius = 18,
}) {
  const [checked, setChecked] = useState(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleClick = () => {
    const newValue = !checked;

    setChecked(newValue);

    onChange(newValue);
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* TITLE */}
      {title && (
        <text
          x={0}
          y={-5}
          fill={titleColor}
          fontSize={titleFontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
        >
          {title}
        </text>
      )}

      {/* SWITCH BODY */}
      <g
        style={{
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <rect
          width={width}
          height={height}
          rx={radius}
          fill={checked ? onColor : offColor}
          stroke={borderColor}
          strokeWidth={2}
        />

        {/* TEXT */}
        <text
          x={width / 2}
          y={height / 2 + 4}
          textAnchor="middle"
          fill={textColor}
          fontSize={valueFontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
        >
          {checked ? onText : offText}
        </text>

        {/* KNOB */}
        <circle
          cx={checked ? width - height / 2 : height / 2}
          cy={height / 2}
          r={height / 2 - 4}
          fill={knobColor}
        />
      </g>
    </g>
  );
}
/*
<ToggleButtonSvg
  x={20}
  y={50}

  title="AUTO MODE"

  value={autoMode}
  onChange={setAutoMode}

  width={90}
  height={40}

  onText="AUTO"
  offText="MAN"

  onColor="#22c55e"
  offColor="#64748b"

  borderColor="#38bdf8"

  fontFamily="Segoe UI"
  fontWeight="bold"
/>

<ToggleButtonSvg
  title="FEED PUMP"

  value={feedPumpCmd}

  onChange={(v) => {
    dispatch(
      writeTag({
        deviceId,
        tagNumber: "P-101-CMD",
        value: v,
      })
    );
  }}

  onText="RUN"
  offText="STOP"

  onColor="#16a34a"
  offColor="#dc2626"
/>
*/
