import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Gauge,
  GitBranch,
  Moon,
  Play,
  Power,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Sun,
  Thermometer,
  Wifi,
  WifiOff,
} from "lucide-react";

import BarataRawProcess from "../sections/barata/BarataRawProcess";
import BarataProcess from "../sections/barata/BarataProcess";
import BarataProductProcess from "../sections/barata/BarataProductProcess";

import TdsMeter from "../../../components/MimicRO/TdsMeter";
import QC from "../../../components/MimicRO/QC";

import "./BarataMonitoring.css";

/* =========================================================
   TYPES
   ========================================================= */

type SystemStatus = "RUNNING" | "STOPPED" | "WARNING" | "ALARM";

type ThemeMode = "dark" | "light";

interface Parameter {
  tag: string;
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  icon: React.ReactNode;
}

interface Equipment {
  tag: string;
  name: string;
  status: string;
  type: "PUMP" | "VALVE" | "UV";
}

/* =========================================================
   HELPERS
   ========================================================= */

const getParameterStatus = (
  value: number,
  min?: number,
  max?: number,
): "normal" | "critical" => {
  if (min !== undefined && value < min) {
    return "critical";
  }

  if (max !== undefined && value > max) {
    return "critical";
  }

  return "normal";
};

/* =========================================================
   COMPONENT
   ========================================================= */

