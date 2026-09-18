// SliderSvg.jsx

import { useEffect, useState } from "react";

export default function SliderSvg({
  x = 0,
  y = 0,

  width = 220,
  height = 40,

  title = "SLIDER",

  value = 0,
  onChange = () => {},

  min = 0,
  max = 100,
  step = 1,

  showValue = true,
  unit = "",

  // warna
  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  trackColor = "#1e293b",
  fillColor = "#22c55e",

  thumbColor = "#ffffff",

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
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const percent = ((sliderValue - min) / (max - min)) * 100;

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

      {/* VALUE */}
      {showValue && (
        <text
          x={width - 10}
          y={15}
          textAnchor="end"
          fill={valueColor}
          fontSize={valueFontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
        >
          {sliderValue}
          {unit}
        </text>
      )}

      {/* TRACK */}
      <rect
        x={10}
        y={25}
        width={width - 20}
        height={8}
        rx={4}
        fill={trackColor}
      />

      {/* FILL */}
      <rect
        x={10}
        y={25}
        width={((width - 20) * percent) / 100}
        height={8}
        rx={4}
        fill={fillColor}
      />

      {/* HTML RANGE */}
      <foreignObject x={10} y={18} width={width - 20} height={20}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          disabled={disabled}
          onChange={(e) => {
            const v = Number(e.target.value);

            setSliderValue(v);

            onChange(v);
          }}
          style={{
            width: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </foreignObject>

      {/* THUMB */}
      <circle
        cx={10 + ((width - 20) * percent) / 100}
        cy={29}
        r={7}
        fill={thumbColor}
        stroke={borderColor}
        strokeWidth={2}
      />
    </g>
  );
}

/*
Setpoint Pressure
<SliderSvg
  title="PRESSURE SP"

  value={pressureSP}
  onChange={setPressureSP}

  min={0}
  max={15}
  step={0.1}

  unit=" bar"

  width={250}

  panelColor="#1e293b"
  borderColor="#38bdf8"

  fillColor="#22c55e"

  fontWeight="bold"
/>

Flow Rate
<SliderSvg
  title="FLOW"

  value={flow}
  onChange={setFlow}

  min={0}
  max={100}

  unit="%"

  fillColor="#3b82f6"
/>

VFD Speed
<SliderSvg
  title="VFD SPEED"

  value={frequency}
  onChange={setFrequency}

  min={0}
  max={50}

  unit=" Hz"

  fillColor="#f59e0b"

  width={260}
/>

Dosing Pump
<SliderSvg
  title="DOSING"

  value={dosing}
  onChange={setDosing}

  min={0}
  max={100}

  unit="%"

  fillColor="#ef4444"
/>
*/
