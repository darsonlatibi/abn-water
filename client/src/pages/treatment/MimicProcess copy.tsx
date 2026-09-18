/* =========================================================
   ABN WATER
   WATER TREATMENT
   MIMIC PROCESS / SCADA V2
   ========================================================= */

import React from "react";
import {
  Activity,
  AlertTriangle,
  Droplets,
  Gauge,
  Power,
  Radio,
  RefreshCw,
  Settings,
  Waves,
  Wifi,
  WifiOff,
} from "lucide-react";

import "./MimicProcess.css";

/* =========================================================
   TYPES
   ========================================================= */

type EquipmentStatus = "RUNNING" | "STOPPED" | "FAULT" | "OFFLINE";

interface EquipmentProps {
  id: string;
  name: string;
  type: "pump" | "tank" | "filter" | "ro" | "valve";
  status: EquipmentStatus;
  value?: string;
  level?: number;
  open?: boolean;
}

interface InstrumentProps {
  tag: string;
  value: string;
  unit: string;
  alarm?: boolean;
}

/* =========================================================
   EQUIPMENT
   ========================================================= */

const Equipment: React.FC<EquipmentProps> = ({
  id,
  name,
  type,
  status,
  value,
  level = 70,
  open = true,
}) => {
  return (
    <div className={`scada-equipment ${status.toLowerCase()}`}>
      <div className="equipment-top">
        <span className="equipment-tag">{id}</span>

        <span className="equipment-led">
          <span />
          {status}
        </span>
      </div>

      <div className="equipment-body">
        {type === "tank" && (
          <div className="tank">
            <div className="tank-head" />

            <div className="tank-shell">
              <div
                className="tank-water"
                style={{ height: `${Math.max(0, Math.min(level, 100))}%` }}
              />

              <div className="tank-scale">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
            </div>

            <div className="tank-pipe" />
          </div>
        )}

        {type === "pump" && (
          <div className="pump">
            <div className="pump-motor">
              <span />
              <span />
              <span />
            </div>

            <div className="pump-body">
              <div className="pump-impeller">✦</div>
            </div>

            <div className="pump-base" />
          </div>
        )}

        {type === "filter" && (
          <div className="filter">
            <div className="filter-top" />

            <div className="filter-body">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="filter-bottom" />
          </div>
        )}

        {type === "ro" && (
          <div className="ro-unit">
            <div className="ro-frame">
              <div className="ro-membrane">
                <span />
                <span />
                <span />
              </div>

              <div className="ro-label">RO</div>
            </div>

            <div className="ro-base" />
          </div>
        )}

        {type === "valve" && (
          <div className={`valve ${open ? "open" : "closed"}`}>
            <div className="valve-pipe" />
            <div className="valve-wheel">V</div>
            <div className="valve-stem" />

            <strong>{open ? "OPEN" : "CLOSED"}</strong>
          </div>
        )}
      </div>

      <div className="equipment-name">{name}</div>

      {value && <div className="equipment-value">{value}</div>}
    </div>
  );
};

/* =========================================================
   PIPE
   ========================================================= */

interface PipeProps {
  active?: boolean;
  direction?: "horizontal" | "vertical";
}

const Pipe: React.FC<PipeProps> = ({
  active = true,
  direction = "horizontal",
}) => {
  return (
    <div
      className={`scada-pipe ${direction} ${active ? "active" : "inactive"}`}
    >
      {active && (
        <>
          <span className="flow-arrow arrow-1">›</span>
          <span className="flow-arrow arrow-2">›</span>
          <span className="flow-arrow arrow-3">›</span>
        </>
      )}
    </div>
  );
};

/* =========================================================
   INSTRUMENT
   ========================================================= */

const Instrument: React.FC<InstrumentProps> = ({
  tag,
  value,
  unit,
  alarm = false,
}) => {
  return (
    <div className={`scada-instrument ${alarm ? "alarm" : ""}`}>
      <div className="instrument-head">
        <span>{tag}</span>

        <span className="instrument-led" />
      </div>

      <div className="instrument-reading">
        {value}

        <small>{unit}</small>
      </div>
    </div>
  );
};

/* =========================================================
   MIMIC PROCESS
   ========================================================= */

