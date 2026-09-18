import { useEffect, useState } from "react";

export default function TextInputSvg({
  x = 0,
  y = 0,

  width = 220,
  height = 40,

  title = "",

  value = "",
  placeholder = "Input...",

  onChange = () => {},

  // warna
  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  titleColor = "#94a3b8",
  valueColor = "#22c55e",
  placeholderColor = "#64748b",

  // font
  fontFamily = "Segoe UI",
  fontWeight = "normal",

  titleFontSize = 11,
  valueFontSize = 14,

  radius = 8,

  disabled = false,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PANEL */}
      <rect
        width={width}
        height={height}
        rx={radius}
        fill={panelColor}
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* TITLE */}
      <text
        x={10}
        y={15}
        fill={titleColor}
        fontSize={titleFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {title}
      </text>

      {/* INPUT */}
      <foreignObject x={10} y={18} width={width - 20} height={20}>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",

            color: valueColor,

            fontFamily,
            fontWeight,
            fontSize: valueFontSize,

            padding: 0,
          }}
        />
      </foreignObject>
    </g>
  );
}
/*
<TextInputSvg
  x={20}
  y={40}

  title="DEVICE ID"

  value={deviceId}
  onChange={setDeviceId}

  width={250}

  placeholder="RO_BARATA_1"

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  borderColor="#38bdf8"
/>
*/
