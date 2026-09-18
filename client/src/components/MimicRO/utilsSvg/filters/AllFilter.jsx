import React from "react";

import Filter from "./Filter";

const filters = [
  {
    Comp: Filter,
    tag: "FIL-101",
    label: "FILTER A",
    props: { clogged: false },
  },
  {
    Comp: Filter,
    tag: "FIL-102",
    label: "FILTER B",
    props: { clogged: true },
  },
  {
    Comp: Filter,
    tag: "FIL-103",
    label: "FILTER C",
    props: { clogged: false },
  },
  {
    Comp: Filter,
    tag: "FIL-104",
    label: "FILTER D",
    props: { clogged: true },
  },
  {
    Comp: Filter,
    tag: "FIL-105",
    label: "FILTER E",
    props: { clogged: false },
  },
  {
    Comp: Filter,
    tag: "FIL-106",
    label: "FILTER F",
    props: { clogged: false },
  },
];

const AllFilter = ({ x = 0, y = 0 }) => {
  const cols = 3;
  const spacingX = 140;
  const spacingY = 140;

  return (
    <g transform={`translate(${x},${y})`}>
      {filters.map((f, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        return (
          <f.Comp
            key={f.tag}
            x={col * spacingX}
            y={row * spacingY}
            width={80}
            height={80}
            tag={f.tag}
            label={f.label}
            {...f.props}
          />
        );
      })}
    </g>
  );
};

export default AllFilter;
