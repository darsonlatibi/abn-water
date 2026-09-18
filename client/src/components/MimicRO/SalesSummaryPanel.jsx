import React from "react";

const SalesSummaryPanel = ({
  x = 0,
  y = 0,
  width = 250,
  height = 90,

  totalSales = 0,
  revenue = 0,

  roSales = 0,
  alkaliSales = 0,
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
        fill="#fff"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
      >
        SALES SUMMARY
      </text>

      {/* RO */}
      <text x="10" y="42" fill="#00e5ff" fontSize="11">
        RO Sales
      </text>

      <text
        x={width - 10}
        y="42"
        fill="#00e5ff"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {roSales}
      </text>

      {/* Alkali */}
      <text x="10" y="58" fill="#00ff88" fontSize="11">
        Alkali Sales
      </text>

      <text
        x={width - 10}
        y="58"
        fill="#00ff88"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {alkaliSales}
      </text>

      {/* Total */}
      <text x="10" y="74" fill="#ffc107" fontSize="11">
        Total Sold
      </text>

      <text
        x={width - 10}
        y="74"
        fill="#ffc107"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        {totalSales} Galon
      </text>

      {/* Revenue */}
      <text x="10" y="88" fill="#28a745" fontSize="11">
        Revenue
      </text>

      <text
        x={width - 10}
        y="88"
        fill="#28a745"
        fontSize="11"
        textAnchor="end"
        fontWeight="bold"
      >
        Rp {revenue.toLocaleString("id-ID")}
      </text>
    </g>
  );
};

export default SalesSummaryPanel;