const MimicProcess: React.FC = () => {
  const connected = true;
  const plantRunning = true;

  const flow = 125.4;
  const alarms = 0;

  return (
    <main className="mimic-page">
      {/* ===================================================
          HEADER
         =================================================== */}

      <header className="mimic-header">
        <div>
          <span className="mimic-eyebrow">ABN WATER / SCADA</span>

          <h1>Mimic Process</h1>

          <p>Water Treatment Plant — Process Visualization</p>
        </div>

        <div className="mimic-actions">
          <div
            className={`connection-status ${connected ? "online" : "offline"}`}
          >
            {connected ? <Wifi size={16} /> : <WifiOff size={16} />}

            <div>
              <strong>{connected ? "CONNECTED" : "OFFLINE"}</strong>

              <small>ABN SCADA SERVER</small>
            </div>
          </div>

          <button type="button" className="mimic-button">
            <RefreshCw size={16} />
            Refresh
          </button>

          <button type="button" className="mimic-button primary">
            <Settings size={16} />
            Control
          </button>
        </div>
      </header>

      {/* ===================================================
          STATUS BAR
         =================================================== */}

      <section className="plant-status-bar">
        <div className="plant-status-main">
          <span
            className={`plant-led ${plantRunning ? "running" : "stopped"}`}
          />

          <div>
            <span>PLANT STATUS</span>

            <strong>{plantRunning ? "RUNNING" : "STOPPED"}</strong>
          </div>
        </div>

        <div className="plant-stat">
          <Gauge size={18} />

          <div>
            <span>PROCESS FLOW</span>
            <strong>{flow} m³/h</strong>
          </div>
        </div>

        <div className="plant-stat">
          <Droplets size={18} />

          <div>
            <span>WATER QUALITY</span>
            <strong className="normal">NORMAL</strong>
          </div>
        </div>

        <div className="plant-stat">
          <Activity size={18} />

          <div>
            <span>EQUIPMENT</span>
            <strong>8 / 10 RUNNING</strong>
          </div>
        </div>

        <div className="plant-stat">
          <AlertTriangle size={18} />

          <div>
            <span>ALARMS</span>
            <strong className={alarms > 0 ? "alarm-text" : ""}>{alarms}</strong>
          </div>
        </div>
      </section>

      {/* ===================================================
          PROCESS PANEL
         =================================================== */}

      <section className="mimic-panel">
        <div className="mimic-panel-header">
          <div>
            <span className="panel-eyebrow">PROCESS AREA</span>

            <h2>Water Treatment Process</h2>

            <p>Live process flow / equipment monitoring</p>
          </div>

          <div className="mimic-legend">
            <span>
              <i className="legend running" />
              Running
            </span>

            <span>
              <i className="legend stopped" />
              Stopped
            </span>

            <span>
              <i className="legend fault" />
              Fault
            </span>

            <span>
              <i className="legend flow" />
              Water Flow
            </span>
          </div>
        </div>

        {/* =================================================
            SCADA CANVAS
           ================================================= */}

        <div className="scada-canvas">
          {/* PROCESS HEADER */}

          <div className="process-zone zone-raw">RAW WATER</div>

          <div className="process-zone zone-treatment">PRE-TREATMENT</div>

          <div className="process-zone zone-ro">MEMBRANE SYSTEM</div>

          <div className="process-zone zone-product">PRODUCT / FINAL WATER</div>

          {/* =================================================
              MAIN PIPE
             ================================================= */}

          <div className="pipe-wrapper pipe-main-1">
            <Pipe />
          </div>

          <div className="pipe-wrapper pipe-main-2">
            <Pipe />
          </div>

          <div className="pipe-wrapper pipe-main-3">
            <Pipe />
          </div>

          <div className="pipe-wrapper pipe-main-4">
            <Pipe />
          </div>

          <div className="pipe-wrapper pipe-main-5">
            <Pipe />
          </div>

          <div className="pipe-wrapper pipe-main-6">
            <Pipe />
          </div>

          <div className="pipe-wrapper pipe-main-7">
            <Pipe />
          </div>

          {/* =================================================
              RAW WATER TANK
             ================================================= */}

          <div className="equipment-node node-tk101">
            <Equipment
              id="TK-101"
              name="Raw Water Tank"
              type="tank"
              status="RUNNING"
              level={78}
              value="78 %"
            />
          </div>

          {/* =================================================
              PUMP P101
             ================================================= */}

          <div className="equipment-node node-p101">
            <Equipment
              id="P-101"
              name="Raw Water Pump"
              type="pump"
              status="RUNNING"
              value="45 Hz"
            />
          </div>

          {/* =================================================
              VALVE V101
             ================================================= */}

          <div className="equipment-node node-v101">
            <Equipment
              id="V-101"
              name="Inlet Valve"
              type="valve"
              status="RUNNING"
              open
            />
          </div>

          {/* =================================================
              MULTIMEDIA FILTER
             ================================================= */}

          <div className="equipment-node node-f101">
            <Equipment
              id="F-101"
              name="Multimedia Filter"
              type="filter"
              status="RUNNING"
              value="2.40 bar"
            />
          </div>

          {/* =================================================
              DOSING
             ================================================= */}

          <div className="equipment-node node-p201">
            <Equipment
              id="P-201"
              name="Chemical Dosing"
              type="pump"
              status="RUNNING"
              value="35 %"
            />
          </div>

          {/* =================================================
              CARBON FILTER
             ================================================= */}

          <div className="equipment-node node-f201">
            <Equipment
              id="F-201"
              name="Carbon Filter"
              type="filter"
              status="RUNNING"
              value="1.80 bar"
            />
          </div>

          {/* =================================================
              RO VALVE
             ================================================= */}

          <div className="equipment-node node-v201">
            <Equipment
              id="V-201"
              name="RO Feed Valve"
              type="valve"
              status="RUNNING"
              open
            />
          </div>

          {/* =================================================
              RO
             ================================================= */}

          <div className="equipment-node node-ro101">
            <Equipment
              id="RO-101"
              name="RO Membrane"
              type="ro"
              status="RUNNING"
              value="85 % Recovery"
            />
          </div>

          {/* =================================================
              PRODUCT TANK
             ================================================= */}

          <div className="equipment-node node-tk201">
            <Equipment
              id="TK-201"
              name="Product Water Tank"
              type="tank"
              status="RUNNING"
              level={64}
              value="64 %"
            />
          </div>

          {/* =================================================
              BOOSTER
             ================================================= */}

          <div className="equipment-node node-p202">
            <Equipment
              id="P-202"
              name="Booster Pump"
              type="pump"
              status="RUNNING"
              value="42 Hz"
            />
          </div>

          {/* =================================================
              FINAL TANK
             ================================================= */}

          <div className="equipment-node node-tk301">
            <Equipment
              id="TK-301"
              name="Final Water Tank"
              type="tank"
              status="RUNNING"
              level={91}
              value="91 %"
            />
          </div>

          {/* =================================================
              INSTRUMENTS
             ================================================= */}

          <div className="instrument-node inst-ft101">
            <Instrument tag="FT-101" value="125.4" unit="m³/h" />
          </div>

          <div className="instrument-node inst-pt101">
            <Instrument tag="PT-101" value="2.40" unit="bar" />
          </div>

          <div className="instrument-node inst-ait101">
            <Instrument tag="AIT-101" value="7.21" unit="pH" />
          </div>

          <div className="instrument-node inst-ait102">
            <Instrument tag="AIT-102" value="684" unit="mV" />
          </div>

          <div className="instrument-node inst-ait103">
            <Instrument tag="AIT-103" value="125" unit="µS/cm" />
          </div>

          {/* =================================================
              FLOW LABELS
             ================================================= */}

          <div className="flow-label flow-label-1">RAW WATER</div>

          <div className="flow-label flow-label-2">FILTERED WATER</div>

          <div className="flow-label flow-label-3">RO FEED</div>

          <div className="flow-label flow-label-4">PRODUCT WATER</div>

          <div className="flow-label flow-label-5">FINAL WATER</div>
        </div>
      </section>

      {/* ===================================================
          BOTTOM SYSTEM STATUS
         =================================================== */}

      <section className="mimic-bottom-grid">
        <article className="mimic-info-card">
          <div className="info-icon">
            <Radio size={20} />
          </div>

          <div>
            <span>PLC / CONTROLLER</span>
            <strong>ABN-PLC-001</strong>
          </div>

          <span className="info-state online">ONLINE</span>
        </article>

        <article className="mimic-info-card">
          <div className="info-icon">
            <Waves size={20} />
          </div>

          <div>
            <span>PROCESS FLOW</span>
            <strong>{flow} m³/h</strong>
          </div>

          <span className="info-state online">NORMAL</span>
        </article>

        <article className="mimic-info-card">
          <div className="info-icon">
            <Power size={20} />
          </div>

          <div>
            <span>SYSTEM MODE</span>
            <strong>AUTO</strong>
          </div>

          <span className="info-state online">ACTIVE</span>
        </article>
      </section>
    </main>
  );
};

export default MimicProcess;
