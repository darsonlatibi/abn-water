import { useMemo } from "react";

export default function GaugeSvg({
  x = 0,
  y = 0,

  radius = 80,

  title = "PRESSURE",
  unit = "bar",

  min = 0,
  max = 16,

  value = 8,

  backgroundColor = "#0f172a",
  borderColor = "#38bdf8",

  gaugeColor = "#334155",
  needleColor = "#22c55e",
  textColor = "#ffffff",
  titleColor = "#94a3b8",

  strokeWidth = 10,

  fontFamily = "Segoe UI",
  fontWeight = "bold",

  titleFontSize = 12,
  valueFontSize = 24,
  unitFontSize = 12,
}) {
  //------------------------------------
  // clamp value
  //------------------------------------

  const pv = useMemo(() => {
    return Math.min(max, Math.max(min, value));
  }, [value, min, max]);

  //------------------------------------
  // angle
  //------------------------------------

  const angle = useMemo(() => {
    return ((pv - min) / (max - min)) * 270 - 135;
  }, [pv, min, max]);

  //------------------------------------
  // needle
  //------------------------------------

  const x2 = radius + Math.cos((angle * Math.PI) / 180) * (radius - 25);

  const y2 = radius + Math.sin((angle * Math.PI) / 180) * (radius - 25);

  //------------------------------------

  return (
    <g transform={`translate(${x},${y})`}>
      {/* BODY */}

      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth="2"
      />

      {/* RING */}

      <circle
        cx={radius}
        cy={radius}
        r={radius - 8}
        fill="none"
        stroke={gaugeColor}
        strokeWidth={strokeWidth}
      />

      {/* NEEDLE */}

      <line
        x1={radius}
        y1={radius}
        x2={x2}
        y2={y2}
        stroke={needleColor}
        strokeWidth="4"
      />

      {/* CENTER */}

      <circle cx={radius} cy={radius} r="8" fill={needleColor} />

      {/* TITLE */}

      <text
        x={radius}
        y={20}
        textAnchor="middle"
        fill={titleColor}
        fontSize={titleFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {title}
      </text>

      {/* VALUE */}

      <text
        x={radius}
        y={radius + 10}
        textAnchor="middle"
        fill={needleColor}
        fontSize={valueFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {pv.toFixed(1)}
      </text>

      {/* UNIT */}

      <text
        x={radius}
        y={radius + 30}
        textAnchor="middle"
        fill={textColor}
        fontSize={unitFontSize}
      >
        {unit}
      </text>

      {/* MIN */}

      <text x={10} y={radius * 2 - 10} fill={textColor} fontSize="12">
        {min}
      </text>

      {/* MAX */}

      <text
        x={radius * 2 - 20}
        y={radius * 2 - 10}
        fill={textColor}
        fontSize="12"
      >
        {max}
      </text>
    </g>
  );
}

/*
<GaugeSvg
  x={50}
  y={50}

  title="PT-101"

  unit="bar"

  min={0}
  max={16}

  value={pressure}
/>

<GaugeSvg
  x={250}
  y={50}

  title="AIT-101"

  unit="uS/cm"

  min={0}
  max={200}

  value={conductivity}

  needleColor="#f59e0b"
/>
*/
