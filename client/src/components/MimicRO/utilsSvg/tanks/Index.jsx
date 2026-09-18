import React from "react";

import TankVertical from "./TankVertical";
import TankHorizontal from "./TankHorizontal";
import UndergroundTank from "./UndergroundTank";
import MembraneRO from "./MembraneRO";
import OpenTank from "./OpenTank";
import ChemicalTank from "./ChemicalTank";
import MixingTank from "./MixingTank";

const tanks = [
  {
    Comp: TankVertical,
    tag: "TK-101",
    label: "RAW WATER TANK",
    props: {
      level: 65,
    },
  },

  {
    Comp: ChemicalTank,
    tag: "TK-102",
    label: "CHEMICAL TANK",
    props: {
      level: 35,
      liquidColor: "#ff9800",
    },
  },

  {
    Comp: TankHorizontal,
    tag: "TK-103",
    label: "PRODUCT TANK",
    props: {
      level: 82,
    },
  },

  {
    Comp: UndergroundTank,
    tag: "TK-104",
    label: "UNDERGROUND TANK",
    props: {
      level: 50,
    },
  },

  {
    Comp: MembraneRO,
    tag: "RO-101",
    label: "RO MEMBRANE A",
    props: {
      running: true,
      fouling: false,
    },
  },

  {
    Comp: MembraneRO,
    tag: "RO-102",
    label: "RO MEMBRANE B",
    props: {
      running: true,
      fouling: true,
      alarm: true,
    },
  },

  {
    Comp: OpenTank,
    tag: "TK-105",
    label: "OPEN TANK",
    props: {
      level: 75,
    },
  },

  {
    Comp: MixingTank,
    tag: "TK-106",
    label: "MIXING TANK",
    props: {
      level: 60,
      mixing: true,
    },
  },

  {
    Comp: ChemicalTank,
    tag: "TK-107",
    label: "ACID TANK",
    props: {
      level: 40,
      liquidColor: "#f44336",
    },
  },
];

const AllTanks = ({ x = 0, y = 0 }) => {
  const cols = 3;
  const spacingX = 180;
  const spacingY = 180;

  return (
    <g transform={`translate(${x},${y})`}>
      {tanks.map((tank, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        return (
          <tank.Comp
            key={tank.tag}
            x={col * spacingX}
            y={row * spacingY}
            width={100}
            height={100}
            tag={tank.tag}
            label={tank.label}
            {...tank.props}
          />
        );
      })}
    </g>
  );
};

export default AllTanks;
