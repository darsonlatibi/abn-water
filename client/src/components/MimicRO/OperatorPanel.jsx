import React, { useEffect, useRef, useState } from "react";
//import { connectSocket, socket } from "../../lib/socket";
import PushButtonSvg from "./utilsSvg/PushButtonSvg";
//import InputSvg from "./utilsSvg/InputSvg";
import { SCADA_COLOR } from "./constants/scada_color";
import StopButton from "./utilsSvg/buttons/StopButton";
import StartButton from "./utilsSvg/buttons/StartButton";
import EmergencyStop from "./utilsSvg/buttons/EmergencyStop";
const getPumpColor = (state) => {
  if (state === true) return "#16a34a"; // RUN (GREEN)
  if (state === false) return "#dc2626"; // STOP (RED)
  return "#6b7280"; // UNKNOWN (GRAY)
};
const getAlarmColor = (alarm) => {
  if (alarm) return "#ef4444"; // RED ALARM
  return "#22c55e"; // NORMAL GREEN
};

const OperatorPanel = ({
  x = 0,
  y = 0,
  panelWidth = 260,
  panelHeight = 220,
  headerHeight = 30,
  title = "OPERATOR PANEL",
  fontFamily = "Arial",
  fontSize = 12,
  buttonFontSize = 10,
  titleSize = 14,
  buttonWidth = 100,
  buttonHeight = 24,

  deviceId,
  feedPump = false,
  hpPump = false,
  flushing = false,
  dosingPh = false,
  uvLamp = false,

  mode = "MANUAL",
  alarmActive = false,
  token,
  localState = {},
  setLocalState,
  connectSocket,
  socket,
  sendCommand = () => {},
  handleEStop = () => {},
}) => {
  const lockMap = useRef(new Map());

  // const [localState, setLocalState] = useState({
  //   P101: feedPump,
  //   P102: hpPump,
  //   V201: flushing,
  //   D301: dosingPh,
  //   UV101: uvLamp,
  // });

  useEffect(() => {
    //const token = localStorage.getItem("accessToken");
    console.log(token);
    connectSocket(token, deviceId);

    const handleAck = (data) => {
      console.log("ACK:", data);

      const { tagNumber, value } = data;

      setLocalState((prev) => {
        switch (tagNumber) {
          case "P-101-CMD":
            return { ...prev, P101: value };
          case "P-102-CMD":
            return { ...prev, P102: value };
          case "V-201-CMD":
            return { ...prev, V201: value };
          case "D-301-CMD":
            return { ...prev, D301: value };
          case "UV-101-CMD":
            return { ...prev, UV101: value };
          default:
            return prev;
        }
      });
    };
    const handleError = (err) => console.error("DEVICE ERROR:", err);

    socket.on("device:command:ack", handleAck);
    socket.on("device:error", handleError);

    return () => {
      socket.off("device:command:ack", handleAck);
      socket.off("device:error", handleError);
    };
  }, [deviceId, setLocalState]);

  // =========================
  // MODE LOGIC
  // =========================
  const isAuto = mode === "AUTO";
  const nextMode = isAuto ? "MANUAL" : "AUTO";

  // const handleModeToggle = () => sendCommand("SYSTEM", "SET_MODE", nextMode);

  // const handleAck = () => sendCommand("SYSTEM", "ACK_ALARM", true);

  // const handleReset = () => sendCommand("SYSTEM", "RESET_ALARM", true);

  const handleHeaderClick = () =>
    sendCommand(deviceId, "SYSTEM", "PING_DEVICE", true);

  return (
    <g transform={`translate(${x},${y})`}>
      {/* PANEL */}
      <rect
        width={panelWidth}
        height={panelHeight}
        rx="8"
        fill="#1e1e1e"
        stroke="#666"
        strokeWidth="2"
      />

      {/* HEADER */}
      <rect width={panelWidth} height={headerHeight} fill="#343a40" />

      <text
        x={panelWidth / 2}
        y={headerHeight / 2 + 5}
        fill="#fff"
        textAnchor="middle"
        fontWeight="bold"
        fontSize={titleSize}
        style={{ cursor: "pointer", pointerEvents: "all" }}
        onPointerDown={handleHeaderClick}
      >
        {title}
      </text>
      {/* P-101 Feed Pump */}
      <text x="15" y="55" fill="#fff" fontSize={fontSize}>
        P-101 Feed Pump
      </text>
      {localState.P101 && (
        <circle
          cx={250}
          cy={52}
          r={10}
          fill="none"
          stroke="#28a745"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            values="10;18;10"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <StopButton
        x={270}
        y={45}
        width={30}
        height={15}
        label="STOP"
        fontSize={10}
        disabled={!localState.P101}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            P101: false,
          }));
          sendCommand(deviceId, "P-101-CMD", "WRITE", false);
        }}
      />

      <StartButton
        x={310}
        y={45}
        width={30}
        height={15}
        label="START"
        fontSize={10}
        backgroundColor="#16a34a"
        pressedColor="#15803d"
        borderColor="#22c55e"
        disabled={localState.P101}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            P101: true,
          }));
          sendCommand(deviceId, "P-101-CMD", "WRITE", true);
        }}
      />

      {/* P-102 HP Pump */}
      <text x="15" y="90" fill="#fff" fontSize={fontSize}>
        P-102 HP Pump
      </text>

      {localState.P102 && (
        <circle
          cx={250}
          cy={86}
          r={10}
          fill="none"
          stroke="#28a745"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            values="10;18;10"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <StopButton
        x={270}
        y={80}
        width={30}
        height={15}
        label="STOP"
        fontSize={10}
        disabled={!localState.P102}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            P102: false,
          }));
          sendCommand(deviceId, "P-102-CMD", "WRITE", false);
        }}
      />
      <StartButton
        x={310}
        y={80}
        width={30}
        height={15}
        label="START"
        fontSize={10}
        backgroundColor="#16a34a"
        pressedColor="#15803d"
        borderColor="#22c55e"
        disabled={localState.P102}
        // style={{ cursor: "pointer" }}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            P102: true,
          }));
          sendCommand(deviceId, "P-102-CMD", "WRITE", true);
        }}
      />

      {/* V-201 Flush */}
      <text x="15" y="125" fill="#fff" fontSize={fontSize}>
        V-201 Flush
      </text>
      {/* <circle
        cx={250}
        cy={122}
        r={10}
        fill={alarmActive ? "#ff3b3b" : localState.V201 ? "#28a745" : "#6b7280"}
        style={{
          filter: alarmActive
            ? "drop-shadow(0 0 6px red)"
            : "drop-shadow(0 0 3px rgba(40,167,69,0.8))",
          animation: localState.V201 ? "pulse 1s infinite ease-in-out" : "none",
        }}
      /> */}
      {localState.V201 && (
        <circle
          cx={250}
          cy={122}
          r={10}
          fill="none"
          stroke="#28a745"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            values="10;18;10"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <StopButton
        x={270}
        y={115}
        width={30}
        height={15}
        label="STOP"
        fontSize={10}
        disabled={!localState.V201}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            V201: false,
          }));
          sendCommand(deviceId, "V-201-CMD", "WRITE", false);
        }}
      />
      <StartButton
        x={310}
        y={115}
        width={30}
        height={15}
        label="START"
        fontSize={10}
        backgroundColor="#16a34a"
        pressedColor="#15803d"
        borderColor="#22c55e"
        disabled={localState.V201}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            V201: true,
          }));
          sendCommand(deviceId, "V-201-CMD", "WRITE", true);
        }}
      />
      {/* D-301 Flush */}
      <text x="15" y="160" fill="#fff" fontSize={fontSize}>
        D-301 pH Dosing
      </text>
      {localState.D301 && (
        <circle
          cx={250}
          cy={156}
          r={10}
          fill="none"
          stroke="#28a745"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            values="10;18;10"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <StopButton
        x={270}
        y={150}
        width={30}
        height={15}
        label="STOP"
        fontSize={10}
        disabled={!localState.D301}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            D301: false,
          }));
          sendCommand(deviceId, "D-301-CMD", "WRITE", false);
        }}
      />
      <StartButton
        x={310}
        y={150}
        width={30}
        height={15}
        label="START"
        fontSize={10}
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

      {/* UV-101 Flush */}
      <text x="15" y="195" fill="#fff" fontSize={fontSize}>
        UV-101 UV Sterilizer
      </text>
      {localState.UV101 && (
        <circle
          cx={250}
          cy={192}
          r={10}
          fill="none"
          stroke="#28a745"
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            values="10;18;10"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      <StopButton
        x={270}
        y={185}
        width={30}
        height={15}
        label="STOP"
        fontSize={10}
        disabled={!localState.UV101}
        onClick={() => {
          setLocalState((prev) => ({
            ...prev,
            UV101: false,
          }));
          sendCommand(deviceId, "UV-101-CMD", "WRITE", false);
        }}
      />
      <StartButton
        x={310}
        y={185}
        width={30}
        height={15}
        label="START"
        fontSize={10}
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

      {/* STATUS LED */}

      {/* EMERGENCY STOP */}
      <g transform={`translate(30,${panelHeight - 45})`}>
        <rect
          width={panelWidth - 60}
          height="28"
          rx="5"
          fill="#dc3545"
          stroke="#ff8080"
          strokeWidth="2"
          style={{
            cursor: "pointer",
            pointerEvents: "all",
            touchAction: "manipulation",
          }}
          onPointerDown={() => sendCommand(deviceId, "ALL", "STOP_ALL", true)}
        />

        {/* <text
          x={(panelWidth - 60) / 2}
          y="18"
          fill="#fff"
          textAnchor="middle"
          fontWeight="bold"
          fontSize={fontSize}
          pointerEvents="none"
        >
          EMERGENCY STOP
        </text> */}
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
      </g>
    </g>
  );
};

export default OperatorPanel;
