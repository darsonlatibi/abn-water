import { useEffect, useState } from "react";

export default function NumberInputSvg({
  x = 0,
  y = 0,

  width = 180,
  height = 40,

  title = "",

  value = 0,
  onChange = () => {},

  min = 0,
  max = 100,
  step = 1,

  // warna
  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  titleColor = "#94a3b8",
  valueColor = "#22c55e",

  buttonColor = "#1e293b",
  buttonTextColor = "#ffffff",

  // font
  fontFamily = "Segoe UI",
  fontWeight = "normal",

  titleFontSize = 11,
  valueFontSize = 15,

  radius = 8,
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const increase = () => {
    const v = Math.min(max, Number(inputValue) + step);

    setInputValue(v);
    onChange(v);
  };

  const decrease = () => {
    const v = Math.max(min, Number(inputValue) - step);

    setInputValue(v);
    onChange(v);
  };

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
      <foreignObject x={10} y={18} width={width - 80} height={20}>
        <input
          type="number"
          value={inputValue}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = Number(e.target.value);

            setInputValue(v);
            onChange(v);
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
          }}
        />
      </foreignObject>

      {/* MINUS */}
      <g
        transform={`translate(${width - 60},8)`}
        style={{ cursor: "pointer" }}
        onClick={decrease}
      >
        <rect
          width={24}
          height={24}
          rx="4"
          fill={buttonColor}
          stroke={borderColor}
        />

        <text
          x={8}
          y={17}
          fill={buttonTextColor}
          fontSize="16"
          fontWeight="bold"
        >
          −
        </text>
      </g>

      {/* PLUS */}
      <g
        transform={`translate(${width - 30},8)`}
        style={{ cursor: "pointer" }}
        onClick={increase}
      >
        <rect
          width={24}
          height={24}
          rx="4"
          fill={buttonColor}
          stroke={borderColor}
        />

        <text
          x={7}
          y={17}
          fill={buttonTextColor}
          fontSize="16"
          fontWeight="bold"
        >
          +
        </text>
      </g>
    </g>
  );
}

/*
<NumberInputSvg
  x={20}
  y={50}
  title="Pressure SP"

  value={pressureSP}
  onChange={setPressureSP}

  min={0}
  max={15}
  step={0.1}

  width={220}

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  borderColor="#38bdf8"
/>
*/