const BarataMonitoring: React.FC = () => {
  /* =======================================================
     THEME
     ======================================================= */

  const [theme, setTheme] = useState<ThemeMode>("dark");

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  /* =======================================================
     CONNECTION
     
     DEMO.
     NANTI DIGANTI WEBSOCKET / REDUX.
     ======================================================= */

  const connected = true;

  /* =======================================================
     PLANT STATUS
     ======================================================= */

  const [systemStatus, setSystemStatus] = useState<SystemStatus>("RUNNING");

  /* =======================================================
     AUTO / MANUAL
     ======================================================= */

  const [autoMode, setAutoMode] = useState(true);

  /* =======================================================
     LAST UPDATE
     ======================================================= */

  const [lastUpdate, setLastUpdate] = useState(
    new Date().toLocaleTimeString("id-ID"),
  );

  /* =======================================================
     DEMO PROCESS VALUES
     ======================================================= */

  const process = {
    flow: 12.5,
    pressure: 4.2,
    tds: 85,
    qc: 94,
    ph: 7.2,
    temperature: 28.4,
  };

  /* =======================================================
     PARAMETERS
     ======================================================= */

  const parameters: Parameter[] = useMemo(
    () => [
      {
        tag: "FT-101",
        label: "FLOW",
        value: process.flow,
        unit: "m³/h",
        icon: <Activity size={20} />,
        min: 5,
        max: 20,
      },
      {
        tag: "PT-101",
        label: "PRESSURE",
        value: process.pressure,
        unit: "bar",
        icon: <Gauge size={20} />,
        min: 1,
        max: 8,
      },
      {
        tag: "TDS-101",
        label: "TDS",
        value: process.tds,
        unit: "ppm",
        icon: <Droplets size={20} />,
        max: 300,
      },
      {
        tag: "PH-101",
        label: "pH",
        value: process.ph,
        unit: "",
        icon: <Activity size={20} />,
        min: 6.5,
        max: 8.5,
      },
      {
        tag: "TT-101",
        label: "TEMPERATURE",
        value: process.temperature,
        unit: "°C",
        icon: <Thermometer size={20} />,
        min: 10,
        max: 40,
      },
    ],
    [
      process.flow,
      process.pressure,
      process.tds,
      process.ph,
      process.temperature,
    ],
  );

  /* =======================================================
     EQUIPMENT
     ======================================================= */

  const equipment: Equipment[] = [
    {
      tag: "P-101",
      name: "Raw Water Pump",
      status: "RUNNING",
      type: "PUMP",
    },
    {
      tag: "P-102",
      name: "Process Pump",
      status: "RUNNING",
      type: "PUMP",
    },
    {
      tag: "V-201",
      name: "Process Valve",
      status: "OPEN",
      type: "VALVE",
    },
    {
      tag: "UV-101",
      name: "UV Sterilizer",
      status: "RUNNING",
      type: "UV",
    },
  ];

  /* =======================================================
     REFRESH
     ======================================================= */

  const handleRefresh = () => {
    setLastUpdate(new Date().toLocaleTimeString("id-ID"));
  };

  /* =======================================================
     SYSTEM TOGGLE
     ======================================================= */

  const handleSystemToggle = () => {
    setSystemStatus((currentStatus) =>
      currentStatus === "RUNNING" ? "STOPPED" : "RUNNING",
    );
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className={`barata-monitoring theme-${theme}`}>
      {/* ===================================================
          HEADER
         =================================================== */}

      <header className="barata-monitoring-header">
        <div className="barata-title">
          <span className="barata-eyebrow">ABN WATER · SCADA</span>

          <h1>BARATA JAYA</h1>

          <p>Water Treatment Plant Monitoring System</p>
        </div>

        <div className="barata-header-actions">
          {/* THEME */}

          <button
            type="button"
            className="barata-theme-button"
            onClick={toggleTheme}
            title={
              theme === "dark"
                ? "Switch to Light Theme"
                : "Switch to Dark Theme"
            }
          >
            {theme === "dark" ? (
              <>
                <Sun size={17} />
                Light
              </>
            ) : (
              <>
                <Moon size={17} />
                Dark
              </>
            )}
          </button>

          {/* CONNECTION */}

          <div
            className={`barata-connection ${connected ? "online" : "offline"}`}
          >
            {connected ? <Wifi size={17} /> : <WifiOff size={17} />}

            <div>
              <strong>{connected ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}</strong>

              <small>WebSocket / SCADA</small>
            </div>
          </div>

          {/* REFRESH */}

          <button
            type="button"
            className="barata-refresh"
            onClick={handleRefresh}
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>
      </header>

      {/* ===================================================
          OVERVIEW
         =================================================== */}

      <section className="barata-overview">
        <div className="barata-overview-status">
          <div className={`barata-status-icon ${systemStatus.toLowerCase()}`}>
            {systemStatus === "RUNNING" ? (
              <CheckCircle2 size={28} />
            ) : systemStatus === "STOPPED" ? (
              <Power size={28} />
            ) : (
              <AlertTriangle size={28} />
            )}
          </div>

          <div>
            <span>PLANT STATUS</span>

            <strong>{systemStatus}</strong>
          </div>
        </div>

        <div className="barata-overview-item">
          <span>MODE</span>

          <strong>{autoMode ? "AUTO" : "MANUAL"}</strong>
        </div>

        <button
          type="button"
          className={`barata-mode-button ${autoMode ? "active" : ""}`}
          onClick={() => setAutoMode((value) => !value)}
        >
          <Settings2 size={16} />

          {autoMode ? "AUTO MODE" : "MANUAL MODE"}
        </button>

        <button
          type="button"
          className={`barata-control-button ${
            systemStatus === "RUNNING" ? "stop" : "start"
          }`}
          onClick={handleSystemToggle}
        >
          {systemStatus === "RUNNING" ? (
            <>
              <Power size={16} />
              STOP PLANT
            </>
          ) : (
            <>
              <Play size={16} />
              START PLANT
            </>
          )}
        </button>
      </section>

      {/* ===================================================
          KPI
         =================================================== */}

      <section className="barata-kpi-grid">
        {parameters.map((parameter) => {
          const status = getParameterStatus(
            parameter.value,
            parameter.min,
            parameter.max,
          );

          return (
            <article
              className={`barata-kpi-card ${status}`}
              key={parameter.tag}
            >
              <div className="barata-kpi-icon">{parameter.icon}</div>

              <div className="barata-kpi-content">
                <span>{parameter.label}</span>

                <strong>
                  {parameter.value.toFixed(1)}

                  <small>{parameter.unit}</small>
                </strong>

                <em>{parameter.tag}</em>
              </div>
            </article>
          );
        })}

        {/* QUALITY */}

        <article className="barata-kpi-card quality">
          <div className="barata-kpi-icon">
            <ShieldCheck size={20} />
          </div>

          <div className="barata-kpi-content">
            <span>QUALITY</span>

            <strong>
              {process.qc}

              <small>%</small>
            </strong>

            <em>QC-101</em>
          </div>
        </article>
      </section>

      {/* ===================================================
          MAIN CONTENT
         =================================================== */}

      <section className="barata-main-grid">
        {/* PROCESS MIMIC */}

        <article className="barata-panel barata-mimic-panel">
          <div className="barata-panel-header">
            <div>
              <h2>Process Mimic</h2>

              <p>Real-time water treatment process</p>
            </div>

            <div className="barata-live">
              <span />
              LIVE
            </div>
          </div>

          <div className="barata-mimic-container">
            <svg
              viewBox="0 0 1000 1500"
              width="100%"
              height="auto"
              preserveAspectRatio="xMidYMin meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="500"
                y="45"
                textAnchor="middle"
                fill="var(--accent)"
                fontSize="28"
                fontWeight="bold"
              >
                BARATA JAYA
              </text>

              <BarataRawProcess />

              <BarataProcess />

              <BarataProductProcess />
            </svg>
          </div>
        </article>

        {/* RIGHT */}

        <aside className="barata-right-column">
          {/* TDS */}

          <article className="barata-panel instrument-panel">
            <div className="barata-panel-header">
              <div>
                <h2>TDS Monitor</h2>

                <p>Product water quality</p>
              </div>
            </div>

            <div className="instrument-display">
              <TdsMeter
                x={0}
                y={0}
                width={220}
                height={90}
                value={process.tds}
                tag="TDS-101"
                unit="ppm"
              />
            </div>
          </article>

          {/* QC */}

          <article className="barata-panel instrument-panel">
            <div className="barata-panel-header">
              <div>
                <h2>Quality Control</h2>

                <p>Water quality index</p>
              </div>
            </div>

            <div className="instrument-display">
              <QC
                x={0}
                y={0}
                width={220}
                height={90}
                value={process.qc}
                tag="QC-101"
                unit="%"
              />
            </div>
          </article>
        </aside>
      </section>

      {/* ===================================================
          EQUIPMENT
         =================================================== */}

      <section className="barata-panel equipment-panel">
        <div className="barata-panel-header">
          <div>
            <h2>Equipment Status</h2>

            <p>Status equipment proses Barata Jaya</p>
          </div>

          <span className="updated-time">Updated {lastUpdate}</span>
        </div>

        <div className="equipment-grid">
          {equipment.map((item) => (
            <div className="equipment-card" key={item.tag}>
              <div className="equipment-icon">
                {item.type === "PUMP" ? (
                  <Droplets size={21} />
                ) : item.type === "VALVE" ? (
                  <GitBranch size={21} />
                ) : (
                  <Activity size={21} />
                )}
              </div>

              <div className="equipment-info">
                <strong>{item.name}</strong>

                <span>{item.tag}</span>
              </div>

              <div className="equipment-status">
                <span className="equipment-dot" />

                {item.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================
          ALARM
         =================================================== */}

      <section className="barata-alarm-bar">
        <div className="alarm-icon">
          <AlertTriangle size={18} />
        </div>

        <div>
          <strong>ALARM STATUS</strong>

          <span>No active alarm — Process operating normally</span>
        </div>

        <div className="alarm-normal">NORMAL</div>
      </section>

      {/* ===================================================
          FOOTER
         =================================================== */}

      <footer className="barata-monitoring-footer">
        <span>ABN WATER · BARATA JAYA</span>

        <span>SCADA Monitoring System</span>
      </footer>
    </main>
  );
};

export default BarataMonitoring;
