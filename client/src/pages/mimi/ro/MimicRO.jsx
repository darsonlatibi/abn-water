import React, { useEffect, useMemo, useState } from "react";
import AlarmBanner from "../MimicRO/AlarmBanner";
import AnalyzerPanel from "../MimicRO/AnalyzerPanel";
import FlowIndicator from "../MimicRO/FlowIndicator";

import PressureGauge from "../MimicRO/PressureGauge";
import Pump from "../MimicRO/Pump";
import Tank from "../MimicRO/Tank";
import Valve from "../MimicRO/Valve";
import Line from "../MimicRO/Line";
import MembraneVertical from "../MimicRO/MembraneVertical";
import PressureTransmitter from "../MimicRO/PressureTransmitter";
import ElbowPipe from "../MimicRO/ElbowPipe";
import TeePipe from "../MimicRO/TeePipe";
import UV from "../MimicRO/UV";
import SensorLevel from "../MimicRO/SensorLevel";
import Arrow from "../MimicRO/Arrow";
import Spray from "../MimicRO/Spray";
import MembraneHorizontal from "../MimicRO/MembraneHorisontal";

import CrossPipe from "../MimicRO/CrossPipe";
import TT from "../MimicRO/TT";
import Notes from "../MimicRO/Notes";
import Ventury from "../MimicRO/Ventury";
import RecoveryInfo from "../MimicRO/RecoveryInfo";
import OperatorPanel from "../MimicRO/OperatorPanel";
import WaterGallon from "../MimicRO/WaterGallon";
import SystemCapabilitiesPanel from "../MimicRO/SystemCapabilitiesPanel";
import SalesSummaryPanel from "../MimicRO/SalesSummaryPanel";
import { socket } from "../../lib/socket";
import MiniMap from "../MimicRO/MiniMap";
import ProductionSummaryPanel from "../MimicRO/ProductionSummaryPanel";

