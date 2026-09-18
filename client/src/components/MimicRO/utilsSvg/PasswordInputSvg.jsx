// PasswordInputSvg.jsx

import { useEffect, useState } from "react";

export default function PasswordInputSvg({
  x = 0,
  y = 0,

  width = 220,
  height = 40,

  title = "PASSWORD",

  value = "",
  placeholder = "********",

  onChange = () => {},

  // warna
  panelColor = "#0f172a",
  borderColor = "#38bdf8",

  titleColor = "#94a3b8",
  valueColor = "#22c55e",

  buttonColor = "#1e293b",
  buttonHoverColor = "#334155",

  // font
  fontFamily = "Segoe UI",
  fontWeight = "normal",

  titleFontSize = 11,
  valueFontSize = 14,

  radius = 8,

  disabled = false,
}) {
  const [inputValue, setInputValue] = useState(value);

  const [showPassword, setShowPassword] = useState(false);

  const [hover, setHover] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PANEL */}
      <rect
        width={width}
        height={height}
        rx={radius}
        fill={panelColor}
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* TITLE */}
      <text
        x={10}
        y={15}
        fill={titleColor}
        fontSize={titleFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {title}
      </text>

      {/* INPUT */}
      <foreignObject x={10} y={18} width={width - 50} height={20}>
        <input
          type={showPassword ? "text" : "password"}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",

            color: valueColor,

            fontFamily,
            fontWeight,
            fontSize: valueFontSize,
          }}
        />
      </foreignObject>

      {/* SHOW / HIDE BUTTON */}
      <g
        transform={`translate(${width - 34},9)`}
        style={{
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        <rect
          width={24}
          height={24}
          rx="4"
          fill={hover ? buttonHoverColor : buttonColor}
          stroke={borderColor}
        />

        <text
          x={12}
          y={16}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontFamily={fontFamily}
          fontWeight="bold"
        >
          {showPassword ? "🙈" : "👁"}
        </text>
      </g>
    </g>
  );
}
/*
<PasswordInputSvg
  x={20}
  y={40}

  title="PASSWORD"

  value={password}
  onChange={setPassword}

  width={250}

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  borderColor="#38bdf8"
/>

<PasswordInputSvg
  title="ADMIN PASSWORD"

  value={adminPassword}

  onChange={setAdminPassword}

  placeholder="Enter password"

  width={280}

  panelColor="#0f172a"
  borderColor="#22c55e"

  valueColor="#22c55e"

  fontWeight="bold"
/>
*/
