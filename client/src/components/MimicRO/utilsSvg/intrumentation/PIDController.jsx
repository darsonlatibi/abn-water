import React, { useMemo, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const PIDController = ({
  x = 0,
  y = 0,

  width = 160,
  height = 130,

  tag = "PIC-101",
  label = "PID CONTROLLER",

  pv = 50,
  sp = 60,
  cv = 40,

  mode = "AUTO",
  status = "RUN",

  alarm = false,

  onModeChange,
  onSPChange,

  history = [], // PV trend

  fontFamily = "Arial",
}) => {
  const [dragSP, setDragSP] = useState(false);

  const modeColor =
    mode === "AUTO"
      ? "#28a745"
      : mode === "MAN"
        ? "#ffc107"
        : mode === "CAS"
          ? "#17a2b8"
          : "#666";

  const statusColor =
    status === "RUN" ? "#28a745" : status === "HOLD" ? "#ffc107" : "#dc3545";

  const scaleY = (v) => 40 - (v / 100) * 40;

  const trendPath = useMemo(() => {
    if (!history.length) return "";

    const step = 3;
    return history
      .slice(-40)
      .map((v, i) => {
        const x = -60 + i * step;
        const y = 20 - v * 0.3;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [history]);

  const handleClickMode = () => {
    if (!onModeChange) return;
    const next = mode === "AUTO" ? "MAN" : "AUTO";
    onModeChange(next);
  };

  const handleSPDrag = (e) => {
    if (!dragSP || mode !== "MAN") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const newSP = clamp(100 - (y / rect.height) * 100, 0, 100);

    onSPChange?.(parseFloat(newSP.toFixed(1)));
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* LABEL */}
      <text
        x="0"
        y={-70}
        textAnchor="middle"
        fill="#00bfff"
        fontWeight="bold"
        fontSize="11"
      >
        {label}
      </text>

      {/* BODY */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx="10"
        fill="#0f0f0f"
        stroke={alarm ? "#dc3545" : "#333"}
        strokeWidth="2"
      >
        {alarm && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* TAG */}
      <text x="0" y={-50} textAnchor="middle" fill="#aaa" fontSize="10">
        {tag}
      </text>

      {/* PV / SP / CV */}
      <text x="-65" y="-20" fill="#00bfff" fontSize="10">
        PV: {pv}
      </text>

      <text x="-65" y="0" fill="#ffc107" fontSize="10">
        SP: {sp}
      </text>

      <text x="-65" y="20" fill="#28a745" fontSize="10">
        OUT: {cv}%
      </text>

      {/* MINI TREND */}
      <path d={trendPath} fill="none" stroke="#00bfff" strokeWidth="1.5" />

      {/* SP LINE */}
      <line
        x1="-60"
        y1={scaleY(sp)}
        x2="60"
        y2={scaleY(sp)}
        stroke="#ffc107"
        strokeDasharray="3,2"
      />

      {/* PV DOT */}
      <circle cx="50" cy={scaleY(pv)} r="3" fill="#00bfff" />

      {/* MODE BUTTON */}
      <rect
        x={-70}
        y={45}
        width="55"
        height="18"
        rx="4"
        fill={modeColor}
        onClick={handleClickMode}
        style={{ cursor: "pointer" }}
      />
      <text
        x={-42}
        y={58}
        textAnchor="middle"
        fontSize="10"
        fill="#000"
        fontWeight="bold"
      >
        {mode}
      </text>

      {/* STATUS */}
      <rect x={20} y={45} width="55" height="18" rx="4" fill={statusColor} />
      <text
        x={48}
        y={58}
        textAnchor="middle"
        fontSize="10"
        fill="#000"
        fontWeight="bold"
      >
        {status}
      </text>

      {/* SP DRAG AREA */}
      <rect
        x="-80"
        y="-60"
        width="160"
        height="120"
        fill="transparent"
        onMouseDown={() => setDragSP(true)}
        onMouseUp={() => setDragSP(false)}
        onMouseMove={handleSPDrag}
        style={{ cursor: mode === "MAN" ? "ns-resize" : "default" }}
      />
    </g>
  );
};

export default PIDController;

{
  /* <PIDController
  x={200}
  y={150}
  tag="PIC-101"
  pv={45}
  sp={60}
  cv={38}
  mode="AUTO"
  status="RUN"
  history={[40,42,45,47,50,55,60,58,54,50]}

  onModeChange={(m) => console.log("mode:", m)}
  onSPChange={(v) => console.log("SP:", v)}
/> */
}
