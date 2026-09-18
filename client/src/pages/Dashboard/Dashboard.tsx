/* =========================================================
   ABN WATER
   WATER TREATMENT DASHBOARD
   ========================================================= */

import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Gauge,
  FlaskConical,
  RefreshCw,
  ShieldCheck,
  Thermometer,
  Waves,
  Radio,
  Wifi,
  WifiOff,
} from "lucide-react";

import type { AppDispatch, RootState } from "../../stores/store";

import {
  setWaterQuality,
  setWaterQualityStatus,
  setWaterQualityConnected,
  setWaterQualityLoading,
  setWaterQualityError,
  setWaterQualityDevice,
  setSelectedWaterQualitySite,
} from "../../features/report/waterQualitySlice";

import "./Dashboard.css";

/* =========================================================
   TYPES
   ========================================================= */

type QualityStatus = "normal" | "warning" | "critical" | "offline";

/* =========================================================
   API
   ========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const WATER_LATEST_URL = `${API_BASE_URL}/water/latest`;

/* =========================================================
   HELPERS
   ========================================================= */

const normalizeStatus = (status?: string | null): QualityStatus => {
  switch (status?.toUpperCase()) {
    case "NORMAL":
      return "normal";

    case "WARNING":
      return "warning";

    case "CRITICAL":
      return "critical";

    case "OFFLINE":
      return "offline";

    default:
      return "offline";
  }
};

const formatValue = (
  value: number | null | undefined,
  decimals = 2,
): string => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "-";
  }

  return Number(value).toFixed(decimals);
};

const getParameterStatus = (
  value: number | null,
  min?: number,
  max?: number,
  online = true,
): QualityStatus => {
  if (!online || value === null || value === undefined) {
    return "offline";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "offline";
  }

  if (min !== undefined && numericValue < min) {
    return "critical";
  }

  if (max !== undefined && numericValue > max) {
    return "critical";
  }

  return "normal";
};

