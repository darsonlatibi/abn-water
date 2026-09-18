import React from "react";

interface PumpToGalonProps {
  x?: number;
  y?: number;

  width?: number;
  height?: number;

  tag?: string;

  running?: boolean;
  fault?: boolean;

  runtime?: number;
  frequency?: number;
  current?: number;

  pipeLength?: number;
  fillHeight?: number;

  fontFamily?: string;

  tagSize?: number;
  statusSize?: number;
  valueSize?: number;

  isdetail?: boolean;

  sendCommand?: (command: string, value?: unknown) => void;
}

const PumpToGalon: React.FC<PumpToGalonProps> = ({
  x = 0,
  y = 0,

  width = 180,
  height = 140,

  tag = "P-101",

  running = false,
  fault = false,

  runtime = 0,
  frequency = 50,
  current = 0,

  pipeLength = 100,
  fillHeight = 100,

  fontFamily = "Arial",

  tagSize = 12,
  statusSize = 11,
  valueSize = 10,

  isdetail = true,

  sendCommand,
}) => {
  // =========================
  // PUMP COLOR
  // =========================

  const bodyColor = fault ? "#dc3545" : running ? "#28a745" : "#6c757d";

  // =========================
  // DIMENSIONS
  // =========================

  const pumpRadius = width * 0.2;

  const motorWidth = width * 0.22;
  const motorHeight = height * 0.28;

  const suctionLength = width * 0.3;

  const pipeWidth = Math.max(4, width * 0.04);

  // =========================
  // COMMAND
  // =========================

  const handleCommand = () => {
    if (sendCommand) {
      sendCommand(running ? "STOP" : "START");
    }
  };

  // =========================
  // DISCHARGE POSITION
  // =========================

  const dischargeY = -pipeLength;

  // =========================
  // NOZZLE
  // =========================

  const nozzleWidth = Math.max(10, width * 0.12);
  const nozzleHeight = Math.max(14, height * 0.14);

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={handleCommand}
      style={{
        cursor: sendCommand ? "pointer" : "default",
      }}
    >
      {/* =====================================================
          MOTOR
      ===================================================== */}

      <rect
        x={-pumpRadius - motorWidth - 10}
        y={-motorHeight / 2}
        width={motorWidth}
        height={motorHeight}
        rx={4}
        fill="#495057"
        stroke="#222"
        strokeWidth={2}
      />

      {/* =====================================================
          PUMP BODY
      ===================================================== */}

      <circle
        cx={0}
        cy={0}
        r={pumpRadius}
        fill={bodyColor}
        stroke="#222"
        strokeWidth={3}
      >
        {fault && (
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="0.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* =====================================================
          IMPELLER
      ===================================================== */}

      <g>
        {running && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}

        {/* TOP */}
        <path
          d={`
            M0,${-pumpRadius * 0.6}
            L${pumpRadius * 0.25},${-pumpRadius * 0.15}
            L0,0
            L${-pumpRadius * 0.25},${-pumpRadius * 0.15}
            Z
          `}
          fill="#fff"
        />

        {/* RIGHT */}
        <path
          d={`
            M${pumpRadius * 0.6},0
            L${pumpRadius * 0.15},${pumpRadius * 0.25}
            L0,0
            L${pumpRadius * 0.15},${-pumpRadius * 0.25}
            Z
          `}
          fill="#fff"
        />

        {/* BOTTOM */}
        <path
          d={`
            M0,${pumpRadius * 0.6}
            L${pumpRadius * 0.25},${pumpRadius * 0.15}
            L0,0
            L${-pumpRadius * 0.25},${pumpRadius * 0.15}
            Z
          `}
          fill="#fff"
        />

        {/* LEFT */}
        <path
          d={`
            M${-pumpRadius * 0.6},0
            L${-pumpRadius * 0.15},${-pumpRadius * 0.25}
            L0,0
            L${-pumpRadius * 0.15},${pumpRadius * 0.25}
            Z
          `}
          fill="#fff"
        />
      </g>

      {/* =====================================================
          SUCTION PIPE
      ===================================================== */}

      <line
        x1={-pumpRadius - suctionLength}
        y1={0}
        x2={-pumpRadius}
        y2={0}
        stroke="#00bfff"
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* =====================================================
          SUCTION FLOW
      ===================================================== */}

      {running && (
        <polygon
          points={`
            ${-pumpRadius - suctionLength * 0.55},-6
            ${-pumpRadius - suctionLength * 0.35},0
            ${-pumpRadius - suctionLength * 0.55},6
          `}
          fill="#00bfff"
        />
      )}

      {/* =====================================================
          DISCHARGE PIPE - VERTICAL UP
      ===================================================== */}

      <line
        x1={0}
        y1={-pumpRadius}
        x2={0}
        y2={dischargeY}
        stroke="#00bfff"
        strokeWidth={pipeWidth}
        strokeLinecap="round"
      />

      {/* =====================================================
          VERTICAL FLOW ANIMATION
      ===================================================== */}

      {running && (
        <line
          x1={0}
          y1={-pumpRadius}
          x2={0}
          y2={dischargeY}
          stroke="#00e5ff"
          strokeWidth={Math.max(2, pipeWidth * 0.45)}
          strokeDasharray="10 8"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-18"
            dur="0.7s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          FLOW ARROW UP
      ===================================================== */}

      {running && (
        <polygon
          points={`
            -7,-${pipeLength * 0.55}
            0,-${pipeLength * 0.7}
            7,-${pipeLength * 0.55}
          `}
          fill="#00e5ff"
        />
      )}

      {/* =====================================================
          FILLING NOZZLE
      ===================================================== */}

      <rect
        x={-nozzleWidth / 2}
        y={dischargeY - nozzleHeight}
        width={nozzleWidth}
        height={nozzleHeight}
        rx={3}
        fill="#495057"
        stroke="#cfd8dc"
        strokeWidth={2}
      />

      {/* =====================================================
          GALON CONNECTION
      ===================================================== */}

      <line
        x1={0}
        y1={dischargeY - nozzleHeight}
        x2={0}
        y2={dischargeY - nozzleHeight - fillHeight}
        stroke="#00bfff"
        strokeWidth={Math.max(3, pipeWidth * 0.7)}
        strokeLinecap="round"
      />

      {/* =====================================================
          FILL FLOW
      ===================================================== */}

      {running && (
        <line
          x1={0}
          y1={dischargeY - nozzleHeight}
          x2={0}
          y2={dischargeY - nozzleHeight - fillHeight}
          stroke="#00e5ff"
          strokeWidth={Math.max(2, pipeWidth * 0.35)}
          strokeDasharray="8 6"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-14"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </line>
      )}

      {/* =====================================================
          TAG
      ===================================================== */}

      <text
        x={0}
        y={pumpRadius + 25}
        textAnchor="middle"
        fill="#00ffff"
        fontWeight="bold"
        fontSize={tagSize}
        fontFamily={fontFamily}
      >
        {tag}
      </text>

      {/* =====================================================
          DETAIL
      ===================================================== */}

      {isdetail && (
        <>
          {/* STATUS */}

          <text
            x={0}
            y={pumpRadius + 42}
            textAnchor="middle"
            fill={bodyColor}
            fontWeight="bold"
            fontSize={statusSize}
            fontFamily={fontFamily}
          >
            {fault ? "FAULT" : running ? "RUNNING" : "STOP"}
          </text>

          {/* RUNTIME */}

          <text
            x={0}
            y={pumpRadius + 58}
            textAnchor="middle"
            fill="#fff"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            RT {runtime} h
          </text>

          {/* FREQUENCY */}

          <text
            x={0}
            y={pumpRadius + 74}
            textAnchor="middle"
            fill="#ffc107"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            {frequency} Hz
          </text>

          {/* CURRENT */}

          <text
            x={0}
            y={pumpRadius + 90}
            textAnchor="middle"
            fill="#00bfff"
            fontSize={valueSize}
            fontFamily={fontFamily}
          >
            {current} A
          </text>
        </>
      )}
    </g>
  );
};

export default PumpToGalon;
