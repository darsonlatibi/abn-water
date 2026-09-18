import React, { useEffect, useMemo, useRef, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const PIDController4 = ({
  x = 0,
  y = 0,

  width = 190,
  height = 150,

  tag = "PIC-101",
  label = "DIGITAL TWIN PID",

  mode = "AUTO", // AUTO | MAN | CAS | OFF

  sp = 60,
  cv = 40,
  pv = 50,

  tau = 3.0,
  gain = 0.8,
  noise = 1.2,

  onSPChange,
  onModeChange,
}) => {
  const [pvState, setPvState] = useState(pv);
  const [spState, setSpState] = useState(sp);
  const [cvState, setCvState] = useState(cv);
  const [history, setHistory] = useState([]);

  const spRef = useRef(spState);
  const cvRef = useRef(cvState);

  useEffect(() => {
    spRef.current = spState;
    cvRef.current = cvState;
  }, [spState, cvState]);

  // ===== PROCESS SIMULATION =====
  useEffect(() => {
    const interval = setInterval(() => {
      setPvState((prev) => {
        const sp = spRef.current;
        const cv = cvRef.current;

        const disturbance = (Math.random() - 0.5) * noise;

        let target = 0;

        if (mode === "AUTO") {
          // AUTO = PV follow SP (simple controller)
          const error = sp - prev;
          target = prev + error * gain;
        } else if (mode === "MAN") {
          // MAN = operator controls CV
          target = cv;
        } else {
          target = 0;
        }

        const newPv = prev + (target - prev) / tau + disturbance;
        const clamped = clamp(newPv, 0, 100);

        setHistory((h) => [...h.slice(-60), clamped]);

        return clamped;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [mode, tau, gain, noise]);

  // ===== STYLE =====
  const statusColor = Math.abs(pvState - spState) > 10 ? "#dc3545" : "#28a745";

  const modeColor =
    mode === "AUTO"
      ? "#28a745"
      : mode === "MAN"
        ? "#ffc107"
        : mode === "CAS"
          ? "#17a2b8"
          : "#666";

  const scaleY = (v) => 40 - (v / 100) * 40;

  const trendPath = useMemo(() => {
    return history
      .map((v, i) => {
        const x = -75 + i * 3;
        const y = 35 - v * 0.35;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [history]);

  // ===== MODE CHANGE (NEW STYLE) =====
  const setMode = (m) => {
    onModeChange?.(m);
  };

  // ===== SP DRAG =====
  const handleDrag = (e) => {
    if (mode !== "MAN") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const newSP = clamp(100 - (y / rect.height) * 100, 0, 100);

    setSpState(newSP);
    onSPChange?.(newSP);
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* FRAME */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx="12"
        fill="#0a0a0a"
        stroke={statusColor}
        strokeWidth="2"
      />

      {/* TITLE */}
      <text x="0" y={-65} textAnchor="middle" fill="#00bfff" fontSize="11">
        {tag} - {label}
      </text>

      {/* VALUES */}
      <text x="-80" y="-25" fill="#00bfff" fontSize="10">
        PV: {pvState.toFixed(2)}
      </text>

      <text x="-80" y="-5" fill="#ffc107" fontSize="10">
        SP: {spState.toFixed(2)}
      </text>

      <text x="-80" y="15" fill="#28a745" fontSize="10">
        CV: {cvState.toFixed(2)}
      </text>

      {/* TREND */}
      <path d={trendPath} fill="none" stroke="#00bfff" strokeWidth="1.5" />

      {/* SP LINE */}
      <line
        x1="-75"
        y1={scaleY(spState)}
        x2="75"
        y2={scaleY(spState)}
        stroke="#ffc107"
        strokeDasharray="4,3"
      />

      {/* PV */}
      <circle cx="65" cy={scaleY(pvState)} r="3" fill="#00bfff" />

      {/* ===== MODE BUTTONS (INDUSTRIAL STYLE) ===== */}

      {/* AUTO */}
      <rect
        x={-85}
        y={50}
        width="40"
        height="18"
        rx="4"
        fill={mode === "AUTO" ? "#28a745" : "#333"}
        onClick={() => setMode("AUTO")}
        style={{ cursor: "pointer" }}
      />
      <text x={-73} y={63} fontSize="9" fill="#000">
        AUTO
      </text>

      {/* MAN */}
      <rect
        x={-40}
        y={50}
        width="40"
        height="18"
        rx="4"
        fill={mode === "MAN" ? "#ffc107" : "#333"}
        onClick={() => setMode("MAN")}
        style={{ cursor: "pointer" }}
      />
      <text x={-30} y={63} fontSize="9" fill="#000">
        MAN
      </text>

      {/* STATUS */}
      <rect x={5} y={50} width="55" height="18" rx="4" fill={statusColor} />
      <text x={33} y={63} fontSize="10" fill="#000">
        OK
      </text>

      {/* DRAG AREA */}
      <rect
        x={-90}
        y={-70}
        width={180}
        height={140}
        fill="transparent"
        onMouseMove={handleDrag}
        style={{
          cursor: mode === "MAN" ? "ns-resize" : "default",
        }}
      />
    </g>
  );
};

export default PIDController4;
