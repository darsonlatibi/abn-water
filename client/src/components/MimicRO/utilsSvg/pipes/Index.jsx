// AllPipe.jsx
import React from "react";

import PipeStraight from "./PipeStraight";
import PipeElbow from "./PipeElbow";
import PipeTee from "./PipeTee";
import PipeCross from "./PipeCross";
import PipeReducer from "./PipeReducer";
import PipeFlexible from "./PipeFlexible";
import PipeArrow from "./PipeArrow";

const pipes = [
  {
    Comp: PipeStraight,
    tag: "PIPE-101",
    label: "STRAIGHT PIPE",
    props: {
      length: 100,
      flowing: true,
      showArrow: true,
    },
  },

  {
    Comp: PipeElbow,
    tag: "PIPE-102",
    label: "ELBOW 90°",
    props: {
      radius: 30,
      direction: "top-right",
      flowing: true,
      showArrow: true,
    },
  },

  {
    Comp: PipeTee,
    tag: "PIPE-103",
    label: "TEE CONNECTION",
    props: {
      length: 70,
      branch: 35,
      direction: "top",
      flowing: true,
    },
  },

  {
    Comp: PipeCross,
    tag: "PIPE-104",
    label: "CROSS CONNECTION",
    props: {
      length: 70,
      flowing: true,
    },
  },

  {
    Comp: PipeReducer,
    tag: "PIPE-105",
    label: "REDUCER",
    props: {
      length: 70,
      inletDiameter: 10,
      outletDiameter: 4,
      flowing: true,
      showArrow: true,
    },
  },

  {
    Comp: PipeFlexible,
    tag: "PIPE-106",
    label: "FLEXIBLE PIPE",
    props: {
      length: 90,
      amplitude: 6,
      segments: 12,
      flowing: true,
      showArrow: true,
    },
  },

  {
    Comp: PipeArrow,
    tag: "PIPE-107",
    label: "FLOW ARROW",
    props: {
      size: 12,
      direction: "right",
      animated: true,
    },
  },
];

const AllPipe = ({ x = 0, y = 0 }) => {
  const cols = 3;
  const spacingX = 170;
  const spacingY = 120;

  return (
    <g transform={`translate(${x},${y})`}>
      {pipes.map((pipe, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const px = col * spacingX;
        const py = row * spacingY;

        return (
          <g key={pipe.tag}>
            {/* Label */}
            <text
              x={px}
              y={py - 35}
              textAnchor="middle"
              fill="#00bfff"
              fontSize="11"
              fontWeight="bold"
            >
              {pipe.label}
            </text>

            {/* Pipe */}
            <pipe.Comp x={px} y={py} {...pipe.props} />

            {/* Tag */}
            <text
              x={px}
              y={py + 35}
              textAnchor="middle"
              fill="#aaa"
              fontSize="10"
            >
              {pipe.tag}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default AllPipe;