const formatUpdatedTime = (timestamp: string | null | undefined): string => {
  if (!timestamp) {
    return "-";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/* =========================================================
   PARAMETER CONFIG
   ========================================================= */

interface ParameterConfig {
  key:
    | "ph"
    | "turbidity"
    | "freeChlorine"
    | "tds"
    | "conductivity"
    | "orp"
    | "temperature"
    | "pressure";

  label: string;

  unit: string;

  icon: React.ReactNode;

  min?: number;

  max?: number;

  description: string;

  decimals?: number;
}

/* =========================================================
   PARAMETER CARD
   ========================================================= */

interface ParameterCardProps {
  config: ParameterConfig;

  value: number | null;

  online: boolean;
}

const ParameterCard: React.FC<ParameterCardProps> = ({
  config,
  value,
  online,
}) => {
  const status = getParameterStatus(value, config.min, config.max, online);

  const statusLabel =
    status === "normal"
      ? "NORMAL"
      : status === "critical"
        ? "CRITICAL"
        : status === "warning"
          ? "WARNING"
          : "OFFLINE";

  return (
    <article className={`water-parameter-card ${status}`}>
      <div className="parameter-top">
        <div className="parameter-icon">{config.icon}</div>

        <span
          className={`parameter-status-dot ${status}`}
          title={statusLabel}
        />
      </div>

      <div className="parameter-label">{config.label}</div>

      <div className="parameter-value">
        {formatValue(value, config.decimals ?? 2)}

        <span>{config.unit}</span>
      </div>

      <div className="parameter-description">{config.description}</div>

      {(config.min !== undefined || config.max !== undefined) && (
        <div className="parameter-range">
          <span>Min {config.min ?? "-"}</span>

          <span>Max {config.max ?? "-"}</span>
        </div>
      )}

      <div className="parameter-state">{statusLabel}</div>
    </article>
  );
};

/* =========================================================
   MAIN DASHBOARD
   ========================================================= */

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const waterState = useSelector((state: RootState) => state.waterQuality);

  const water = waterState.data;

  /* =======================================================
     FETCH
     ======================================================= */

  const fetchWaterQuality = useCallback(async () => {
    try {
      dispatch(setWaterQualityLoading(true));

      dispatch(setWaterQualityError(null));

      const params = new URLSearchParams();

      if (waterState.deviceId) {
        params.set("deviceId", waterState.deviceId);
      }

      const query = params.toString();

      const url = query ? `${WATER_LATEST_URL}?${query}` : WATER_LATEST_URL;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch water quality");
      }

      if (!result?.success || !result?.data) {
        throw new Error("No water quality data found");
      }

      const data = result.data;

      dispatch(
        setWaterQuality({
          siteId:
            data.siteId !== null && data.siteId !== undefined
              ? Number(data.siteId)
              : null,

          siteName: data.siteName ?? null,

          deviceId: data.deviceId ?? null,

          measuredAt: data.measuredAt ?? null,

          ph:
            data.ph !== null && data.ph !== undefined ? Number(data.ph) : null,

          turbidity:
            data.turbidity !== null && data.turbidity !== undefined
              ? Number(data.turbidity)
              : null,

          freeChlorine:
            data.freeChlorine !== null && data.freeChlorine !== undefined
              ? Number(data.freeChlorine)
              : null,

          tds:
            data.tds !== null && data.tds !== undefined
              ? Number(data.tds)
              : null,

          conductivity:
            data.conductivity !== null && data.conductivity !== undefined
              ? Number(data.conductivity)
              : null,

          orp:
            data.orp !== null && data.orp !== undefined
              ? Number(data.orp)
              : null,

          temperature:
            data.temperature !== null && data.temperature !== undefined
              ? Number(data.temperature)
              : null,

          pressure:
            data.pressure !== null && data.pressure !== undefined
              ? Number(data.pressure)
              : null,

          status: data.status ?? "NORMAL",

          updatedAt:
            data.updatedAt ?? data.measuredAt ?? new Date().toISOString(),
        }),
      );

      if (data.siteName) {
        dispatch(setSelectedWaterQualitySite(data.siteName));
      }

      if (data.deviceId) {
        dispatch(setWaterQualityDevice(data.deviceId));
      }

      dispatch(setWaterQualityStatus(data.status ?? "NORMAL"));

      dispatch(setWaterQualityConnected(true));
    } catch (error) {
      console.error("fetchWaterQuality:", error);

      dispatch(setWaterQualityConnected(false));

      dispatch(
        setWaterQualityError(
          error instanceof Error
            ? error.message
            : "Failed to load water quality",
        ),
      );
    } finally {
      dispatch(setWaterQualityLoading(false));
    }
  }, [dispatch, waterState.deviceId]);

  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {
    fetchWaterQuality();
  }, [fetchWaterQuality]);

  /* =======================================================
     OVERALL STATUS
     ======================================================= */

  const overallStatus = useMemo<QualityStatus>(() => {
    if (!waterState.connected) {
      return "offline";
    }

    return normalizeStatus(waterState.overallStatus);
  }, [waterState.connected, waterState.overallStatus]);

  const overallStatusLabel =
    overallStatus === "normal"
      ? "NORMAL"
      : overallStatus === "warning"
        ? "WARNING"
        : overallStatus === "critical"
          ? "CRITICAL"
          : "OFFLINE";

  /* =======================================================
     PARAMETERS
     ======================================================= */

  const parameters: ParameterConfig[] = [
    {
      key: "ph",
      label: "pH",
      unit: "",
      icon: <FlaskConical size={22} />,
      min: 6.5,
      max: 8.5,
      description: "Water acidity / alkalinity",
    },

    {
      key: "turbidity",
      label: "Turbidity",
      unit: " NTU",
      icon: <Waves size={22} />,
      max: 3,
      description: "Water clarity",
    },

    {
      key: "freeChlorine",
      label: "Free Chlorine",
      unit: " mg/L",
      icon: <ShieldCheck size={22} />,
      min: 0.2,
      max: 0.5,
      description: "Residual disinfectant",
    },

    {
      key: "tds",
      label: "TDS",
      unit: " mg/L",
      icon: <Droplets size={22} />,
      max: 300,
      description: "Total dissolved solids",
    },

    {
      key: "conductivity",
      label: "Conductivity",
      unit: " µS/cm",
      icon: <Activity size={22} />,
      description: "Electrical conductivity",
    },

    {
      key: "orp",
      label: "ORP",
      unit: " mV",
      icon: <Radio size={22} />,
      description: "Oxidation reduction potential",
      decimals: 0,
    },

    {
      key: "temperature",
      label: "Temperature",
      unit: " °C",
      icon: <Thermometer size={22} />,
      description: "Water temperature",
    },

    {
      key: "pressure",
      label: "Pressure",
      unit: " bar",
      icon: <Gauge size={22} />,
      description: "Pipeline pressure",
    },
  ];

  /* =======================================================
     SENSOR COUNT
     ======================================================= */

  const sensorStats = useMemo(() => {
    const sensors = Object.values(waterState.sensors);

    const online = sensors.filter(Boolean).length;

    return {
      total: sensors.length,
      online,
      offline: sensors.length - online,
    };
  }, [waterState.sensors]);

  /* =======================================================
     UPDATE TIME
     ======================================================= */

  const updatedTime = formatUpdatedTime(
    waterState.lastUpdated ?? water.updatedAt,
  );

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="water-dashboard">
      {/* =================================================
          HEADER
         ================================================= */}

      <header className="water-dashboard-header">
        <div>
          <span className="water-eyebrow">ABN WATER MONITORING</span>

          <h1>Water Treatment Dashboard</h1>

          <p>
            Real-time monitoring kualitas air dan kondisi proses pengolahan.
          </p>
        </div>

        <div className="water-header-right">
          <div
            className={`water-server-status ${
              waterState.connected ? "online" : "offline"
            }`}
          >
            <span className="server-dot" />

            <div>
              <strong>
                {waterState.connected ? "SERVER ONLINE" : "SERVER OFFLINE"}
              </strong>

              <small>ABN WATER SERVER :5000</small>
            </div>
          </div>

          <button
            type="button"
            className="water-refresh-button"
            onClick={fetchWaterQuality}
            disabled={waterState.loading}
          >
            <RefreshCw
              size={17}
              className={waterState.loading ? "water-spin" : ""}
            />

            {waterState.loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </header>

      {/* =================================================
          ERROR
         ================================================= */}

      {waterState.error && (
        <div className="water-error">
          <AlertTriangle size={18} />

          <span>{waterState.error}</span>

          <button type="button" onClick={fetchWaterQuality}>
            Retry
          </button>
        </div>
      )}

      {/* =================================================
          SITE OVERVIEW
         ================================================= */}

      <section className="water-site-overview">
        <div className="site-main">
          <div className="site-icon">
            <Droplets size={28} />
          </div>

          <div>
            <span>MONITORING SITE</span>

            <strong>
              {waterState.selectedSite || water.siteName || "Unknown Site"}
            </strong>

            <small>
              Site ID: {water.siteId ?? "-"}
              {"  "}• Device: {waterState.deviceId || water.deviceId || "-"}
            </small>
          </div>
        </div>

        <div className={`overall-status ${overallStatus}`}>
          {overallStatus === "normal" ? (
            <CheckCircle2 size={26} />
          ) : overallStatus === "offline" ? (
            <WifiOff size={26} />
          ) : (
            <AlertTriangle size={26} />
          )}

          <div>
            <span>OVERALL STATUS</span>

            <strong>{overallStatusLabel}</strong>
          </div>
        </div>

        <div
          className={`water-live ${
            waterState.connected ? "online" : "offline"
          }`}
        >
          {waterState.connected ? <Wifi size={16} /> : <WifiOff size={16} />}

          <span className="live-dot" />

          {waterState.connected ? "LIVE" : "OFFLINE"}
        </div>
      </section>

      {/* =================================================
          KPI
         ================================================= */}

      <section className="water-kpi-grid">
        {parameters.slice(0, 5).map((parameter) => (
          <article
            className={`water-kpi-card ${getParameterStatus(
              water[parameter.key],
              parameter.min,
              parameter.max,
              waterState.sensors[parameter.key],
            )}`}
            key={parameter.key}
          >
            <div className="kpi-icon">{parameter.icon}</div>

            <div className="kpi-content">
              <span>{parameter.label}</span>

              <strong>
                {formatValue(water[parameter.key], parameter.decimals ?? 2)}

                <small>{parameter.unit}</small>
              </strong>
            </div>
          </article>
        ))}
      </section>

      {/* =================================================
          MAIN MONITORING
         ================================================= */}

      <section className="water-main-grid">
        {/* PARAMETERS */}

        <article className="water-panel parameter-panel">
          <div className="water-panel-header">
            <div>
              <h2>Water Quality Parameters</h2>

              <p>Real-time process parameters</p>
            </div>

            <span className="updated-label">Updated {updatedTime}</span>
          </div>

          <div className="water-parameter-grid">
            {parameters.map((parameter) => (
              <ParameterCard
                key={parameter.key}
                config={parameter}
                value={water[parameter.key]}
                online={waterState.sensors[parameter.key]}
              />
            ))}
          </div>
        </article>

        {/* PLANT STATUS */}

        <article className="water-panel plant-status-panel">
          <div className="water-panel-header">
            <div>
              <h2>Plant Status</h2>

              <p>Kondisi monitoring sistem</p>
            </div>
          </div>

          <div className="plant-status-main">
            <div className={`plant-status-icon ${overallStatus}`}>
              {overallStatus === "normal" ? (
                <ShieldCheck size={34} />
              ) : overallStatus === "offline" ? (
                <WifiOff size={34} />
              ) : (
                <AlertTriangle size={34} />
              )}
            </div>

            <strong>{overallStatusLabel}</strong>

            <span>Water Quality Assessment</span>
          </div>

          <div className="plant-info-list">
            <div>
              <span>Sensors Online</span>

              <strong>
                {sensorStats.online}/{sensorStats.total}
              </strong>
            </div>

            <div>
              <span>Sensors Offline</span>

              <strong>{sensorStats.offline}</strong>
            </div>

            <div>
              <span>Device</span>

              <strong>{water.deviceId || waterState.deviceId || "-"}</strong>
            </div>

            <div>
              <span>Last Update</span>

              <strong>{updatedTime}</strong>
            </div>
          </div>

          <div className="connection-box">
            {waterState.connected ? (
              <>
                <Wifi size={17} />

                <div>
                  <strong>System Connected</strong>

                  <span>Data diterima dari water monitoring device.</span>
                </div>
              </>
            ) : (
              <>
                <WifiOff size={17} />

                <div>
                  <strong>System Offline</strong>

                  <span>Tidak menerima data terbaru.</span>
                </div>
              </>
            )}
          </div>
        </article>
      </section>

      {/* =================================================
          SENSOR STATUS
         ================================================= */}

      <section className="water-panel sensor-panel">
        <div className="water-panel-header">
          <div>
            <h2>Sensor Status</h2>

            <p>Status koneksi setiap sensor</p>
          </div>

          <div className="sensor-summary">
            <span className="sensor-online">● {sensorStats.online} Online</span>

            <span className="sensor-offline">
              ● {sensorStats.offline} Offline
            </span>
          </div>
        </div>

        <div className="sensor-status-grid">
          {parameters.map((parameter) => {
            const online = waterState.sensors[parameter.key];

            return (
              <div
                className={`sensor-status-card ${
                  online ? "online" : "offline"
                }`}
                key={parameter.key}
              >
                <div className="sensor-status-icon">{parameter.icon}</div>

                <div>
                  <strong>{parameter.label}</strong>

                  <span>{online ? "Sensor Online" : "Sensor Offline"}</span>
                </div>

                <span className="sensor-state-dot" />
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================
          LABORATORY
         ================================================= */}

      <section className="water-panel laboratory-panel">
        <div className="water-panel-header">
          <div>
            <h2>Laboratory Verification</h2>

            <p>Parameter yang memerlukan verifikasi laboratorium</p>
          </div>
        </div>

        <div className="laboratory-grid">
          <div className="lab-card">
            <div className="lab-icon">
              <FlaskConical size={22} />
            </div>

            <div>
              <strong>E. coli</strong>

              <span>Target: 0 CFU/100 mL</span>
            </div>

            <span className="lab-badge">LAB</span>
          </div>

          <div className="lab-card">
            <div className="lab-icon">
              <FlaskConical size={22} />
            </div>

            <div>
              <strong>Total Coliform</strong>

              <span>Target: 0 CFU/100 mL</span>
            </div>

            <span className="lab-badge">LAB</span>
          </div>

          <div className="lab-card">
            <div className="lab-icon">
              <FlaskConical size={22} />
            </div>

            <div>
              <strong>Heavy Metals</strong>

              <span>Pb · As · Cd · Cr · Mn · Fe</span>
            </div>

            <span className="lab-badge">LAB</span>
          </div>
        </div>
      </section>

      {/* =================================================
          DISCLAIMER
         ================================================= */}

      <footer className="water-dashboard-footer">
        <AlertTriangle size={16} />

        <span>
          Online sensor merupakan sistem monitoring dan early warning, bukan
          pengganti pengujian kualitas air di laboratorium.
        </span>
      </footer>
    </main>
  );
};

export default Dashboard;
