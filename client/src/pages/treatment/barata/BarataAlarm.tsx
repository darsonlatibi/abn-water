/* =========================================================
   ABN WATER
   BARATA ALARM MANAGEMENT
   ========================================================= */

import React, { useMemo, useState } from "react";

import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  Filter,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import "./BarataAlarm.css";

/* =========================================================
   TYPES
   ========================================================= */

type AlarmSeverity = "critical" | "warning" | "info";

type AlarmState = "active" | "acknowledged" | "cleared";

interface AlarmRecord {
  id: number;
  tag: string;
  parameter: string;
  message: string;
  value: string;
  limit: string;
  severity: AlarmSeverity;
  state: AlarmState;
  timestamp: string;
  device: string;
}

/* =========================================================
   DEMO DATA
   Nanti diganti API / WebSocket
   ========================================================= */

const INITIAL_ALARMS: AlarmRecord[] = [
  {
    id: 1,
    tag: "AIT-101",
    parameter: "pH",
    message: "pH below acceptable range",
    value: "6.2",
    limit: "6.5 - 8.5",
    severity: "critical",
    state: "active",
    timestamp: "2026-08-26 08:42:15",
    device: "ABN-WATER-01",
  },

  {
    id: 2,
    tag: "AIT-102",
    parameter: "Turbidity",
    message: "Turbidity above limit",
    value: "4.8 NTU",
    limit: "< 3 NTU",
    severity: "warning",
    state: "active",
    timestamp: "2026-08-26 08:39:21",
    device: "ABN-WATER-01",
  },

  {
    id: 3,
    tag: "AIT-103",
    parameter: "Free Chlorine",
    message: "Free chlorine below minimum",
    value: "0.12 mg/L",
    limit: "0.2 - 0.5 mg/L",
    severity: "critical",
    state: "acknowledged",
    timestamp: "2026-08-26 08:31:08",
    device: "ABN-WATER-01",
  },

  {
    id: 4,
    tag: "PT-101",
    parameter: "Pressure",
    message: "Pipeline pressure high",
    value: "4.6 bar",
    limit: "< 4.0 bar",
    severity: "warning",
    state: "cleared",
    timestamp: "2026-08-26 08:12:44",
    device: "ABN-WATER-01",
  },

  {
    id: 5,
    tag: "SYS-001",
    parameter: "Communication",
    message: "Sensor communication restored",
    value: "-",
    limit: "-",
    severity: "info",
    state: "cleared",
    timestamp: "2026-08-26 07:58:11",
    device: "ABN-WATER-01",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

const severityLabel = (severity: AlarmSeverity) => {
  switch (severity) {
    case "critical":
      return "CRITICAL";

    case "warning":
      return "WARNING";

    case "info":
      return "INFO";
  }
};

const stateLabel = (state: AlarmState) => {
  switch (state) {
    case "active":
      return "ACTIVE";

    case "acknowledged":
      return "ACKNOWLEDGED";

    case "cleared":
      return "CLEARED";
  }
};

/* =========================================================
   COMPONENT
   ========================================================= */

const BarataAlarm: React.FC = () => {
  const [alarms, setAlarms] = useState<AlarmRecord[]>(INITIAL_ALARMS);

  const [severityFilter, setSeverityFilter] = useState<"all" | AlarmSeverity>(
    "all",
  );

  const [stateFilter, setStateFilter] = useState<"all" | AlarmState>("all");

  /* =======================================================
     STATISTICS
     ======================================================= */

  const statistics = useMemo(() => {
    const active = alarms.filter((alarm) => alarm.state === "active").length;

    const critical = alarms.filter(
      (alarm) => alarm.severity === "critical" && alarm.state !== "cleared",
    ).length;

    const warning = alarms.filter(
      (alarm) => alarm.severity === "warning" && alarm.state !== "cleared",
    ).length;

    const acknowledged = alarms.filter(
      (alarm) => alarm.state === "acknowledged",
    ).length;

    return {
      total: alarms.length,
      active,
      critical,
      warning,
      acknowledged,
    };
  }, [alarms]);

  /* =======================================================
     FILTER
     ======================================================= */

  const filteredAlarms = useMemo(() => {
    return alarms.filter((alarm) => {
      const severityMatch =
        severityFilter === "all" || alarm.severity === severityFilter;

      const stateMatch = stateFilter === "all" || alarm.state === stateFilter;

      return severityMatch && stateMatch;
    });
  }, [alarms, severityFilter, stateFilter]);

  /* =======================================================
     ACKNOWLEDGE
     ======================================================= */

  const acknowledgeAlarm = (id: number) => {
    setAlarms((current) =>
      current.map((alarm) =>
        alarm.id === id && alarm.state === "active"
          ? {
              ...alarm,
              state: "acknowledged",
            }
          : alarm,
      ),
    );
  };

  /* =======================================================
     CLEAR
     ======================================================= */

  const clearAlarm = (id: number) => {
    setAlarms((current) =>
      current.map((alarm) =>
        alarm.id === id
          ? {
              ...alarm,
              state: "cleared",
            }
          : alarm,
      ),
    );
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="barata-alarm-page">
      {/* =================================================
          HEADER
         ================================================= */}

      <header className="barata-alarm-header">
        <div>
          <span className="barata-alarm-eyebrow">ABN WATER</span>

          <h1>Alarm Management</h1>

          <p>
            Monitoring alarm, warning dan event pada water treatment system.
          </p>
        </div>

        <div className="barata-alarm-header-status">
          <span className="alarm-live-dot" />
          SYSTEM MONITORING
        </div>
      </header>

      {/* =================================================
          KPI
         ================================================= */}

      <section className="barata-alarm-kpi-grid">
        <article className="alarm-kpi-card total">
          <div className="alarm-kpi-icon">
            <Bell size={22} />
          </div>

          <div>
            <span>Total Alarms</span>

            <strong>{statistics.total}</strong>
          </div>
        </article>

        <article className="alarm-kpi-card critical">
          <div className="alarm-kpi-icon">
            <ShieldAlert size={22} />
          </div>

          <div>
            <span>Critical</span>

            <strong>{statistics.critical}</strong>
          </div>
        </article>

        <article className="alarm-kpi-card warning">
          <div className="alarm-kpi-icon">
            <AlertTriangle size={22} />
          </div>

          <div>
            <span>Warning</span>

            <strong>{statistics.warning}</strong>
          </div>
        </article>

        <article className="alarm-kpi-card active">
          <div className="alarm-kpi-icon">
            <Clock3 size={22} />
          </div>

          <div>
            <span>Active</span>

            <strong>{statistics.active}</strong>
          </div>
        </article>
      </section>

      {/* =================================================
          FILTER
         ================================================= */}

      <section className="barata-alarm-toolbar">
        <div className="alarm-toolbar-title">
          <Filter size={18} />

          <strong>Alarm History</strong>
        </div>

        <div className="alarm-filters">
          <select
            value={severityFilter}
            onChange={(event) =>
              setSeverityFilter(event.target.value as "all" | AlarmSeverity)
            }
          >
            <option value="all">All Severity</option>

            <option value="critical">Critical</option>

            <option value="warning">Warning</option>

            <option value="info">Info</option>
          </select>

          <select
            value={stateFilter}
            onChange={(event) =>
              setStateFilter(event.target.value as "all" | AlarmState)
            }
          >
            <option value="all">All State</option>

            <option value="active">Active</option>

            <option value="acknowledged">Acknowledged</option>

            <option value="cleared">Cleared</option>
          </select>
        </div>
      </section>

      {/* =================================================
          ALARM TABLE
         ================================================= */}

      <section className="barata-alarm-panel">
        <div className="barata-alarm-table-wrapper">
          <table className="barata-alarm-table">
            <thead>
              <tr>
                <th>TIME</th>
                <th>TAG</th>
                <th>PARAMETER</th>
                <th>MESSAGE</th>
                <th>VALUE</th>
                <th>SEVERITY</th>
                <th>STATE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredAlarms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="alarm-empty">
                    <CheckCircle2 size={24} />

                    <span>No alarm found</span>
                  </td>
                </tr>
              ) : (
                filteredAlarms.map((alarm) => (
                  <tr key={alarm.id} className={`alarm-row ${alarm.severity}`}>
                    <td>
                      <span className="alarm-time">{alarm.timestamp}</span>
                    </td>

                    <td>
                      <strong className="alarm-tag">{alarm.tag}</strong>
                    </td>

                    <td>{alarm.parameter}</td>

                    <td>
                      <div className="alarm-message">
                        <strong>{alarm.message}</strong>

                        <small>Device: {alarm.device}</small>
                      </div>
                    </td>

                    <td>
                      <strong>{alarm.value}</strong>

                      <small className="alarm-limit">
                        Limit: {alarm.limit}
                      </small>
                    </td>

                    <td>
                      <span className={`alarm-severity ${alarm.severity}`}>
                        {alarm.severity === "critical" && <XCircle size={14} />}

                        {alarm.severity === "warning" && (
                          <AlertTriangle size={14} />
                        )}

                        {alarm.severity === "info" && <Bell size={14} />}

                        {severityLabel(alarm.severity)}
                      </span>
                    </td>

                    <td>
                      <span className={`alarm-state ${alarm.state}`}>
                        {stateLabel(alarm.state)}
                      </span>
                    </td>

                    <td>
                      <div className="alarm-actions">
                        {alarm.state === "active" && (
                          <button
                            type="button"
                            onClick={() => acknowledgeAlarm(alarm.id)}
                          >
                            ACK
                          </button>
                        )}

                        {alarm.state !== "cleared" && (
                          <button
                            type="button"
                            className="clear"
                            onClick={() => clearAlarm(alarm.id)}
                          >
                            CLEAR
                          </button>
                        )}

                        {alarm.state === "cleared" && (
                          <CheckCircle2 size={18} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================
          FOOTER
         ================================================= */}

      <footer className="barata-alarm-footer">
        <AlertTriangle size={16} />

        <span>
          Alarm merupakan indikator kondisi proses dan memerlukan pemeriksaan
          operator sebelum tindakan korektif dilakukan.
        </span>
      </footer>
    </main>
  );
};

export default BarataAlarm;
