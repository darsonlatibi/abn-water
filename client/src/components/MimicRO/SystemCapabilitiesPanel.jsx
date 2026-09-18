import React from "react";
import { Link } from "react-router-dom";

const SystemCapabilitiesPanel = ({
  x = 0,
  y = 0,
  width = 320,
  height = 160,
  device,
}) => {
  const features = [
    "RO Purification",
    "Sand Filter",
    "Carbon Filter",
    "Softener",
    "UV Sterilization",
    "Ozone System",
    "Auto Flushing",
    "pH Correction",
    "IoT Monitoring",
    "Alarm System",
  ];

  const middleIndex = Math.ceil(features.length / 2);

  const leftColumn = features.slice(0, middleIndex);
  const rightColumn = features.slice(middleIndex);

  const lat = Number(device?.lat);
  const lng = Number(device?.lng);

  const hasLocation = !isNaN(lat) && !isNaN(lng);
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Panel */}
      <rect
        width={width}
        height={height}
        rx="8"
        fill="#ffffff"
        fillOpacity="0.05"
        // fill="#1e1e1e"
        stroke="#8a8a8a"
        strokeWidth="1"
      />

      {/* Header */}
      <rect width={width} height="30" fill="#ffffff" fillOpacity="0.08" />

      <text
        x={width / 2}
        y="20"
        fill="#e9ecef"
        textAnchor="middle"
        fontWeight="bold"
      >
        SYSTEM CAPABILITIES
      </text>

      {/* Kolom Kiri */}
      {leftColumn.map((feature, index) => (
        <g key={feature}>
          <circle cx="18" cy={50 + index * 20} r="4" fill="#28a745" />

          <text x="30" y={54 + index * 20} fill="#fff" fontSize="12">
            {feature}
          </text>
        </g>
      ))}

      {/* Kolom Kanan */}
      {rightColumn.map((feature, index) => (
        <g key={feature}>
          <circle
            cx={width / 2 + 10}
            cy={50 + index * 20}
            r="4"
            fill="#28a745"
          />

          <text
            x={width / 2 + 22}
            y={54 + index * 20}
            fill="#fff"
            fontSize="12"
          >
            {feature}
          </text>
          <text x="15" y={height - 25} fill="#adb5bd" fontSize="10">
            WA:
          </text>

          <text x="45" y={height - 25} fill="#00ff88" fontSize="10">
            +62 811-447-622
          </text>

          <text x="15" y={height - 10} fill="#adb5bd" fontSize="10">
            EMAIL:
          </text>

          <text x="60" y={height - 10} fill="#00bfff" fontSize="10">
            darsonptst@gmail.com
          </text>
          {hasLocation && (
            <text
              x="15"
              y={height - 40}
              fill="#00bfff"
              fontSize="11"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${lat},${lng}`,
                  "_blank",
                )
              }
            >
              OPEN LOCATION MAP
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

export default SystemCapabilitiesPanel;
