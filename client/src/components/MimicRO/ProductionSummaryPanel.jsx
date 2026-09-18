import React from "react";

const ProductionSummaryPanel = ({
  x = 0,
  y = 0,
  width = 260,
  height = 110,

  totalProduction = 0,
  activeProduction = 0,

  roVolume = 0,
  alkaliVolume = 0,

  avgFlowRate = 0,
  avgTdsIn = 0,
  avgTdsOut = 0,

  efficiency = 0,
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Panel */}
      <rect
        width={width}
        height={height}
        rx="8"
        fill="#ffffff"
        fillOpacity="0.05"
        stroke="#8a8a8a"
        strokeWidth="1"
      />

      {/* Header */}
      <rect width={width} height="24" fill="#ffffff" fillOpacity="0.08" />

      <text
        x={width / 2}
        y="16"
        fill="#ffffff"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
      >
        PRODUCTION SUMMARY
      </text>

      {/* Active Production */}
      <text x="10" y="45" fill="#00e5ff" fontSize="11">
        Active Batch
      </text>

      <text
        x={width - 10}
        y="45"
        fill="#00e5ff"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {activeProduction}
      </text>

      {/* RO Volume */}
      <text x="10" y="60" fill="#00ff88" fontSize="11">
        RO Volume
      </text>

      <text
        x={width - 10}
        y="60"
        fill="#00ff88"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {roVolume} L
      </text>

      {/* Alkali Volume */}
      <text x="10" y="75" fill="#ffc107" fontSize="11">
        Alkali Volume
      </text>

      <text
        x={width - 10}
        y="75"
        fill="#ffc107"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {alkaliVolume} L
      </text>

      {/* Efficiency */}
      <text x="10" y="90" fill="#28a745" fontSize="11">
        Efficiency
      </text>

      <text
        x={width - 10}
        y="90"
        fill="#28a745"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {efficiency} %
      </text>
    </g>
  );
};

export default ProductionSummaryPanel;
