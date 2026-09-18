import React, { useMemo, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const PIDController3 = ({
  x = 0,
  y = 0,

  width = 180,
  height = 140,

  tag = "PIC-101",
  label = "PH CONTROL",

  pv = 50,
  sp = 60,
  cv = 40,

  mode = "AUTO", // AUTO | MAN | CAS | OFF
  status = "RUN", // RUN | HOLD | ALARM

  alarm = false,
  ack = false,

  interlock = false,

  history = [],

  onModeChange,
  onSPChange,
  onACK,

  fontFamily = "Arial",
}) => {
  const [spLocal, setSpLocal] = useState(sp);
  const [ackLocal, setAckLocal] = useState(false);

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

  const isAlarmActive = alarm && !ackLocal;

  const trendPath = useMemo(() => {
    if (!history.length) return "";
    return history
      .slice(-50)
      .map((v, i) => {
        const x = -70 + i * 3;
        const y = 30 - v * 0.35;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [history]);

  const scaleY = (v) => 40 - (v / 100) * 40;

  const handleMode = () => {
    const next =
      mode === "AUTO"
        ? "MAN"
        : mode === "MAN"
          ? "CAS"
          : mode === "CAS"
            ? "OFF"
            : "AUTO";

    onModeChange?.(next);
  };

  const handleACK = () => {
    setAckLocal(true);
    onACK?.(true);
  };

  const handleSPDrag = (e) => {
    if (mode !== "MAN") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const newSP = clamp(100 - (y / rect.height) * 100, 0, 100);

    setSpLocal(newSP);
    onSPChange?.(parseFloat(newSP.toFixed(1)));
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* ===== FACEPLATE WINDOW ===== */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx="10"
        fill="#0b0b0b"
        stroke={isAlarmActive ? "#dc3545" : "#333"}
        strokeWidth="2"
      >
        {isAlarmActive && (
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur="0.6s"
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* TITLE BAR */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height="22"
        fill="#111"
      />

      <text
        x="0"
        y={-58}
        textAnchor="middle"
        fill="#00bfff"
        fontSize="11"
        fontWeight="bold"
      >
        {tag} - {label}
      </text>

      {/* ===== PV / SP / OUT ===== */}
      <text x="-80" y="-25" fill="#00bfff" fontSize="10">
        PV: {pv.toFixed(2)}
      </text>

      <text x="-80" y="-5" fill="#ffc107" fontSize="10">
        SP: {spLocal.toFixed(2)}
      </text>

      <text x="-80" y="15" fill="#28a745" fontSize="10">
        OUT: {cv.toFixed(1)}%
      </text>

      {/* ===== TREND ===== */}
      <path d={trendPath} fill="none" stroke="#00bfff" strokeWidth="1.5" />

      {/* SP LINE */}
      <line
        x1="-70"
        y1={scaleY(spLocal)}
        x2="70"
        y2={scaleY(spLocal)}
        stroke="#ffc107"
        strokeDasharray="4,3"
      />

      {/* PV DOT */}
      <circle cx="60" cy={scaleY(pv)} r="3" fill="#00bfff" />

      {/* ===== MODE BUTTON ===== */}
      <rect
        x={-80}
        y={45}
        width="50"
        height="18"
        rx="4"
        fill={modeColor}
        onClick={handleMode}
        style={{ cursor: "pointer" }}
      />
      <text
        x={-55}
        y={58}
        textAnchor="middle"
        fontSize="10"
        fill="#000"
        fontWeight="bold"
      >
        {mode}
      </text>

      {/* ===== STATUS ===== */}
      <rect x={-20} y={45} width="50" height="18" rx="4" fill={statusColor} />
      <text
        x={5}
        y={58}
        textAnchor="middle"
        fontSize="10"
        fill="#000"
        fontWeight="bold"
      >
        {status}
      </text>

      {/* ===== ACK BUTTON ===== */}
      <rect
        x={40}
        y={45}
        width="40"
        height="18"
        rx="4"
        fill={ackLocal ? "#555" : "#dc3545"}
        onClick={handleACK}
        style={{ cursor: "pointer" }}
      />
      <text
        x={60}
        y={58}
        textAnchor="middle"
        fontSize="9"
        fill="#fff"
        fontWeight="bold"
      >
        ACK
      </text>

      {/* ===== INTERLOCK ===== */}
      {interlock && (
        <text
          x="0"
          y="-35"
          textAnchor="middle"
          fill="#ff8800"
          fontSize="10"
          fontWeight="bold"
        >
          INTERLOCK ACTIVE
        </text>
      )}

      {/* ===== SP DRAG AREA ===== */}
      <rect
        x={-80}
        y={-60}
        width={160}
        height={120}
        fill="transparent"
        onMouseDown={() => {}}
        onMouseMove={handleSPDrag}
        style={{
          cursor: mode === "MAN" ? "ns-resize" : "default",
        }}
      />
    </g>
  );
};

export default PIDController3;
