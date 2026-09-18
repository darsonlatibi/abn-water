import React from "react";

import Motor from "./Motor";

const motors = [
  {
    Comp: Motor,
    tag: "MTR-101",
    label: "MOTOR A",
    props: {
      running: true,
    },
  },
  {
    Comp: Motor,
    tag: "MTR-102",
    label: "MOTOR B",
    props: {
      running: false,
    },
  },
  {
    Comp: Motor,
    tag: "MTR-103",
    label: "MOTOR C",
    props: {
      running: true,
    },
  },
  {
    Comp: Motor,
    tag: "MTR-104",
    label: "MOTOR D",
    props: {
      running: true,
    },
  },
  {
    Comp: Motor,
    tag: "MTR-105",
    label: "MOTOR E",
    props: {
      running: false,
    },
  },
  {
    Comp: Motor,
    tag: "MTR-106",
    label: "MOTOR F",
    props: {
      running: true,
    },
  },
];

const AllMotors = ({ x = 0, y = 0, width, height }) => {
  const cols = 3;
  const spacingX = 140;
  const spacingY = 140;

  return (
    <g transform={`translate(${x},${y})`}>
      {motors.map((m, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        return (
          <m.Comp
            key={m.tag}
            x={col * spacingX}
            y={row * spacingY}
            width={width}
            height={height}
            tag={m.tag}
            label={m.label}
            {...m.props}
          />
        );
      })}
    </g>
  );
};

export default AllMotors;
