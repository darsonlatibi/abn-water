import React from "react";

import ConductivityMeter from "./ConductivityMeter";
import FlowMeter from "./FlowMeter";
import IndicatorLamp from "./IndicatorLamp";
import LevelIndicator from "./LevelIndicator";
import PHMeter from "./PHMeter";
import PLC from "./PLC";
import PressureGauge from "./PressureGauge";
import TemperatureGauge from "./TemperatureGauge";

import PIDController from "./PIDController";
import PIDController3 from "./PIDController3";
import PIDController4 from "./PIDController4";

// ===== PROCESS + CONTROL LAYER =====
const instruments = [
  // ===== PROCESS VARIABLES =====
  {
    Comp: PHMeter,
    tag: "PH-101",
    label: "PH TANK",
    props: { value: 6.8 },
  },
  {
    Comp: ConductivityMeter,
    tag: "EC-101",
    label: "EC SENSOR",
    props: { value: 850 },
  },
  {
    Comp: FlowMeter,
    tag: "FT-101",
    label: "FLOW",
    props: { value: 120 },
  },
  {
    Comp: PressureGauge,
    tag: "PT-101",
    label: "PRESSURE",
    props: { value: 2.5 },
  },
  {
    Comp: TemperatureGauge,
    tag: "TT-101",
    label: "TEMP",
    props: { value: 32 },
  },
  {
    Comp: LevelIndicator,
    tag: "LT-101",
    label: "LEVEL",
    props: { value: 70 },
  },

  // ===== FINAL ELEMENTS =====
  {
    Comp: IndicatorLamp,
    tag: "L-101",
    label: "PUMP RUN",
    props: { status: "ON" },
  },
  {
    Comp: PLC,
    tag: "PLC-01",
    label: "CONTROLLER",
    props: { status: "RUN" },
  },

  // ===== CONTROL LAYER (PID) =====
  {
    Comp: PIDController,
    tag: "PIC-101",
    label: "PH CONTROL PID",
    props: { mode: "AUTO", sp: 7, pv: 6.8, cv: 45 },
  },
  {
    Comp: PIDController3,
    tag: "FIC-101",
    label: "FLOW PID",
    props: { mode: "AUTO", sp: 100, pv: 120, cv: 60 },
  },
  {
    Comp: PIDController4,
    tag: "LIC-101",
    label: "LEVEL PID",
    props: { mode: "MAN", sp: 70, pv: 68, cv: 40 },
  },
];

// ===== SCADA GRID LAYOUT =====
const AllInstruments = ({ x = 0, y = 0 }) => {
  const cols = 5; // lebih luas karena PID nambah
  const spacingX = 170;
  const spacingY = 180;

  return (
    <g transform={`translate(${x},${y})`}>
      {instruments.map((item, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const Comp = item.Comp;

        if (!Comp) return null;

        return (
          <Comp
            key={item.tag}
            x={col * spacingX}
            y={row * spacingY}
            width={95}
            height={95}
            tag={item.tag}
            label={item.label}
            {...item.props}
          />
        );
      })}
    </g>
  );
};

export default AllInstruments;
