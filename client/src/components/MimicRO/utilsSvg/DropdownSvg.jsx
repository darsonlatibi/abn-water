import { useMemo, useState } from "react";

export default function DropdownSvg({
  x = 0,
  y = 0,

  width = 240,
  height = 40,

  title = "",

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

  onChange = () => {},
}) {
  const [open, setOpen] = useState(false);

  const [hoverIndex, setHoverIndex] = useState(-1);

  const [scrollIndex, setScrollIndex] = useState(0);

  const rowHeight = 28;

  const selectedItem = useMemo(() => {
    return items.find((e) => String(e[keyField]) === String(value));
  }, [items, value, keyField]);

  const visibleItems = useMemo(() => {
    return items.slice(scrollIndex, scrollIndex + visibleRows);
  }, [items, scrollIndex, visibleRows]);

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
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
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

      {/* VALUE */}
      <text
        x={10}
        y={30}
        fill={valueColor}
        fontSize={valueFontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
      >
        {selectedItem ? selectedItem[labelField] : "Pilih..."}
      </text>

      {/* ARROW */}
      <polygon
        points={`${width - 25},15 ${width - 10},15 ${width - 17},23`}
        fill={borderColor}
      />

      {/* POPUP */}
      {open && (
        <g
          transform={`translate(0,${height + 5})`}
          onWheel={(e) => {
            e.preventDefault();

            if (e.deltaY > 0) {
              setScrollIndex((prev) =>
                Math.min(Math.max(0, items.length - visibleRows), prev + 1),
              );
            } else {
              setScrollIndex((prev) => Math.max(0, prev - 1));
            }
          }}
        >
          <rect
            width={width}
            height={visibleRows * rowHeight}
            rx={radius}
            fill={popupColor}
            stroke={borderColor}
            strokeWidth={2}
          />

          {visibleItems.map((item, index) => (
            <g
              key={item[keyField]}
              transform={`translate(0,${index * rowHeight})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              <rect
                width={width}
                height={rowHeight}
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
