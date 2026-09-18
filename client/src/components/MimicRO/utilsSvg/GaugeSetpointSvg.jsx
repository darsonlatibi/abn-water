import { useMemo } from "react";

export default function GaugeSetpointSvg({
  x = 0,
  y = 0,

  radius = 80,

  min = 0,
  max = 100,

  value = 50,
  setpoint = 70,

  title = "PRESSURE",

  unit = "bar",

  backgroundColor = "#0f172a",
  borderColor = "#38bdf8",

  gaugeColor = "#334155",
  valueColor = "#22c55e",
  setpointColor = "#f59e0b",

  titleColor = "#94a3b8",
  textColor = "#ffffff",

  fontFamily = "Segoe UI",
  fontWeight = "bold",

  titleFontSize = 12,
  valueFontSize = 22,
  unitFontSize = 12,

  strokeWidth = 12,

  onSetpointChange = () => {},
}) {
  //-----------------------------------
  // angle
  //-----------------------------------

  const valueAngle = useMemo(() => {
    return ((value - min) / (max - min)) * 270 - 135;
  }, [value, min, max]);

  const setpointAngle = useMemo(() => {
    return ((setpoint - min) / (max - min)) * 270 - 135;
  }, [setpoint, min, max]);

  //-----------------------------------
  // needle
  //-----------------------------------

  const valueX =
    radius + Math.cos((valueAngle * Math.PI) / 180) * (radius - 25);

  const valueY =
    radius + Math.sin((valueAngle * Math.PI) / 180) * (radius - 25);

  const spX = radius + Math.cos((setpointAngle * Math.PI) / 180) * radius;

  const spY = radius + Math.sin((setpointAngle * Math.PI) / 180) * radius;

  //-----------------------------------

  return (
    <g transform={`translate(${x},${y})`}>
      {/* body */}

      <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth="2"
      />

      {/* gauge ring */}

      <circle
        cx={radius}
        cy={radius}
        r={radius - 10}
        fill="none"
        stroke={gaugeColor}
        strokeWidth={strokeWidth}
      />

      {/* setpoint marker */}

      <circle
        cx={spX}
        cy={spY}
        r="7"
        fill={setpointColor}
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          let sp = prompt("Setpoint", setpoint);

          if (sp !== null) onSetpointChange(Number(sp));
        }}
      />

      {/* needle */}

      <line
        x1={radius}
        y1={radius}
        x2={valueX}
        y2={valueY}
        stroke={valueColor}
        strokeWidth="4"
      />

      {/* center */}

      <circle cx={radius} cy={radius} r="8" fill={valueColor} />

      {/* title */}

      <text
        x={radius}
        y={25}
        textAnchor="middle"
        fill={titleColor}
        fontSize={titleFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {title}
      </text>

      {/* value */}

      <text
        x={radius}
        y={radius + 10}
        textAnchor="middle"
        fill={valueColor}
        fontSize={valueFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {value.toFixed(1)}
      </text>

      {/* unit */}

      <text
        x={radius}
        y={radius + 30}
        textAnchor="middle"
        fill={textColor}
        fontSize={unitFontSize}
      >
        {unit}
      </text>

      {/* SP */}

      <text
        x={radius}
        y={radius + 55}
        textAnchor="middle"
        fill={setpointColor}
        fontSize="14"
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        SP : {setpoint}
      </text>

      {/* min */}

      <text x="10" y={radius * 2 - 10} fill={textColor} fontSize="12">
        {min}
      </text>

      {/* max */}

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
const [pressureSP, setPressureSP] = useState(8);

<GaugeSetpointSvg
  x={50}
  y={50}
  radius={90}

  title="PT-101"

  min={0}
  max={16}

  value={pressure}
  setpoint={pressureSP}

  unit="bar"

  onSetpointChange={setPressureSP}
/>
*/
