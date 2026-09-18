import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UV from "../MimicRO/UV";
import OperatorPanel from "../MimicRO/OperatorPanel";
import Valve from "../MimicRO/Valve";
import MembraneVertical from "../MimicRO/MembraneVertical";
import Tank from "../MimicRO/Tank";
import ElbowPipe from "../MimicRO/ElbowPipe";
import MembraneHorizontal from "../MimicRO/MembraneHorisontal";
import Pump from "../MimicRO/Pump";
import WaterGallon from "../MimicRO/WaterGallon";
import Arrow from "../MimicRO/Arrow";
import SalesSummaryPanel from "../MimicRO/SalesSummaryPanel";
import ProductionSummaryPanel from "../MimicRO/ProductionSummaryPanel";
import AlarmBanner from "../MimicRO/AlarmBanner";
import SystemCapabilitiesPanel from "../MimicRO/SystemCapabilitiesPanel";
import AnalyzerPanel from "../MimicRO/AnalyzerPanel";
//import { socket } from "../../lib/socket";
import FlowMeter from "../MimicRO/FlowMeter";
import PressureGauge from "../MimicRO/PressureGauge";
import Ventury from "../MimicRO/Ventury";
import PHMeter from "../MimicRO/PHMeter";
import TdsMeter from "../MimicRO/TdsMeter";
import WaterHistorian from "../MimicRO/WaterHistorian";
// import {
//   updateTag,
//   updateTags,
//   upsertDeviceRealtime,
//   clearDeviceError,
// } from "../../features/ro/deviceSlice";
import useLocation from "../MimicRO/useLocation.js";

import Wilayah from "../MimicRO/Wilayah.jsx";
//import StopValve from "../MimicRO/utilsSvg/StopValve.jsx";
import SolenoidValve from "../MimicRO/utilsSvg/valves/SolenoidValve.jsx";
import AllValve from "../MimicRO/utilsSvg/valves/AllValve.jsx";
import AllFilter from "../MimicRO/utilsSvg/filters/AllFilter.jsx";
import ManualValve from "../MimicRO/utilsSvg/valves/ManualValve.jsx";
import AllMotors from "../MimicRO/utilsSvg/motors/AllMotors.jsx";
//import AllPump from "../MimicRO/utilsSvg/pumps";
import AllPump from "../MimicRO/utilsSvg/pumps/index.jsx";
import AllTanks from "../MimicRO/utilsSvg/tanks/Index.jsx";
import AllPipe from "../MimicRO/utilsSvg/pipes/Index.jsx";
import AllInstruments from "../MimicRO/utilsSvg/intrumentation/Index.jsx";
//import { connectSocket, socket } from "../../lib/socket.js";
import StartButton from "../MimicRO/utilsSvg/buttons/StartButton.jsx";
import StopButton from "../MimicRO/utilsSvg/buttons/StopButton.jsx";
import MotorizedValve from "../MimicRO/utilsSvg/valves/MotorizedValve.jsx";
import PIDController4 from "../MimicRO/utilsSvg/intrumentation/PIDController4.jsx";
import Transmitter from "../MimicRO/utilsSvg/transmitter/Transmitter.jsx";
import PumpHorizontal from "../MimicRO/utilsSvg/pumps/PumpHorizontal.jsx";
import PipeStraight from "../MimicRO/utilsSvg/pipes/PipeStraight.jsx";
import PipeElbow from "../MimicRO/utilsSvg/pipes/PipeElbow.jsx";
import PipeTee from "../MimicRO/utilsSvg/pipes/PipeTee.jsx";
import DosingPump from "../MimicRO/utilsSvg/pumps/DosingPump.jsx";
import PipeArrow from "../MimicRO/utilsSvg/pipes/PipeArrow.jsx";
import EmergencyStop from "../MimicRO/utilsSvg/buttons/EmergencyStop.jsx";
//import { createTransport } from "../../lib/TransportFactory.js";

