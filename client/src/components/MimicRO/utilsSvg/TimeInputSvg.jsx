// TimeInputSvg.jsx

import { useEffect, useState } from "react";

export default function TimeInputSvg({
  x = 0,
  y = 0,

  width = 220,
  height = 40,

  title = "TIME",

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

  step = 1, // detik
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
          type="time"
          step={step}
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
Shift Produksi
<TimeInputSvg
  x={20}
  y={20}

  title="SHIFT START"

  value={shiftStart}
  onChange={setShiftStart}

  width={240}

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  borderColor="#38bdf8"
/>

Jadwal Backwash RO
<TimeInputSvg
  title="BACKWASH TIME"

  value={backwashTime}
  onChange={setBackwashTime}

  width={250}

  panelColor="#0f172a"
  borderColor="#22c55e"

  valueColor="#22c55e"

  fontWeight="bold"
/>

Dengan detik (HH:mm:ss)
<TimeInputSvg
  title="FLUSH TIME"

  value={flushTime}
  onChange={setFlushTime}

  step={1}
/>

Default waktu sekarang
const now = new Date()
  .toLocaleTimeString("en-GB")
  .substring(0, 8);

<TimeInputSvg
  title="CURRENT TIME"
  value={now}
  onChange={setCurrentTime}
  step={1}
/>
*/
