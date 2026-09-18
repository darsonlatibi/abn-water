export default function CheckboxSvg({
  x = 0,
  y = 0,

  size = 18,

  checked = false,

  label = "",

  onChange = () => {},

  boxColor = "#1e293b",
  borderColor = "#38bdf8",

  checkColor = "#22c55e",

  labelColor = "#fff",

  fontSize = 13,
  fontFamily = "Segoe UI",
  fontWeight = "normal",

  radius = 3,
}) {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: "pointer" }}
      onClick={() => onChange(!checked)}
    >
      {/* box */}
      <rect
        width={size}
        height={size}
        rx={radius}
        fill={boxColor}
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* centang */}
      {checked && (
        <polyline
          points={`
            ${size * 0.2},${size * 0.55}
            ${size * 0.45},${size * 0.8}
            ${size * 0.8},${size * 0.25}
          `}
          fill="none"
          stroke={checkColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* label */}
      <text
        x={size + 8}
        y={size * 0.75}
        fill={labelColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {label}
      </text>
    </g>
  );
}
