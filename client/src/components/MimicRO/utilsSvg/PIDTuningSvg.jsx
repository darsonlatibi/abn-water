import React from "react";

//------------------------------------
// ROW
//------------------------------------

function Row({
  y,
  label,
  value,
  color = "#fff",
  fontFamily,
  fontWeight,
  valueFontSize,
}) {
  return (
    <>
      <text x={15} y={y} fill="#94a3b8" fontSize="13" fontFamily={fontFamily}>
        {label}
      </text>

      <text
        x={130}
        y={y}
        fill={color}
        fontSize={valueFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {value}
      </text>
    </>
  );
}

//------------------------------------
// BUTTON
//------------------------------------

function TuneButton({ x, y, label, onClick }) {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <rect width="22" height="22" rx="4" fill="#334155" stroke="#38bdf8" />

      <text x="11" y="15" textAnchor="middle" fill="#fff" fontWeight="bold">
        {label}
      </text>
    </g>
  );
}
export default function PIDTuningSvg({
  x = 0,
  y = 0,

  width = 320,
  height = 280,

  title = "PID LOOP",

  pv = 7.2,
  sp = 8.0,
  output = 63,

  kp = 2,
  ki = 0.5,
  kd = 0.1,

  mode = "AUTO",

  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  titleColor = "#94a3b8",
  pvColor = "#22c55e",
  spColor = "#f59e0b",
  outputColor = "#38bdf8",

  fontFamily = "Segoe UI",
  fontWeight = "bold",

  titleFontSize = 12,
  valueFontSize = 16,

  onKpChange = () => {},
  onKiChange = () => {},
  onKdChange = () => {},
  onModeChange = () => {},
}) {
  const error = (sp - pv).toFixed(2);

  //------------------------------------
  // MAIN
  //------------------------------------

  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        width={width}
        height={height}
        rx="10"
        fill={panelColor}
        stroke={borderColor}
        strokeWidth="2"
      />

      <text
        x={width / 2}
        y="20"
        textAnchor="middle"
        fill={titleColor}
        fontSize={titleFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {title}
      </text>

      <Row y={50} label="PV" value={pv.toFixed(2)} color={pvColor} />

      <Row y={75} label="SP" value={sp.toFixed(2)} color={spColor} />

      <Row y={100} label="ERROR" value={error} />

      <Row
        y={125}
        label="OUTPUT"
        value={`${output.toFixed(1)} %`}
        color={outputColor}
      />

      <Row
        y={150}
        label="MODE"
        value={mode}
        color={mode === "AUTO" ? "#22c55e" : "#f59e0b"}
      />

      {/* KP */}

      <Row y={185} label="KP" value={kp} />

      <TuneButton
        x={180}
        y={170}
        label="-"
        onClick={() => onKpChange(kp - 0.1)}
      />

      <TuneButton
        x={210}
        y={170}
        label="+"
        onClick={() => onKpChange(kp + 0.1)}
      />

      {/* KI */}

      <Row y={215} label="KI" value={ki} />

      <TuneButton
        x={180}
        y={200}
        label="-"
        onClick={() => onKiChange(ki - 0.01)}
      />

      <TuneButton
        x={210}
        y={200}
        label="+"
        onClick={() => onKiChange(ki + 0.01)}
      />

      {/* KD */}

      <Row y={245} label="KD" value={kd} />

      <TuneButton
        x={180}
        y={230}
        label="-"
        onClick={() => onKdChange(kd - 0.01)}
      />

      <TuneButton
        x={210}
        y={230}
        label="+"
        onClick={() => onKdChange(kd + 0.01)}
      />

      {/* AUTO / MANUAL */}

      <g
        transform="translate(245,170)"
        style={{
          cursor: "pointer",
        }}
        onClick={() => onModeChange(mode === "AUTO" ? "MANUAL" : "AUTO")}
      >
        <rect
          width="60"
          height="30"
          rx="6"
          fill={mode === "AUTO" ? "#22c55e" : "#f59e0b"}
        />

        <text
          x="30"
          y="20"
          textAnchor="middle"
          fill="#fff"
          fontFamily={fontFamily}
          fontWeight="bold"
        >
          {mode}
        </text>
      </g>
    </g>
  );
}

/*
<PIDTuningSvg
  x={50}
  y={50}
  title="PT-101 PRESSURE"

  pv={pressure}
  sp={pressureSP}
  output={valveOutput}

  kp={kp}
  ki={ki}
  kd={kd}

  mode={mode}

  onKpChange={setKp}
  onKiChange={setKi}
  onKdChange={setKd}
  onModeChange={setMode}
/>
*/
