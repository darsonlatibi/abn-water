import React, { useEffect, useState, useMemo, useRef } from "react";
import { socket } from "../../lib/socket";

const COLORS = ["#00ff99", "#ffcc00", "#ff4d4d", "#66b3ff", "#cc66ff"];

const WaterHistorian = ({
  x = 0,
  y = 0,

  deviceId,
  tagNumbers = ["PT-101"],
  mode = "avg_1m",

  width = 600,
  height = 220,

  fontSize = 11,
  titleSize = 13,
  axisFontSize = 10,

  hh = 90,
  h = 75,
  l = 25,
  ll = 10,
}) => {
  const [series, setSeries] = useState({});
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const padding = 40;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const results = await Promise.all(
        tagNumbers.map(async (tagNumber) => {
          const params = new URLSearchParams({
            deviceId,
            tagNumber,
            mode,
            limit: 2000,
          });

          const res = await fetch(
            `http://localhost:5000/api/water/historian?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          const json = await res.json();

          return {
            tagNumber,
            data: json.data || [],
          };
        }),
      );

      const newSeries = {};

      results.forEach(({ tagNumber, data }) => {
        newSeries[tagNumber] = data.map((d) => ({
          timestamp: new Date(d.timestamp),
          value: Number(d.value),
        }));
      });

      setSeries(newSeries);
    } catch (err) {
      console.error("Historian error:", err);
    }

    setLoading(false);
    isFetching.current = false;
  };

  useEffect(() => {
    fetchData();
  }, [deviceId, JSON.stringify(tagNumbers), mode]);

  // =========================
  // REALTIME UPDATE
  // =========================
  useEffect(() => {
    const handler = (payload) => {
      if (payload.deviceId !== deviceId) return;

      setSeries((prev) => {
        const updated = { ...prev };

        payload.analog?.forEach((t) => {
          if (!tagNumbers.includes(t.tagNumber)) return;

          const arr = updated[t.tagNumber] || [];

          updated[t.tagNumber] = [
            ...arr.slice(-500),
            {
              timestamp: new Date(),
              value: Number(t.value),
            },
          ];
        });

        return updated;
      });
    };

    socket.on("sensor:update", handler);

    return () => {
      socket.off("sensor:update", handler);
    };
  }, [deviceId, JSON.stringify(tagNumbers)]);

  // =========================
  // SCALING
  // =========================
  const allValues = useMemo(() => {
    return Object.values(series)
      .flat()
      .map((d) => d.value)
      .filter((v) => !isNaN(v));
  }, [series]);

  const min = allValues.length ? Math.min(...allValues) : 0;
  const max = allValues.length ? Math.max(...allValues) : 1;

  const scaleX = (i, len) => padding + (i / Math.max(len - 1, 1)) * chartW;

  const scaleY = (v) =>
    padding + chartH - ((v - min) / (max - min || 1)) * chartH;

  const ticks = 5;

  const alarmY = (v) =>
    padding + chartH - ((v - min) / (max - min || 1)) * chartH;

  // =========================
  // EMPTY STATE
  // =========================
  if (!Object.keys(series).length) {
    return (
      <g transform={`translate(${x},${y})`}>
        <rect width={width} height={height} fill="#1e1e1e" />
        <text x={20} y={40} fill="#aaa" fontSize={fontSize}>
          Loading historian...
        </text>
      </g>
    );
  }

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PANEL BACKGROUND */}
      <rect
        width={width}
        height={height}
        fill="#1e1e1e"
        stroke="#666"
        strokeWidth="2"
        rx="8"
      />

      {/* TITLE */}
      <text
        x={padding}
        y={20}
        fill="#fff"
        fontSize={titleSize}
        fontWeight="bold"
      >
        📊 Multi Historian | <tspan fill="#00ff99">{mode.toUpperCase()}</tspan>
      </text>

      {/* GRID + AXIS */}
      {Array.from({ length: ticks }).map((_, i) => {
        const value = min + (i * (max - min)) / (ticks - 1);
        const yPos = scaleY(value);

        return (
          <g key={i}>
            <line
              x1={padding}
              y1={yPos}
              x2={width - padding}
              y2={yPos}
              stroke="#333"
            />

            <line
              x1={padding - 5}
              y1={yPos}
              x2={padding}
              y2={yPos}
              stroke="#aaa"
            />

            <text x={5} y={yPos + 3} fill="#aaa" fontSize={axisFontSize}>
              {value.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* ALARM ZONES (SCADA STYLE) */}
      <rect
        x={padding}
        y={alarmY(hh)}
        width={chartW}
        height={alarmY(ll) - alarmY(hh)}
        fill="rgba(255, 59, 59, 0.08)"
      />

      <rect
        x={padding}
        y={alarmY(h)}
        width={chartW}
        height={alarmY(hh) - alarmY(h)}
        fill="rgba(255, 153, 0, 0.06)"
      />

      <rect
        x={padding}
        y={alarmY(l)}
        width={chartW}
        height={alarmY(h) - alarmY(l)}
        fill="rgba(255, 212, 0, 0.05)"
      />

      <rect
        x={padding}
        y={alarmY(ll)}
        width={chartW}
        height={alarmY(l) - alarmY(ll)}
        fill="rgba(47, 111, 255, 0.05)"
      />

      {/* X AXIS TICKS */}
      {(() => {
        const sampleTag = Object.values(series)[0] || [];

        if (!sampleTag.length) return null;

        const step = Math.max(1, Math.floor(sampleTag.length / ticks));

        return Array.from({ length: ticks }).map((_, i) => {
          const idx = i * step;
          const point = sampleTag[idx];

          if (!point) return null;

          const date = new Date(point.timestamp);

          const label = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          // 🔥 FIX: pakai actual pixel position (center grid step)
          const xPos = padding + (i / (ticks - 1)) * chartW;

          return (
            <g key={i}>
              {/* vertical grid line */}
              <line
                x1={xPos}
                y1={padding}
                x2={xPos}
                y2={height - padding}
                stroke="#222"
              />

              {/* tick */}
              <line
                x1={xPos}
                y1={height - padding}
                x2={xPos}
                y2={height - padding + 5}
                stroke="#aaa"
              />

              {/* label CENTERED */}
              <text
                x={xPos}
                y={height - padding + 18}
                fill="#aaa"
                fontSize={axisFontSize}
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                {label}
              </text>
            </g>
          );
        });
      })()}

      {/* AXIS LINE */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="#aaa"
      />

      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="#aaa"
      />

      {/* ALARM LAYERS */}
      {[
        { value: hh, color: "#ff3b3b", label: "HH" },
        { value: h, color: "#ff9900", label: "H" },
        { value: l, color: "#ffd400", label: "L" },
        { value: ll, color: "#2f6fff", label: "LL" },
      ].map((a) => (
        <g key={a.label}>
          {/* dashed line */}
          <line
            x1={padding}
            y1={alarmY(a.value)}
            x2={width - padding}
            y2={alarmY(a.value)}
            stroke={a.color}
            strokeDasharray="4 3"
            strokeWidth="1.5"
            opacity="0.9"
          />

          {/* label kiri */}
          <text
            x={padding + 5}
            y={alarmY(a.value) - 3}
            fill={a.color}
            fontSize={10}
            fontWeight="bold"
          >
            {a.label} ({a.value})
          </text>
        </g>
      ))}

      {/* SERIES */}
      {Object.entries(series).map(([tag, data], idx) => {
        const color = COLORS[idx % COLORS.length];

        const points = data
          .map((d, i) => `${scaleX(i, data.length)},${scaleY(d.value)}`)
          .join(" ");

        return (
          <polyline
            key={tag}
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={points}
          />
        );
      })}

      {/* LEGEND WITH LED DOT */}
      {Object.keys(series).map((tag, idx) => {
        const color = COLORS[idx % COLORS.length];

        return (
          <g
            key={tag}
            transform={`translate(${padding + idx * 120}, ${height - 8})`}
          >
            {/* LED DOT */}
            <circle
              cx={0}
              cy={0}
              r={4}
              fill={color}
              style={{
                filter: "drop-shadow(0 0 3px rgba(0,255,150,0.8))",
              }}
            />

            {/* TEXT */}
            <text x={10} y={4} fill={color} fontSize={axisFontSize}>
              {tag}
            </text>
          </g>
        );
      })}

      {/* LOADING INDICATOR */}
      <text x={width - 90} y={20} fill="#aaa" fontSize={10}>
        {loading ? "Loading..." : ""}
      </text>
    </g>
  );
};

export default WaterHistorian;
