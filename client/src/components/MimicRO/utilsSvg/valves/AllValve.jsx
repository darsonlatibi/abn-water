import React from "react";

import BallValve from "./BallValve";
import ButterflyValve from "./ButterflyValve";
import ManualValve from "./ManualValve";
import SolenoidValve from "./SolenoidValve";
import MotorizedValve from "./MotorizedValve";
import CheckValve from "./CheckValve";
import ControlValve from "./ControlValve";
import DiaphragmValve from "./DiaphragmValve";
import GateValve from "./GateValve";
import ReliefValve from "./ReliefValve";
import GlobeValve from "./GlobeValve";
import NeedleValve from "./NeedleValve";
import SafetyValve from "./SafetyValve";
import StopValve from "./StopValve";
import ThreeWayValve from "./ThreeWayValve";

const valves = [
  {
    Comp: ManualValve,
    tag: "HV-101",
    label: "MANUAL",
    props: { active: true },
  },
  {
    Comp: SolenoidValve,
    tag: "SV-101",
    label: "SOLENOID",
    props: { active: false },
  },
  {
    Comp: MotorizedValve,
    tag: "MOV-101",
    label: "MOTORIZED",
    props: { active: true },
  },
  { Comp: CheckValve, tag: "NRV-101", label: "CHECK", props: {} },
  {
    Comp: ControlValve,
    tag: "CV-101",
    label: "CONTROL",
    props: { position: 65 },
  },
  {
    Comp: ReliefValve,
    tag: "PRV-101",
    label: "RELIEF",
    props: { active: false },
  },

  { Comp: BallValve, tag: "BV-101", label: "BALL", props: { active: true } },
  {
    Comp: ButterflyValve,
    tag: "BFV-101",
    label: "BUTTERFLY",
    props: { active: true },
  },
  { Comp: GateValve, tag: "GV-101", label: "GATE", props: { active: true } },
  { Comp: GlobeValve, tag: "GLV-101", label: "GLOBE", props: { active: true } },
  {
    Comp: NeedleValve,
    tag: "NV-101",
    label: "NEEDLE",
    props: { active: true },
  },
  {
    Comp: SafetyValve,
    tag: "SV-102",
    label: "SAFETY",
    props: { active: true },
  },
  {
    Comp: DiaphragmValve,
    tag: "DV-101",
    label: "DIAPHRAGM",
    props: { active: true },
  },
  {
    Comp: ThreeWayValve,
    tag: "3WV-101",
    label: "3 WAY",
    props: { active: true },
  },
  { Comp: StopValve, tag: "STV-101", label: "STOP", props: { active: true } },
];

const AllValve = ({ x = 0, y = 0 }) => {
  const cols = 3;
  const spacingX = 140;
  const spacingY = 140;

  return (
    <g transform={`translate(${x},${y})`}>
      {valves.map((v, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        return (
          <v.Comp
            key={v.tag}
            x={col * spacingX}
            y={row * spacingY}
            width={80}
            height={80}
            tag={v.tag}
            label={v.label}
            {...v.props}
          />
        );
      })}
    </g>
  );
};

export default AllValve;
