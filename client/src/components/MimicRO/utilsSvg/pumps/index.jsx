import React from "react";

import Pump from "./Pump";
import PumpHorizontal from "./PumpHorizontal";
import PumpVertical from "./PumpVertical";
import PumpVSD from "./PumpVSD";
import DosingPump from "./DosingPump";

const pumps = [
  {
    Comp: Pump,
    tag: "P-101",
    label: "FEED PUMP",
    props: {
      running: true,
    },
  },
  {
    Comp: PumpHorizontal,
    tag: "P-102",
    label: "BOOSTER PUMP",
    props: {
      running: false,
    },
  },
  {
    Comp: PumpVertical,
    tag: "P-103",
    label: "VERTICAL PUMP",
    props: {
      running: true,
    },
  },
  {
    Comp: PumpVSD,
    tag: "P-104",
    label: "VSD PUMP",
    props: {
      running: true,
      speedHz: 42,
    },
  },
  {
    Comp: DosingPump,
    tag: "DP-101",
    label: "ACID DOSING",
    props: {
      running: true,
    },
  },
  {
    Comp: DosingPump,
    tag: "DP-102",
    label: "ALKALI DOSING",
    props: {
      running: false,
      alarm: true,
    },
  },
];

const AllPump = ({ x = 0, y = 0 }) => {
  const cols = 3;
  const spacingX = 180;
  const spacingY = 150;

  return (
    <g transform={`translate(${x},${y})`}>
      {pumps.map((pump, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        return (
          <pump.Comp
            key={pump.tag}
            x={col * spacingX}
            y={row * spacingY}
            width={100}
            height={80}
            tag={pump.tag}
            label={pump.label}
            {...pump.props}
          />
        );
      })}
    </g>
  );
};

export default AllPump;
