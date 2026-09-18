const MiniMap = ({
  lat,
  lng,
  width = 120,
  height = 80,
  bounds, // 👈 NEW
}) => {
  const hasLocation = !isNaN(lat) && !isNaN(lng);

  // default bounds kalau tidak dikirim
  const {
    minLat = -7.3,
    maxLat = -7.2,
    minLng = 112.7,
    maxLng = 112.8,
  } = bounds || {};

  // normalisasi 0 - 1
  const normX = hasLocation ? (lng - minLng) / (maxLng - minLng) : 0.5;

  const normY = hasLocation ? (lat - minLat) / (maxLat - minLat) : 0.5;

  // convert ke pixel
  const x = normX * width;
  const y = (1 - normY) * height; // invert Y (GPS style)

  return (
    <g transform="translate(15, 40)">
      {/* MAP BACKGROUND */}
      <rect
        width={width}
        height={height}
        fill="#0b1f2a"
        stroke="#00bfff"
        strokeWidth="1"
        rx="6"
      />

      {/* GRID */}
      <line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="#1f3b4d"
      />
      <line x1={width / 2} y1="0" x2={width / 2} y2={height} stroke="#1f3b4d" />

      {/* DEVICE */}
      {hasLocation && (
        <>
          {/* pulse */}
          <circle
            cx={x}
            cy={y}
            r="8"
            fill="none"
            stroke="#00ff88"
            opacity="0.6"
          >
            <animate
              attributeName="r"
              from="6"
              to="18"
              dur="1.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.8"
              to="0"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* dot */}
          <circle
            cx={x}
            cy={y}
            r="4"
            fill="#00ff88"
            style={{ cursor: "pointer" }}
          >
            <title>Device Location</title>
          </circle>
        </>
      )}

      {/* fallback */}
      {!hasLocation && (
        <text x="10" y="45" fill="#aaa" fontSize="10">
          No GPS Data
        </text>
      )}
    </g>
  );
};

export default MiniMap;
