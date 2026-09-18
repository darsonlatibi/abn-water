import React from "react";

interface CartButtonProps {
  /* =========================
     POSITION
  ========================= */
  x?: number;
  y?: number;

  /* =========================
     SIZE
  ========================= */
  w?: number;
  h?: number;

  /* =========================
     PRODUCT
  ========================= */
  productId: number;

  /* =========================
     CALLBACK
  ========================= */
  onClick: (productId: number) => void;

  /* =========================
     STYLE
  ========================= */
  fill?: string;
  hoverFill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;

  /* =========================
     ICON
  ========================= */
  iconSize?: number;
  iconColor?: string;

  /* =========================
     OPTIONAL
  ========================= */
  title?: string;
  disabled?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({
  x = 0,
  y = 0,

  w = 42,
  h = 36,

  productId,
  onClick,

  fill = "#1976d2",
  hoverFill = "#1565c0",

  stroke = "#ffffff",
  strokeWidth = 2,

  radius = 7,

  iconSize = 20,
  iconColor = "#ffffff",

  title = "Tambah ke keranjang",

  disabled = false,
}) => {
  const [hover, setHover] = React.useState(false);

  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation();

    if (disabled) return;

    console.log("🛒 ADD TO CART");
    console.log("Product ID:", productId);

    onClick(productId);
  };

  /*
   * Center icon
   */
  const cx = w / 2;
  const cy = h / 2;

  /*
   * Scale icon berdasarkan iconSize
   */
  const s = iconSize / 24;

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* =========================
          TOOLTIP
      ========================= */}
      {title && <title>{title}</title>}

      {/* =========================
          BUTTON BACKGROUND
      ========================= */}
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        rx={radius}
        fill={hover && !disabled ? hoverFill : fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* =========================
          CART ICON
      ========================= */}
      <g
        transform={`
          translate(
            ${cx - 12 * s},
            ${cy - 12 * s}
          )
          scale(${s})
        `}
        pointerEvents="none"
      >
        {/* CART BASKET */}
        <path
          d="
            M3 4
            H5
            L7 16
            H19
            L21 8
            H6
          "
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* CART BASE */}
        <path
          d="M7 16 H19"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* WHEELS */}
        <circle cx="9" cy="20" r="1.5" fill={iconColor} />

        <circle cx="18" cy="20" r="1.5" fill={iconColor} />
      </g>
    </g>
  );
};

export default CartButton;