const MimicHP = ({ deviceId }) => {
  const ws = useRef(null);

  const transport = useRef(null);
  const [espStatus, setEspStatus] = useState("DISCONNECTED");
  const [lastMessage, setLastMessage] = useState(null);
  const lockMap = useRef(new Map());
  const Logo = ({ x = 0, y = 0 }) => (
    <g transform={`translate(${x},${y})`}>
      <image href="/logo_converted.svg" width="48" height="48" />
    </g>
  );
  const [mode, setMode] = useState("AUTO");
  const [sp, setSp] = useState(60);
  const [estop, setEstop] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.4.1:81");

    ws.current.onopen = () => {
      console.log("Connected");

      ws.current.send(
        JSON.stringify({
          action: "REFRESH",
        }),
      );
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleEStop = async (state) => {
    // setEstop(state);
    // try {
    //   if (state) {
    //     console.log("ALL SYSTEM STOPPED");
    //     // stop pump, valve, motor dll
    //     await fetch("/api/emergency", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         estop: state,
    //       }),
    //     });
    //   } else {
    //     console.log("SYSTEM READY");
    //   }
    // } catch (err) {
    //   console.error("Failed send E-Stop:", err);
    // }
  };
  const sendCommand = (deviceId, tagNumber, action, value) => {
    if (!transport.current) return;

    if (espStatus !== "CONNECTED") {
      console.warn("ESP belum connected");
      return;
    }

    transport.current.write(tagNumber, value);
  };

  // =========================
  // RESPONSIVE FIX (IMPORTANT)
  // =========================
  const [isMobile, setIsMobile] = useState(false);
  const [token] = useState(localStorage.getItem("accessToken"));
  // console.log(token);
  const devices = useSelector((state) => state.devices);
  console.log(devices);
  const { location, error } = useLocation();
  //console.log(location);

  const tag = useSelector((state) => state.devices.tag || {});

  const tags = useSelector((state) => state.devices.tags || {});
  const realtime = useSelector((state) => state.devices.realtime?.[deviceId]);
  console.log(tags);

  const online = useSelector((state) => {
    const dev = state.devices.devices.find((d) => d.deviceId === deviceId);

    return dev?.isOnline ?? false;
  });

  // Feed Pump
  const feedPumpCmd = tags["CMD_FP101_RUN"]?.value ?? false;
  const feedPumpRun = tags["ST_FP101_RUN"]?.value ?? false;
  const feedPumpFb = tags["FB_FP101_RUN"]?.value ?? false;
  const feedPumpAlm = tags["ALM_FP101_FAIL"]?.value ?? false;

  // Dosing Pump
  const dosingCmd = tags["CMD_DP201_RUN"]?.value ?? false;
  const dosingRun = tags["ST_DP201_RUN"]?.value ?? false;
  const dosingFb = tags["FB_DP201_RUN"]?.value ?? false;
  const dosingAlm = tags["ALM_DP201_FAIL"]?.value ?? false;

  // UV
  const uvCmd = tags["CMD_UV301_RUN"]?.value ?? false;
  const uvRun = tags["ST_UV301_RUN"]?.value ?? false;
  const uvFb = tags["FB_UV301_RUN"]?.value ?? false;
  const uvAlm = tags["ALM_UV301_FAIL"]?.value ?? false;

  // Mode
  const autoMode = tags["AUTO_MODE"]?.value ?? false;

  //const estop = tags["E-STOP"]?.value ?? false;

  const pressureFeed = tags["PT101"]?.value ?? 0;
  const pressureMembrane = tags["PT102"]?.value ?? 0;

  const flowRate = tags["FT101"]?.value ?? 0;

  const tdsIn = tags["AIT-101"]?.value ?? 0;
  const tdsOut = tags["TDS_PRODUCT"]?.value ?? 0;

  const ph = tags["AIT-103"]?.value ?? 7;

  const tankRaw = tags["LEVEL_RAW"]?.value ?? 0;

  const tankProduct = tags["LEVEL_PRODUCT"]?.value ?? 0;

  const recoveryRate = tags["CALC-101"]?.value ?? 0;
  const rejectionRate = tags["CALC-102"]?.value ?? 0;

  const status = tags["SYS-001"]?.value ?? "NORMAL";

  const uvIntensity = tags["UV_INTENSITY"]?.value ?? 0;

  const ambientTemp = tags["TT101_AMB"]?.value ?? 0;

  const ambientHum = tags["HT101_AMB"]?.value ?? 0;

  const alarmFP = tags["ALM_FP101_FAIL"]?.value ?? false;

  const alarmDP = tags["ALM_DP201_FAIL"]?.value ?? false;

  const alarmUV = tags["ALM_UV301_FAIL"]?.value ?? false;

  // online = realtime?.isOnline ?? false;

  // console.log(tags);

  const [localState, setLocalState] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      console.log(location.latitude);
      console.log(location.longitude);
    }
  }, [location]);

  // =========================
  // ALARM
  // =========================
  const alarmMessage = alarmFP
    ? "FEED PUMP FAILURE"
    : alarmDP
      ? "DOSING PUMP FAILURE"
      : alarmUV
        ? "UV FAILURE"
        : estop
          ? "EMERGENCY STOP ACTIVE"
          : "SYSTEM NORMAL";
  return (
    <div className="w-full min-h-screen bg-slate-900 overflow-auto">
      {/* ================= HEADER / TITLE ================= */}
      <div
        className="card-header d-flex align-items-center justify-content-between text-white"
        style={{
          background: "#1f2937",
          borderBottom: "3px solid #0dcaf0",
          minHeight: "56px",
        }}
      >
        <div style={{ width: 100 }}></div>

        <h4 className="mb-0 fw-bold text-center flex-grow-1">
          {deviceId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </h4>

        <div style={{ width: 100 }} className="text-end">
          <span className={`badge ${online ? "bg-success" : "bg-danger"}`}>
            {online ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>
      <svg
        viewBox="0 0 400 1500"
        width="100%"
        height="5500"
        className="bg-black"
        preserveAspectRatio="xMidYMin meet"
      >
        {/* ================= PIPE SYSTEM ================= */}

        <EmergencyStop
          x={165}
          y={1}
          width={25}
          height={25}
          labelOn={"ON"}
          labelOff={"OFF"}
          fontSize={8}
          disabled={false}
          onToggle={() => handleEStop(estop)}
        />

        {/* ############################################### */}
        <PipeElbow
          x={190}
          y={340}
          //direction="top-right"
          direction="bottom-left"
          //direction="top-right"
          //direction="top-left"
          // top-right, top-left, bottom-right, bottom-left
          flowing={false}
          showArrow={false}
        />
        <StopButton
          x={80}
          y={345}
          width={30}
          height={15}
          label="STOP"
          fontSize={8}
          disabled={!localState.D301}
          onClick={() => {
            setLocalState((prev) => ({
              ...prev,
              D301: false,
            }));
            sendCommand(deviceId, "D-301-CMD", "WRITE", false);
          }}
        />
        <PipeStraight
          x={120}
          y={340}
          length={80}
          diameter={5}
          running={localState.P101}
          direction={"right"}
          flowing={true}
        />
        <StartButton
          x={80}
          y={320}
          width={30}
          height={15}
          label="START"
          fontSize={8}
          backgroundColor="#16a34a"
          pressedColor="#15803d"
          borderColor="#22c55e"
          disabled={localState.D301}
          onClick={() => {
            setLocalState((prev) => ({
              ...prev,
              D301: true,
            }));
            sendCommand(deviceId, "D-301-CMD", "WRITE", true);
          }}
        />
        <Ventury
          x={355}
          y={185}
          width={60}
          height={15}
          throat={8}
          label="VENT-102"
          direction="down"
          active={flowRate > 0}
        />
        <Tank
          x={300}
          y={250}
          width={60}
          height={120}
          level={tankProduct}
          color="#2196f3"
          label="RAW TANK"
        />
        <ElbowPipe
          x={355}
          y={365}
          width={15}
          height={52}
          direction="right-down" //right-up,left-up,left-up
          active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <ElbowPipe
          x={370}
          y={418}
          width={60}
          height={20}
          direction="left-down" //right-up,left-up,left-up
          active={flowRate > 0}
          pipeWidth={2}
          flowWidth={4}
        />
        <StopButton
          x={178}
          y={345}
          width={30}
          height={15}
          label="STOP"
          fontSize={8}
          disabled={!localState.MP101}
          onClick={() => {
            setLocalState((prev) => ({
              ...prev,
              MP101: false,
            }));
            sendCommand(deviceId, "MP-101-CMD", "WRITE", false);
          }}
        />
        <MotorizedValve
          x={220}
          y={365}
          width={50}
          height={45}
          valveScale={1.1}
          stemScale={1.5}
          actuatorScale={2.5}
          label="START"
          tag={"MP-101"}
          open={localState.MP101}
          // alarm={false}
          fontSize={10}
          backgroundColor="#16a34a"
          pressedColor="#15803d"
          borderColor="#22c55e"
          //disabled={localState.MP101}
          // onClick={() => {
          //   setLocalState((prev) => ({
          //     ...prev,
          //     MP101: true,
          //   }));
          //   sendCommand(deviceId, "MP-101-CMD", "WRITE", true);
          // }}
        />
        <StartButton
          x={230}
          y={345}
          width={30}
          height={15}
          label="START"
          fontSize={8}
          backgroundColor="#16a34a"
          pressedColor="#15803d"
          borderColor="#22c55e"
          disabled={localState.MP101}
          onClick={() => {
            setLocalState((prev) => ({
              ...prev,
              MP101: true,
            }));
            sendCommand(deviceId, "MP-101-CMD", "WRITE", true);
          }}
        />
        <ManualValve
          x={280}
          y={365}
          width={50}
          height={70}
          direction={"right"}
          label={""}
          tag="XV-102"
        />
        <ManualValve
          x={310}
          y={445}
          width={50}
          height={70}
          direction={"down"}
          label={""}
          tag="XV-103"
        />
        <ManualValve
          x={340}
          y={535}
          width={50}
          height={70}
          direction={"up"}
          label={""}
          tag="XV-104"
        />
        <PipeStraight
          x={250}
          y={365}
          length={24}
          diameter={4}
          running={localState.P101}
          direction={"left"}
          flowing={localState.MP101}
        />
        <ElbowPipe
          x={200}
          y={365}
          width={20}
          height={40}
          direction="left-down" //right-up,left-up,left-up
          active={localState.MP101}
          pipeWidth={2}
          flowWidth={4}
        />
        <StopButton
          x={120}
          y={455}
          width={30}
          height={15}
          label="STOP"
          fontSize={8}
          disabled={!localState.UV101}
          onClick={() => {
            setLocalState((prev) => ({
              ...prev,
              UV101: false,
            }));
            sendCommand(deviceId, "UV-101-CMD", "WRITE", false);
          }}
        />
        <UV
          x={120}
          y={400}
          width={100}
          height={50}
          // active={uvLamp}
          active={localState.UV101}
          // flowActive={feedPump}
          label="UV-102"
        />
        <StartButton
          x={190}
          y={455}
          width={30}
          height={15}
          label="START"
          fontSize={8}
          backgroundColor="#16a34a"
          pressedColor="#15803d"
          borderColor="#22c55e"
          disabled={localState.UV101}
          onClick={() => {
            setLocalState((prev) => ({
              ...prev,
              UV101: true,
            }));
            sendCommand(deviceId, "UV-101-CMD", "WRITE", true);
          }}
        />
        <ElbowPipe
          x={120}
          y={425}
          width={60}
          height={15}
          direction="left-down" //right-up,left-up,left-up
          active={localState.UV101}
          pipeWidth={2}
          flowWidth={4}
        />
        <PipeStraight
          x={60}
          y={450}
          length={24}
          diameter={3}
          running={localState.UV101}
          direction={"down"}
          flowing={localState.UV101}
        />
        <Transmitter
          x={40}
          y={380}
          width={90}
          height={90}
          tag="FT-104"
          label=""
          type="FT"
          value={65}
          unit="m³/h"
        />

        <Arrow
          x={40}
          y={430}
          width={40}
          height={60}
          direction="down"
          label="PRODUCT"
          active={localState.UV101}
          animated={localState.UV101}
        />
        <WaterGallon x={15} y={480} w={90} h={100} label="ALKALI" />
        <WaterGallon x={110} y={480} w={90} h={100} label="ALKALI" />
        {/* <PHMeter x={120} y={425} />
        <TdsMeter x={120} y={480} /> */}
        <WaterGallon x={200} y={480} w={90} h={100} label="ALKALI" />
        {/* ================= UI PANELS ================= */}

        {/* <OperatorPanel
          x={isMobile ? 20 : 820}
          y={isMobile ? 580 : 50}
          panelWidth={isMobile ? 360 : 320}
          panelHeight={260}
          feedPump={feedPump}
          hpPump={hpPump}
          flushing={flushing}
          dosingPh={dosingPh}
          uvLamp={uvLamp} // 🔥 INI WAJIB
          deviceId={deviceId}
          token={token}
          localState={localState}
          setLocalState={setLocalState}
          connectSocket={connectSocket}
          socket={socket}
          sendCommand={sendCommand}
          handleEStop={(estop) => handleEStop(estop)}
        /> */}
        <AlarmBanner
          x={20}
          y={850}
          width={360}
          status={status}
          message={alarmMessage}
          activeAlarms={3}
        />
        <AnalyzerPanel
          x={20}
          y={920}
          width={360}
          height={200}
          ph={ph}
          tdsIn={tdsIn}
          tdsOut={tdsOut}
          recoveryRate={recoveryRate}
          rejectionRate={rejectionRate}
        />
        <SalesSummaryPanel
          x={20}
          y={1180}
          width={167}
          height={100}
          roSales={120}
          alkaliSales={40}
          totalSales={160}
          revenue={1400000}
        />
        <ProductionSummaryPanel x={220} y={1180} width={160} height={100} />
        <Wilayah
          x={20}
          y={1800}
          width={220}
          height={40}
          title="Provinsi"
          // items={provinces}
          // value={selectedProvince}
          // onChange={(id) => {
          //   setSelectedProvince(id);
          //   dispatch(getKab({ id }));
          // }}
        />
        <SystemCapabilitiesPanel
          x={20}
          y={1300}
          width={360}
          height={190}
          // device={deviceState}
        />
        <AllValve x={40} y={2150} />
        <AllFilter x={40} y={2900} />
        <AllMotors x={40} y={3200} width={50} height={50} />
        <AllPump x={40} y={3500} width={50} height={50} />
        <AllTanks x={40} y={3900} width={50} height={50} />
        <AllPipe x={40} y={4500} width={50} height={50} />
        <AllInstruments x={40} y={5000} width={50} height={50} />
        <PIDController4
          x={175}
          y={1650}
          width={350}
          height={200}
          tag={"PIC-101"}
          label={"DIGITAL TWIN PID"}
          mode={mode}
          sp={sp}
          onModeChange={setMode}
          onSPChange={setSp}
        />
      </svg>
    </div>
  );
};

export default MimicHP;
