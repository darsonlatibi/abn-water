// DateInputSvg.jsx

import { useEffect, useState } from "react";

export default function DateInputSvg({
  x = 0,
  y = 0,

  width = 220,
  height = 40,

  title = "DATE",

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
          type="date"
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
Historian
<DateInputSvg
  x={20}
  y={20}

  title="FROM DATE"

  value={fromDate}
  onChange={setFromDate}

  width={250}

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  borderColor="#38bdf8"
/>


Report
<DateInputSvg
  title="REPORT DATE"

  value={reportDate}
  onChange={setReportDate}

  width={220}

  panelColor="#0f172a"
  borderColor="#22c55e"

  valueColor="#22c55e"

  fontWeight="bold"
/>


Maintenance
<DateInputSvg
  title="CALIBRATION DATE"

  value={calibrationDate}
  onChange={setCalibrationDate}

  width={260}
/>

Default hari ini
const today = new Date().toISOString().split("T")[0];

<DateInputSvg
  title="DATE"
  value={today}
  onChange={setDate}
/>
*/
