// DateTimeInputSvg.jsx

import { useEffect, useState } from "react";

export default function DateTimeInputSvg({
  x = 0,
  y = 0,

  width = 240,
  height = 40,

  title = "DATE TIME",

  value = "",
  onChange = () => {},

  // warna
  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  titleColor = "#94a3b8",
  valueColor = "#22c55e",

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
          type="datetime-local"
          value={inputValue}
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
<DateTimeInputSvg
  x={20}
  y={20}

  title="START TIME"

  value={startTime}
  onChange={setStartTime}

  width={260}

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  borderColor="#38bdf8"
/>

<DateTimeInputSvg
  title="END TIME"

  value={endTime}
  onChange={setEndTime}

  width={260}

  panelColor="#0f172a"
  borderColor="#22c55e"

  valueColor="#22c55e"

  fontWeight="bold"
/>

const now = new Date().toISOString().slice(0, 16);
<DateTimeInputSvg
  title="REPORT DATE"
  value={now}
  onChange={setReportDate}
/>
*/
