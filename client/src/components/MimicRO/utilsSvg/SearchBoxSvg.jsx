// SearchBoxSvg.jsx

import { useEffect, useMemo, useState } from "react";

export default function SearchBoxSvg({
  x = 0,
  y = 0,

  width = 240,
  height = 40,

  title = "SEARCH",

  items = [],
  value = "",

  keyField = "id",
  labelField = "name",

  visibleRows = 8,

  // warna
  panelColor = "#0f172a",
  popupColor = "#1e293b",
  borderColor = "#38bdf8",

  titleColor = "#94a3b8",
  valueColor = "#22c55e",
  itemColor = "#ffffff",

  hoverColor = "#334155",

  // font
  fontFamily = "Segoe UI",
  fontWeight = "normal",

  titleFontSize = 11,
  valueFontSize = 14,
  itemFontSize = 13,

  radius = 8,

  placeholder = "Search...",

  onChange = () => {},
}) {
  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [hoverIndex, setHoverIndex] = useState(-1);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (value === "") return;

    const item = items.find((e) => String(e[keyField]) === String(value));

    setSelectedItem(item);
  }, [value, items, keyField]);

  const filteredItems = useMemo(() => {
    if (!keyword) return items;

    return items.filter((e) =>
      String(e[labelField]).toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [items, keyword, labelField]);

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

      {/* INPUT SEARCH */}
      <foreignObject x={10} y={18} width={width - 20} height={20}>
        <input
          type="text"
          value={keyword}
          placeholder={selectedItem ? selectedItem[labelField] : placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setKeyword(e.target.value);
            setOpen(true);
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

      {/* POPUP */}
      {open && (
        <g transform={`translate(0,${height + 5})`}>
          <rect
            width={width}
            height={Math.min(filteredItems.length, visibleRows) * 28}
            rx={radius}
            fill={popupColor}
            stroke={borderColor}
            strokeWidth={2}
          />

          {filteredItems.slice(0, visibleRows).map((item, index) => (
            <g
              key={item[keyField]}
              transform={`translate(0,${index * 28})`}
              style={{
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              onClick={() => {
                setSelectedItem(item);

                setKeyword("");

                setOpen(false);

                onChange(item);
              }}
            >
              <rect
                width={width}
                height={28}
                fill={hoverIndex === index ? hoverColor : "transparent"}
              />

              <text
                x={10}
                y={18}
                fill={itemColor}
                fontSize={itemFontSize}
                fontFamily={fontFamily}
                fontWeight={fontWeight}
              >
                {item[labelField]}
              </text>
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

/*
<SearchBoxSvg
  x={20}
  y={20}

  title="DEVICE"

  items={devices}

  value={deviceId}

  onChange={(item) => {
    setDeviceId(item.deviceId);
  }}

  keyField="deviceId"
  labelField="deviceName"

  width={260}

  fontFamily="Segoe UI"
  fontWeight="bold"

  titleColor="#94a3b8"
  valueColor="#22c55e"

  panelColor="#1e293b"
  popupColor="#0f172a"
  borderColor="#38bdf8"
  hoverColor="#334155"
/>
*/
