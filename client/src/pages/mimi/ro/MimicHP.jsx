import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PipeArrow from "../MimicRO/utilsSvg/pipes/PipeArrow";
import ManualValve from "../MimicRO/utilsSvg/valves/ManualValve";
import ElbowPipe from "../MimicRO/ElbowPipe";
import Transmitter from "../MimicRO/Transmitter";

import { updateTelemetry } from "../../features/ro/telemetrySlice.js";
import MembraneVertical from "../MimicRO/MembraneVertical.jsx";
import PipeElbow from "../MimicRO/utilsSvg/pipes/PipeElbow.jsx";
import Tank from "../MimicRO/Tank.jsx";
import Ventury from "../MimicRO/Ventury.jsx";
import LevelMeter from "../MimicRO/level/LevelMeter.jsx";
import StopButton from "../MimicRO/utilsSvg/buttons/StopButton.jsx";
import StartButton from "../MimicRO/utilsSvg/buttons/StartButton.jsx";
import PipeStraight from "../MimicRO/utilsSvg/pipes/PipeStraight.jsx";
import DosingPump from "../MimicRO/utilsSvg/pumps/DosingPump.jsx";
import PipeTee from "../MimicRO/utilsSvg/pipes/PipeTee.jsx";
const MimicHP = ({ deviceId }) => {
  const online = useSelector((state) => {
    const dev = state.devices.devices.find((d) => d.deviceId === deviceId);

    return dev?.isOnline ?? false;
  });
  const tags = useSelector((state) => state.telemetry.tags);

  // Helper
  const tag = (name, def = 0) => tags[name] ?? def;
  console.log(tags);
  return (
    <div className="w-full min-h-screen bg-slate-900 overflow-auto">
      <div
        className="card-header d-flex align-items-center justify-content-between text-white"
        style={{
          background: "#1f2937",
          borderBottom: "3px solid #0dcaf0",
          minHeight: "56px",
        }}
      >
        <div style={{ width: 100 }}></div>

        {/* <h4 className="mb-0 fw-bold text-center flex-grow-1">
          {deviceId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h4>

        <div style={{ width: 100 }} className="text-end">
          <span className={`badge ${online ? "bg-success" : "bg-danger"}`}>
            {online ? "ONLINE" : "OFFLINE"}
          </span>
        </div> */}
      </div>
      <svg
        viewBox="0 0 400 1500"
        width="100%"
        height="5500"
        className="bg-black"
        preserveAspectRatio="xMidYMin meet"
      >
        <PipeArrow x={40} y={60} direction="right" animated={true} />
        <ManualValve
          x={52}
          y={100}
          width={60}
          height={60}
          direction={"right"}
          label={"PDAM"}
          tag="XV-101"
        />
        <Transmitter
          x={100}
          y={35}
          width={90}
          height={90}
          tag="FT-101"
          label=""
          type="FT"
          value={65}
          unit="m³/h"
        />
        <ElbowPipe
          x={77}
          y={100}
          width={20}
          height={20}
          direction="right-down" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={137}
          y={155}
          width={40}
          height={50}
          direction="left-up" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={100}
          y={155}
          width={40}
          height={50}
          direction="right-up" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={130}
          y={155}
          width={40}
          height={50}
          direction="right-up" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={160}
          y={155}
          width={40}
          height={50}
          direction="right-up" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <MembraneVertical
          x={130}
          y={50}
          width={20}
          height={90}
          color="#e6d5a8"
          label=""
        />
        <MembraneVertical
          x={160}
          y={50}
          width={20}
          height={90}
          color="#2f2f2f"
          label=""
        />
        <MembraneVertical
          x={190}
          y={50}
          width={20}
          height={90}
          color="#7b2cbf"
          label=""
        />
        <ElbowPipe
          x={300}
          y={35}
          width={160}
          height={50}
          direction="left-down" //right-up,left-up,left-up
          active={true}
          pipeWidth={2}
          flowWidth={4}
          flowing={true}
          flowColor={"#00bfff"}
        />
        <ElbowPipe
          x={270}
          y={35}
          width={100}
          height={50}
          direction="left-down" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={300}
          y={35}
          width={100}
          height={50}
          direction="left-down" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />

        <PipeElbow
          x={320}
          y={35}
          //direction="top-left"
          //direction="bottom-left"
          //direction="top-right"
          direction="top-left"
          // top-right, top-left, bottom-right, bottom-left
          flowing={false}
          showArrow={false}
        />
        <Transmitter
          x={250}
          y={35}
          width={90}
          height={90}
          tag="FT-102"
          label=""
          type="FT"
          value={65}
          unit="m³/h"
        />
        <Ventury
          x={355}
          y={2}
          width={60}
          height={8}
          throat={8}
          label="V-101"
          direction="down"
          // active={flowRate > 0}
          // fontScale={1}
        />
        <Tank
          x={300}
          y={50}
          width={60}
          height={120}
          // level={tankRaw}
          color="#2196f3"
          label="RAW TANK"
        />

        <LevelMeter
          x={365}
          y={50}
          width={20}
          height={120}
          value={65}
          tag=""
          title=""
        />
        <ElbowPipe
          x={355}
          y={165}
          width={30}
          height={300}
          direction="right-down" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={385}
          y={465}
          width={45}
          height={55}
          direction="left-down" //right-up,left-up,left-up
          // active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <StartButton
          x={40}
          y={155}
          width={30}
          height={15}
          label="START"
          fontSize={8}
          backgroundColor="#16a34a"
          pressedColor="#15803d"
          borderColor="#22c55e"
          // disabled={localState.P101}
          // onClick={() => {
          //   setLocalState((prev) => ({
          //     ...prev,
          //     P101: true,
          //   }));
          //   sendCommand(deviceId, "P-101-CMD", "WRITE", true);
          // }}
        />
        <StopButton
          x={40}
          y={180}
          width={30}
          height={15}
          label="STOP"
          fontSize={8}
          // disabled={!localState.P101}
          // onClick={() => {
          //   setLocalState((prev) => ({
          //     ...prev,
          //     P101: false,
          //   }));
          //   sendCommand(deviceId, "P-101-CMD", "WRITE", false);
          // }}
        />
        <ManualValve
          x={270}
          y={175}
          width={60}
          height={60}
          direction={"right"}
          label={"SV"}
          tag="XV-102"
        />
        <DosingPump
          x={210}
          y={175}
          tag="P-101"
          label=""
          // running={localState.P101}
          direction={"right"}
        />

        <PipeStraight
          x={120}
          y={175}
          length={130}
          diameter={5}
          // running={localState.P101}
          direction={"left"}
        />
        <PipeElbow
          x={25}
          y={175}
          // direction="bottom-right"
          //direction="bottom-left"
          direction="top-right"
          //direction="top-left"
          // top-right, top-left, bottom-right, bottom-left
          flowing={false}
          showArrow={false}
        />
        <PipeStraight
          x={25}
          y={228}
          length={50}
          diameter={5}
          // running={localState.P101}
          direction={"down"}
          flowing={true}
        />
        {/* //DosingPump */}
        <PipeElbow
          x={25}
          y={285}
          direction="bottom-right"
          //direction="bottom-left"
          //direction="top-right"
          //direction="top-left"
          // top-right, top-left, bottom-right, bottom-left
          flowing={false}
          showArrow={false}
        />
        <PipeStraight
          x={120}
          y={285}
          length={130}
          diameter={5}
          // running={localState.P101}
          direction={"right"}
          flowing={true}
        />
        <Transmitter
          x={65}
          y={240}
          width={90}
          height={90}
          tag="FT-103"
          label=""
          type="FT"
          value={65}
          unit="m³/h"
        />
        <Transmitter
          x={150}
          y={240}
          width={90}
          height={90}
          tag="PT-101"
          label=""
          type="PT"
          value={65}
          unit="bar"
        />
        <PipeElbow
          x={190}
          y={220}
          direction="top-right"
          //direction="bottom-left"
          //direction="top-right"
          //direction="top-left"
          // top-right, top-left, bottom-right, bottom-left
          flowing={false}
          showArrow={false}
        />
        <PipeStraight
          x={250}
          y={220}
          length={65}
          diameter={5}
          // running={localState.P101}
          direction={"right"}
          flowing={true}
        />
        <PipeElbow
          x={310}
          y={220}
          direction="top-left"
          //direction="bottom-left"
          //direction="top-right"
          //direction="top-left"
          // top-right, top-left, bottom-right, bottom-left
          flowing={false}
          showArrow={false}
        />
        <PipeStraight
          x={190}
          y={255}
          length={10}
          diameter={5}
          // running={localState.P101}
          direction={"up"}
          flowing={true}
        />
        <PipeTee x={190} y={285} length={50} direction="left" flowing={true} />
      </svg>
    </div>
  );
};

export default MimicHP;