const MimicRO = ({
  deviceId,
  pressureFeed = 0,
  pressureMembrane = 0,
  flowRate = 0,
  tdsIn = 0,
  tdsOut = 0,
  ph = 7,
  tankRaw = 0,
  tankProduct = 0,
  temperature = 0,
  recoveryRate = 0,
  rejectionRate = 0,
  status = "NORMAL",
}) => {
  const [feedPump, setFeedPump] = useState(false);
  const [hpPump, setHpPump] = useState(false);
  const [flushing, setFlushing] = useState(false);
  const [dosingPh, setDosingPh] = useState(false);

  const [deviceState, setDeviceState] = useState({
    deviceId: "",
    feedPump: false,
    hpPump: false,
    flushing: false,
    dosingPh: false,
    mode: "NORMAL",
    lat: null,
    lng: null,
  });

  const [location, setLocation] = useState(null);
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    const handleAck = (data) => {
      console.log("ACK:", data);

      if (!data?.success) return;

      switch (data.command) {
        case "START_FEED_PUMP":
          setFeedPump(true);
          break;

        case "STOP_FEED_PUMP":
          setFeedPump(false);
          break;

        case "START_HP_PUMP":
          setHpPump(true);
          break;

        case "STOP_HP_PUMP":
          setHpPump(false);
          break;

        case "START_FLUSH":
          setFlushing(true);
          break;

        case "STOP_FLUSH":
          setFlushing(false);
          break;

        case "START_DOSING":
          setDosingPh(true);
          break;

        case "STOP_DOSING":
          setDosingPh(false);
          break;

        case "EMERGENCY_STOP":
          setFeedPump(false);
          setHpPump(false);
          setFlushing(false);
          setDosingPh(false);
          break;
      }
    };

    socket.on("device:command:ack", handleAck);

    return () => {
      socket.off("device:command:ack", handleAck);
    };
  }, []);

  // useEffect(() => {
  //   const handleDeviceState = (data) => {
  //     if (!data) return;

  //     setDeviceState((prev) => ({
  //       ...prev,
  //       ...data,
  //     }));
  //   };

  //   socket.on("device:state", handleDeviceState);

  //   return () => {
  //     socket.off("device:state", handleDeviceState);
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("CONNECTED:", socket.id);
  //   });

  //   socket.on("disconnect", (reason) => {
  //     console.log("DISCONNECTED:", reason);
  //   });

  //   socket.on("connect_error", (err) => {
  //     console.log("CONNECT ERROR:", err.message);
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("connect_error");
  //   };
  // }, []);

  const handleCommand = (command) => {
    socket.emit("device:command", {
      deviceId,
      command,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="card shadow border">
      <div className="card-header bg-dark text-white text-center">
        <h3
          className="card-title mb-0"
          style={{
            float: "none",
            width: "100%",
            textAlign: "center",
          }}
        >
          RO SCADA Mimic - {deviceId}
        </h3>
      </div>

      <div className="card-body bg-black border">
        <svg
          width="100%"
          height="650"
          viewBox="0 0 1400 650"
          preserveAspectRatio="xMidYMid meet"
        >
          <OperatorPanel
            feedPump={feedPump}
            hpPump={hpPump}
            flushing={flushing}
            dosingPh={dosingPh}
            onCommand={handleCommand}
          />
          {/* =========================
              FEED PRESSURE
          ========================= */}
          <PressureGauge
            x={345}
            y={120}
            value={pressureFeed}
            max={15}
            label="PT-101"
          />
          <PressureTransmitter
            x={383}
            y={358}
            value={pressureFeed}
            label="PT-101"
            alarmHigh={12}
          />
          {/* =========================
              ANALYZER PANEL
          ========================= */}
          <AnalyzerPanel
            x={430}
            y={20}
            ph={ph}
            tdsIn={tdsIn}
            tdsOut={tdsOut}
            recoveryRate={recoveryRate}
            rejectionRate={rejectionRate}
          />
          {/* =========================
              MEMBRANE PRESSURE
          ========================= */}
          <PressureGauge
            x={800}
            y={120}
            value={pressureMembrane}
            max={20}
            label="PT-102"
          />
          <RecoveryInfo
            x={750}
            y={205}
            recoveryRate={recoveryRate}
            rejectionRate={rejectionRate}
          />
          {/* =========================
              TEMPERATURE PANEL
          ========================= */}
          <TT x={960} y={60} tag="TT-101" value={temperature} />
          {/* =========================
              ALARM BANNER
          ========================= */}
          <AlarmBanner x={1150} y={10} status={status} />

          {/* =========================
              VALVE
          ========================= */}

          <Valve
            x={50}
            y={330}
            label="FEED VALVE"
            tag="XV-101"
            open={flowRate > 0}
            alarm={false}
            direction="right"
          />
          <Line
            x={70}
            y={330}
            length={50}
            direction="right"
            active={flowRate > 0}
          />
          {/* =========================
                        ARROW START HERE
            ========================= */}
          <Arrow
            x={0}
            y={420}
            length={120}
            direction="right"
            label="PDAM"
            value={`${flowRate} m3/h`}
            active={flowRate > 0}
          />
          {/* =========================
              MULTIMEDIA FILTER
          ========================= */}
          <MembraneVertical
            x={126}
            y={240}
            width={50}
            height={200}
            color="#e6d5a8"
            label="SAND"
          />
          <Line
            x={182}
            y={330}
            length={25}
            direction="right"
            active={flowRate > 0}
          />
          {/* =========================
              CARBON FILTER
          ========================= */}
          <MembraneVertical
            x={210}
            y={240}
            width={50}
            height={200}
            color="#2f2f2f"
            label="CARBON"
          />
          <Line
            x={268}
            y={330}
            length={28}
            direction="right"
            active={flowRate > 0}
          />
          <MembraneVertical
            x={300}
            y={240}
            width={50}
            height={200}
            color="#7b2cbf"
            label="MANGAN"
          />
          <Line
            x={356}
            y={425}
            length={60}
            direction="right"
            active={flowRate > 0}
          />
          <Line
            x={420}
            y={425}
            length={220}
            direction="up"
            active={flowRate > 0}
          />
          <ElbowPipe
            x={420}
            y={200}
            width={143}
            height={15}
            direction="right-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <Spray x={550} y={220} direction="down" active={true} />
          <SensorLevel
            x={510}
            y={240}
            value={tankRaw}
            label="LT-RAW"
            minAlarm={15}
            maxAlarm={85}
          />
          <ElbowPipe
            x={545}
            y={420}
            width={30}
            height={50}
            direction="left-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <Valve
            x={515}
            y={490}
            label="DISCHARGE VALVE"
            tag="XV-102"
            open={flowRate > 0}
            alarm={false}
            direction="down"
          />
          <Tank
            x={540}
            y={220}
            width={110}
            height={220}
            level={tankRaw}
            color="#2196f3"
            label="RAW TANK"
          />
          <Pump
            x={740}
            y={420}
            running={flowRate > 0}
            runtime={245}
            frequency={50}
            current={4.8}
          />
          <Valve
            x={830}
            y={420}
            label="FEED VALVE"
            tag="XV-103"
            open={flowRate > 0}
            alarm={false}
            direction="right"
          />
          <Line
            x={868}
            y={418}
            length={40}
            direction="right"
            active={flowRate > 0}
          />

          {/*  */}
          <ElbowPipe
            x={960}
            y={250}
            width={30}
            height={50}
            direction="left-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <TeePipe
            x={930}
            y={305}
            size={10}
            direction="down"
            active={flowRate > 0}
          />
          <PressureTransmitter
            x={930}
            y={196}
            value={pressureFeed}
            label="PT-102"
            alarmHigh={12}
          />
          <ElbowPipe
            x={968}
            y={370}
            width={38}
            height={47}
            direction="left-up" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <ElbowPipe
            x={892}
            y={418}
            width={38}
            height={45}
            direction="right-up" //right-up,left-up,left-up
            active={flowRate > 0}
          />

          {/*  */}
          <MembraneHorizontal
            x={950}
            y={230}
            width={150}
            height={40}
            label=""
            tag="RO-101"
            direction="right"
            active={true}
            flowActive={flowRate > 0}
          />
          <MembraneHorizontal
            x={950}
            y={290}
            width={150}
            height={40}
            label=""
            tag="RO-102"
            direction="right"
            active={true}
            flowActive={flowRate > 0}
          />
          <MembraneHorizontal
            x={950}
            y={350}
            width={150}
            height={40}
            label=""
            tag="RO-103"
            direction="right"
            active={true}
            flowActive={flowRate > 0}
          />
          <ElbowPipe
            x={1105}
            y={252}
            width={15}
            height={40}
            direction="right-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <CrossPipe x={1120} y={310} size={30} active={flowRate > 0} />
          <PressureTransmitter
            x={1225}
            y={158}
            value={pressureFeed}
            label="PT-103"
            alarmHigh={12}
          />
          <ElbowPipe
            x={1105}
            y={370}
            width={15}
            height={40}
            direction="right-up" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <ElbowPipe
            x={1142}
            y={310}
            width={80}
            height={112}
            direction="right-up" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <ElbowPipe
            x={1230}
            y={198}
            width={50}
            height={15}
            direction="right-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <Ventury
            x={1275}
            y={105}
            width={90}
            height={20}
            throat={8}
            label="VENT-101"
            direction="down"
            active={flowRate > 0}
          />
          <Tank
            x={1260}
            y={220}
            width={110}
            height={180}
            level={tankProduct}
            color="#28a745"
            label="PRODUCT"
          />
          <Valve
            x={1230}
            y={390}
            label=""
            tag="VM-104"
            open={flowRate > 0}
            alarm={false}
            direction="right"
          />
          <SensorLevel
            x={1380}
            y={240}
            value={tankRaw}
            label="LT-RAW"
            minAlarm={15}
            maxAlarm={85}
          />
          <ProductionSummaryPanel x={1240} y={500} width={160} height={150} />
          <ElbowPipe
            x={1370}
            y={390}
            width={10}
            height={50}
            direction="right-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <Valve
            x={1380}
            y={460}
            label="DISCH."
            tag="XV-104"
            open={flowRate > 0}
            alarm={false}
            direction="down"
          />

          <ElbowPipe
            x={1200}
            y={390}
            width={20}
            height={25}
            direction="left-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <ElbowPipe
            x={1020}
            y={440}
            width={160}
            height={25}
            direction="right-up" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <ElbowPipe
            x={1015}
            y={440}
            width={100}
            height={30}
            direction="left-down" //right-up,left-up,left-up
            active={flowRate > 0}
          />
          <UV
            x={880}
            y={483}
            width={70}
            height={50}
            direction="down"
            active={true}
            flowActive={flowRate > 0}
            label="UV-101"
          />
          <ElbowPipe
            x={895}
            y={550}
            width={20}
            height={10}
            direction="right-up" //right-up,left-up,left-up
            active={flowRate > 0}
          />

          <Arrow
            x={910}
            y={550}
            length={120}
            direction="left"
            label="PRODUCT"
            value={`${flowRate} m3/h`}
            active={flowRate > 0}
          />

          <WaterGallon x={680} y={555} w={90} h={100} label="ALKALI" />
          <WaterGallon x={750} y={555} w={90} h={100} label="ALKALI" />
          <SystemCapabilitiesPanel
            x={960}
            y={460}
            width={270}
            height={190}
            device={deviceState}
            l={"https://maps.app.goo.gl/reAews2NKmTP41hk7"}
          />
          <SalesSummaryPanel
            x={515}
            y={550}
            width={167}
            height={100}
            roSales={120}
            alkaliSales={40}
            totalSales={160}
            revenue={1400000}
          />
          <Notes
            x={0}
            y={510}
            ph={ph}
            tdsIn={tdsIn}
            tdsOut={tdsOut}
            pressureFeed={pressureFeed}
            pressureMembrane={pressureMembrane}
            recoveryRate={recoveryRate}
            rejectionRate={rejectionRate}
            flowRate={flowRate}
            temperature={temperature}
          />
          {/* <MiniMap
            lat={Number(deviceState?.lat)}
            lng={Number(deviceState?.lng)}
            bounds={{
              minLat: -7.3,
              maxLat: -7.2,
              minLng: 112.7,
              maxLng: 112.8,
            }}
          /> */}
        </svg>
      </div>
    </div>
  );
};

export default MimicRO;
