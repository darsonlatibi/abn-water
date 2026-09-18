/* =========================================================
   ABN WATER
   WATER QUALITY PAGE
   ========================================================= */

import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../stores/store";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Gauge,
  FlaskConical,
  Thermometer,
  Waves,
  RefreshCw,
  ShieldCheck,
  Radio,
  Wifi,
  WifiOff,
} from "lucide-react";

import {
  setWaterQuality,
  setWaterQualityConnected,
  setWaterQualityLoading,
  setWaterQualityError,
  setWaterQualityDevice,
  setSelectedWaterQualitySite,
} from "../../features/report/waterQualitySlice";

import "./WaterQuality.css";

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
   PARAMETER CARD PROPS
   ========================================================= */

interface ParameterCardProps {
  label: string;

  value: number | null;

  unit: string;

  icon: React.ReactNode;

  min?: number;

  max?: number;

  description?: string;

  online?: boolean;
}

/* =========================================================
   HELPERS
   ========================================================= */

/**
 * Convert backend status to UI status.
 */
const normalizeStatus = (status?: string | null): QualityStatus => {
  switch (String(status ?? "").toUpperCase()) {
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

/**
 * Safely convert API number.
 */
const toNumberOrNull = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
};

/**
 * Safely format sensor value.
 */
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

/**
 * Parameter status.
 */
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

/* =========================================================
   PARAMETER CARD
   ========================================================= */

const ParameterCard: React.FC<ParameterCardProps> = ({
  label,
  value,
  unit,
  icon,
  min,
  max,
  description,
  online = true,
}) => {
  const status = getParameterStatus(value, min, max, online);

  return (
    <div className={`wq-parameter-card ${status}`}>
      {/* =================================================
          HEADER
         ================================================= */}

      <div className="wq-card-header">
        <div className="wq-card-icon">{icon}</div>

        <span
          className={`wq-status-dot ${status}`}
          title={status === "offline" ? "Sensor offline" : status.toUpperCase()}
        />
      </div>

      {/* =================================================
          LABEL
         ================================================= */}

      <div className="wq-card-label">{label}</div>

      {/* =================================================
          VALUE
         ================================================= */}

      <div className="wq-card-value">
        {formatValue(value)}

        <span>{unit}</span>
      </div>

      {/* =================================================
          DESCRIPTION
         ================================================= */}

      {description && <div className="wq-card-description">{description}</div>}

      {/* =================================================
          RANGE
         ================================================= */}

      {(min !== undefined || max !== undefined) && (
        <div className="wq-range">
          <span>Min {min ?? "-"}</span>

          <span>Max {max ?? "-"}</span>
        </div>
      )}

      {/* =================================================
          SENSOR STATE
         ================================================= */}

      <div className="wq-sensor-state">
        {status === "offline"
          ? "Sensor Offline"
          : status === "critical"
            ? "Critical"
            : status === "warning"
              ? "Warning"
              : "Sensor Online"}
      </div>
    </div>
  );
};

/* =========================================================
   WATER QUALITY PAGE
   ========================================================= */

const WaterQuality: React.FC = () => {
  /* =======================================================
     REDUX
     ======================================================= */

  const dispatch = useDispatch<AppDispatch>();

  const waterState = useSelector((state: RootState) => state.waterQuality);

  const waterQuality = waterState?.data;

  /* =======================================================
     FETCH LATEST WATER QUALITY
     ======================================================= */

  const fetchLatestWaterQuality = useCallback(async () => {
    try {
      dispatch(setWaterQualityLoading(true));

      dispatch(setWaterQualityError(null));

      /* ================================================
           QUERY
           ================================================ */

      const params = new URLSearchParams();

      if (waterState?.deviceId) {
        params.set("deviceId", waterState.deviceId);
      }

      const query = params.toString();

      const url = query ? `${WATER_LATEST_URL}?${query}` : WATER_LATEST_URL;

      /* ================================================
           FETCH
           ================================================ */

      const response = await fetch(url, {
        method: "GET",

        headers: {
          Accept: "application/json",
        },
      });

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid response from water quality API");
      }

      if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch water quality");
      }

      if (!result?.success || !result?.data) {
        throw new Error("No water quality data found");
      }

      const data = result.data;

      /* ================================================
           NORMALIZE API DATA
           ================================================ */

      const normalizedStatus = String(data.status ?? "NORMAL").toUpperCase();

      /* ================================================
           UPDATE REDUX DATA
           ================================================ */

      dispatch(
        setWaterQuality({
          siteId:
            data.siteId !== null && data.siteId !== undefined
              ? Number(data.siteId)
              : null,

          siteName: data.siteName ?? null,

          deviceId: data.deviceId ?? null,

          measuredAt: data.measuredAt ?? null,

          ph: toNumberOrNull(data.ph),

          turbidity: toNumberOrNull(data.turbidity),

          freeChlorine: toNumberOrNull(data.freeChlorine),

          tds: toNumberOrNull(data.tds),

          conductivity: toNumberOrNull(data.conductivity),

          orp: toNumberOrNull(data.orp),

          temperature: toNumberOrNull(data.temperature),

          pressure: toNumberOrNull(data.pressure),

          status: normalizedStatus as
            | "NORMAL"
            | "WARNING"
            | "CRITICAL"
            | "OFFLINE",

          updatedAt:
            data.updatedAt ?? data.measuredAt ?? new Date().toISOString(),
        }),
      );

      /* ================================================
           SITE
           ================================================ */

      if (data.siteName) {
        dispatch(setSelectedWaterQualitySite(data.siteName));
      }

      /* ================================================
           DEVICE
           ================================================ */

      if (data.deviceId) {
        dispatch(setWaterQualityDevice(data.deviceId));
      }

      /* ================================================
           CONNECTION
           ================================================ */

      dispatch(setWaterQualityConnected(true));
    } catch (error) {
      console.error("fetchLatestWaterQuality:", error);

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
  }, [dispatch, waterState?.deviceId]);

  /* =======================================================
     LOAD DATA WHEN PAGE OPENS
     ======================================================= */

  useEffect(() => {
    fetchLatestWaterQuality();
  }, [fetchLatestWaterQuality]);

  /* =======================================================
     OVERALL STATUS
     ======================================================= */

  const overallStatus = useMemo<QualityStatus>(() => {
    if (!waterState?.connected) {
      return "offline";
    }

    return normalizeStatus(waterState.overallStatus);
  }, [waterState?.connected, waterState?.overallStatus]);

  /* =======================================================
     STATUS LABEL
     ======================================================= */

  const overallStatusLabel =
    overallStatus === "normal"
      ? "NORMAL"
      : overallStatus === "warning"
        ? "WARNING"
        : overallStatus === "critical"
          ? "CRITICAL"
          : "OFFLINE";

  /* =======================================================
     STATUS ICON
     ======================================================= */

  const overallStatusIcon =
    overallStatus === "normal" ? (
      <CheckCircle2 size={25} />
    ) : overallStatus === "offline" ? (
      <WifiOff size={25} />
    ) : (
      <AlertTriangle size={25} />
    );

  /* =======================================================
     LAST UPDATE
     ======================================================= */

  const updatedTime = useMemo(() => {
    const timestamp = waterState?.lastUpdated ?? waterQuality?.updatedAt;

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
  }, [waterState?.lastUpdated, waterQuality?.updatedAt]);

  /* =======================================================
     MEASURED AT
     ======================================================= */

  const measuredTime = useMemo(() => {
    const timestamp = waterQuality?.measuredAt;

    if (!timestamp) {
      return "-";
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  }, [waterQuality?.measuredAt]);

  /* =======================================================
     EMPTY STATE
     ======================================================= */

  if (!waterState || !waterQuality) {
    return (
      <div className="water-quality-page">
        <div className="wq-empty">
          <Droplets size={42} />

          <h3>No water quality data</h3>

          <p>Belum ada data sensor kualitas air.</p>

          <button
            type="button"
            className="wq-action-btn primary"
            onClick={fetchLatestWaterQuality}
            disabled={waterState?.loading}
          >
            <RefreshCw
              size={17}
              className={waterState?.loading ? "wq-spin" : ""}
            />

            {waterState?.loading ? "Loading..." : "Load Data"}
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="water-quality-page">
      {/* ===================================================
          HEADER
         =================================================== */}

      <div className="wq-page-header">
        <div>
          <div className="wq-eyebrow">ABN WATER MONITORING</div>

          <h1>Water Quality</h1>

          <p>Monitoring kualitas air secara real-time.</p>
        </div>

        <div className="wq-header-actions">
          {/* REFRESH */}

          <button
            type="button"
            className="wq-action-btn"
            onClick={fetchLatestWaterQuality}
            disabled={waterState.loading}
          >
            <RefreshCw
              size={17}
              className={waterState.loading ? "wq-spin" : ""}
            />

            {waterState.loading ? "Loading..." : "Refresh"}
          </button>

          {/* LIVE */}

          <button type="button" className="wq-action-btn primary">
            <Activity size={17} />
            Live Monitoring
          </button>
        </div>
      </div>

      {/* ===================================================
          ERROR
         =================================================== */}

      {waterState.error && (
        <div className="wq-error">
          <AlertTriangle size={18} />

          <span>{waterState.error}</span>

          <button type="button" onClick={fetchLatestWaterQuality}>
            Retry
          </button>
        </div>
      )}

      {/* ===================================================
          OVERVIEW
         =================================================== */}

      <div className="wq-overview">
        {/* SITE */}

        <div className="wq-site">
          <div className="wq-site-icon">
            <Droplets size={26} />
          </div>

          <div>
            <span>MONITORING SITE</span>

            <strong>
              {waterState.selectedSite ||
                waterQuality.siteName ||
                "Unknown Site"}
            </strong>

            {waterState.deviceId && (
              <small>Device: {waterState.deviceId}</small>
            )}

            {waterQuality.siteId !== null &&
              waterQuality.siteId !== undefined && (
                <small>Site ID: {waterQuality.siteId}</small>
              )}
          </div>
        </div>

        {/* STATUS */}

        <div className={`wq-overall-status ${overallStatus}`}>
          {overallStatusIcon}

          <div>
            <span>OVERALL STATUS</span>

            <strong>{overallStatusLabel}</strong>
          </div>
        </div>

        {/* CONNECTION */}

        <div
          className={`wq-live-indicator ${
            waterState.connected ? "online" : "offline"
          }`}
        >
          <span className="wq-live-dot" />

          {waterState.connected ? (
            <>
              <Wifi size={15} />
              LIVE
            </>
          ) : (
            <>
              <WifiOff size={15} />
              OFFLINE
            </>
          )}
        </div>
      </div>

      {/* ===================================================
          PARAMETERS
         =================================================== */}

      <section className="wq-section">
        <div className="wq-section-title">
          <div>
            <h2>Water Parameters</h2>

            <p>Parameter utama kualitas air</p>
          </div>

          <div>
            <span className="wq-update">Updated {updatedTime}</span>

            <span className="wq-update">Measured {measuredTime}</span>
          </div>
        </div>

        <div className="wq-grid">
          {/* pH */}

          <ParameterCard
            label="pH"
            value={waterQuality.ph}
            unit=""
            icon={<FlaskConical size={22} />}
            min={6.5}
            max={8.5}
            description="Recommended monitoring range"
            online={waterState.sensors.ph}
          />

          {/* TURBIDITY */}

          <ParameterCard
            label="Turbidity"
            value={waterQuality.turbidity}
            unit=" NTU"
            icon={<Waves size={22} />}
            max={3}
            description="Water clarity"
            online={waterState.sensors.turbidity}
          />

          {/* CHLORINE */}

          <ParameterCard
            label="Free Chlorine"
            value={waterQuality.freeChlorine}
            unit=" mg/L"
            icon={<ShieldCheck size={22} />}
            min={0.2}
            max={0.5}
            description="Residual disinfectant"
            online={waterState.sensors.freeChlorine}
          />

          {/* TDS */}

          <ParameterCard
            label="TDS"
            value={waterQuality.tds}
            unit=" mg/L"
            icon={<Droplets size={22} />}
            max={300}
            description="Total dissolved solids"
            online={waterState.sensors.tds}
          />

          {/* CONDUCTIVITY */}

          <ParameterCard
            label="Conductivity"
            value={waterQuality.conductivity}
            unit=" µS/cm"
            icon={<Activity size={22} />}
            description="Electrical conductivity"
            online={waterState.sensors.conductivity}
          />

          {/* ORP */}

          <ParameterCard
            label="ORP"
            value={waterQuality.orp}
            unit=" mV"
            icon={<Radio size={22} />}
            description="Oxidation reduction potential"
            online={waterState.sensors.orp}
          />

          {/* TEMPERATURE */}

          <ParameterCard
            label="Temperature"
            value={waterQuality.temperature}
            unit=" °C"
            icon={<Thermometer size={22} />}
            description="Water temperature"
            online={waterState.sensors.temperature}
          />

          {/* PRESSURE */}

          <ParameterCard
            label="Pressure"
            value={waterQuality.pressure}
            unit=" bar"
            icon={<Gauge size={22} />}
            description="Pipeline pressure"
            online={waterState.sensors.pressure}
          />
        </div>
      </section>

      {/* ===================================================
          QUALITY SUMMARY
         =================================================== */}

      <section className={`wq-summary ${overallStatus}`}>
        <div className="wq-summary-icon">
          {overallStatus === "normal" ? (
            <ShieldCheck size={30} />
          ) : overallStatus === "offline" ? (
            <WifiOff size={30} />
          ) : (
            <AlertTriangle size={30} />
          )}
        </div>

        <div className="wq-summary-content">
          <h3>Water Quality Assessment</h3>

          {overallStatus === "normal" ? (
            <p>
              Parameter online saat ini berada dalam rentang monitoring yang
              ditentukan sistem.
            </p>
          ) : overallStatus === "warning" ? (
            <p>Terdapat parameter yang membutuhkan perhatian.</p>
          ) : overallStatus === "critical" ? (
            <p>
              Terdapat parameter kritis. Periksa kondisi sensor dan instalasi
              air.
            </p>
          ) : (
            <p>
              Sistem monitoring sedang offline atau belum menerima data sensor
              terbaru.
            </p>
          )}

          <div className="wq-warning">
            <AlertTriangle size={16} />

            <span>
              Sensor online merupakan sistem monitoring / early warning dan
              bukan pengganti pengujian kualitas air di laboratorium.
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================
          LABORATORY
         =================================================== */}

      <section className="wq-lab-section">
        <div className="wq-section-title">
          <div>
            <h2>Laboratory Verification</h2>

            <p>Parameter yang membutuhkan pengujian laboratorium</p>
          </div>
        </div>

        <div className="wq-lab-grid">
          {/* E.COLI */}

          <div className="wq-lab-card">
            <div className="wq-lab-icon">
              <FlaskConical size={21} />
            </div>

            <div>
              <strong>E. coli</strong>

              <span>Target: 0 CFU/100 mL</span>
            </div>

            <div className="wq-lab-status">LAB</div>
          </div>

          {/* TOTAL COLIFORM */}

          <div className="wq-lab-card">
            <div className="wq-lab-icon">
              <FlaskConical size={21} />
            </div>

            <div>
              <strong>Total Coliform</strong>

              <span>Target: 0 CFU/100 mL</span>
            </div>

            <div className="wq-lab-status">LAB</div>
          </div>

          {/* HEAVY METALS */}

          <div className="wq-lab-card">
            <div className="wq-lab-icon">
              <FlaskConical size={21} />
            </div>

            <div>
              <strong>Heavy Metals</strong>

              <span>Pb · As · Cd · Cr · Mn · Fe</span>
            </div>

            <div className="wq-lab-status">LAB</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterQuality;
