import React from "react";

interface WaterGallonProps {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  label?: string;
  productId?: number;
  onClick?: (productId: number) => void;
}

const WaterGallon: React.FC<WaterGallonProps> = ({
  x = 0,
  y = 0,
  w = 90,
  h = 120,
  label = "19 L",
  productId,
  onClick,
}) => {
  const sx = w / 100;
  const sy = h / 140;

  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation();

    console.log("================================");
    console.log("🛒 WATER GALLON CLICK");
    console.log("Product ID:", productId);
    console.log("================================");

    if (productId !== undefined && onClick) {
      onClick(productId);
    }
  };

  return (
    <g
      transform={`translate(${x},${y}) scale(${sx},${sy})`}
      className="water-gallon"
      onClick={handleClick}
      style={{
        cursor: productId !== undefined ? "pointer" : "default",
      }}
    >
      {/* CLICK AREA
          Dibuat transparan supaya seluruh area
          galon mudah diklik
      */}
      <rect
        x="10"
        y="0"
        width="80"
        height="135"
        fill="transparent"
        pointerEvents="all"
      />

      {/* CAP */}
      <rect
        x="40"
        y="5"
        width="20"
        height="10"
        rx="2"
        fill="#1976d2"
        pointerEvents="none"
      />

      {/* NECK */}
      <rect
        x="35"
        y="15"
        width="30"
        height="15"
        rx="4"
        fill="#64b5f6"
        pointerEvents="none"
      />

      {/* GALLON BODY */}
      <path
        d="
          M25 30
          L20 45
          L15 110
          Q15 130 35 130
          L65 130
          Q85 130 85 110
          L80 45
          L75 30
          Z
        "
        fill="#90caf9"
        fillOpacity="0.45"
        stroke="#1e88e5"
        strokeWidth="2"
        pointerEvents="none"
      />

      {/* WATER LEVEL */}
      <path
        d="
          M17 95
          Q50 88 83 95
          L83 110
          Q83 130 65 130
          L35 130
          Q17 130 17 110
          Z
        "
        fill="#29b6f6"
        fillOpacity="0.45"
        pointerEvents="none"
      />

      {/* REFLECTION */}
      <path
        d="M30 40 Q25 70 30 110"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        opacity="0.6"
        pointerEvents="none"
      />

      {/* LABEL */}
      <rect
        x="28"
        y="70"
        width="44"
        height="22"
        rx="4"
        fill="#1976d2"
        pointerEvents="none"
      />

      <text
        x="50"
        y="84"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        fontWeight="bold"
        pointerEvents="none"
      >
        {label}
      </text>
    </g>
  );
};

export default WaterGallon;
