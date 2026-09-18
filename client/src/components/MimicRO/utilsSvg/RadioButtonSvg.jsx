export default function RadioButtonSvg({
  x = 0,
  y = 0,

  size = 18,

  checked = false,

  label = "",

  onChange = () => {},

  circleColor = "#1e293b",
  borderColor = "#38bdf8",
  dotColor = "#22c55e",

  labelColor = "#ffffff",

  fontSize = 13,
  fontFamily = "Segoe UI",
  fontWeight = "normal",
}) {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: "pointer" }}
      onClick={() => onChange()}
    >
      {/* Lingkaran luar */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={circleColor}
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* Lingkaran dalam */}
      {checked && (
        <circle cx={size / 2} cy={size / 2} r={size / 4} fill={dotColor} />
      )}

      {/* Label */}
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
