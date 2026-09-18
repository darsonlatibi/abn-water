import db from "../models/index.js";

const { SensorAlert } = db;

/**
 * Evaluate sensor value and quality against configured thresholds
 * and create/update/resolve SensorAlert automatically.
 */
export const evaluateSensorAlert = async ({
  sensor,
  deviceId,
  value,
  quality = "good",
  timestamp = new Date(),
  metadata = null,
}) => {
  // ========================================
  // FIND CURRENT ACTIVE ALERT
  // ========================================

  const activeAlert = await SensorAlert.findOne({
    where: {
      sensorId: sensor.id,
      status: "active",
    },
    order: [["triggeredAt", "DESC"]],
  });

  // ========================================
  // OFFLINE / BAD QUALITY
  // ========================================

  if (quality === "offline" || quality === "bad") {
    // Resolve existing non-offline alert
    if (activeAlert && activeAlert.alertType !== "offline") {
      await activeAlert.update({
        status: "resolved",
        resolvedAt: timestamp,
      });
    }

    // Reuse existing offline alert
    const offlineAlert =
      activeAlert && activeAlert.alertType === "offline"
        ? activeAlert
        : await SensorAlert.create({
            sensorId: sensor.id,
            deviceId,
            alertType: "offline",
            severity: "critical",
            value:
              value !== undefined &&
              value !== null &&
              !Number.isNaN(Number(value))
                ? Number(value)
                : null,
            threshold: null,
            message:
              quality === "offline"
                ? `${sensor.name} is offline`
                : `${sensor.name} has bad quality`,
            status: "active",
            triggeredAt: timestamp,
            metadata,
          });

    // Update existing offline alert
    if (activeAlert && activeAlert.alertType === "offline") {
      await offlineAlert.update({
        value:
          value !== undefined && value !== null && !Number.isNaN(Number(value))
            ? Number(value)
            : null,
        message:
          quality === "offline"
            ? `${sensor.name} is offline`
            : `${sensor.name} has bad quality`,
        metadata,
      });
    }

    return {
      action:
        activeAlert && activeAlert.alertType === "offline"
          ? "updated"
          : "created",
      alert: offlineAlert,
    };
  }

  // ========================================
  // QUALITY IS NORMAL
  // ========================================

  // If an offline alert exists, resolve it first
  if (activeAlert && activeAlert.alertType === "offline") {
    await activeAlert.update({
      status: "resolved",
      resolvedAt: timestamp,
    });
  }

  // ========================================
  // ONLY NUMERIC VALUES CAN BE EVALUATED
  // ========================================

  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return {
      action:
        activeAlert && activeAlert.alertType === "offline" ? "resolved" : null,
      alert:
        activeAlert && activeAlert.alertType === "offline" ? activeAlert : null,
    };
  }

  const numericValue = Number(value);

  // ========================================
  // DETERMINE ALERT TYPE
  // ========================================

  let alertType = null;
  let severity = null;
  let threshold = null;
  let message = null;

  // ----------------------------------------
  // ALARM HIGH
  // ----------------------------------------

  if (
    sensor.alarmHigh !== null &&
    sensor.alarmHigh !== undefined &&
    numericValue >= Number(sensor.alarmHigh)
  ) {
    alertType = "alarm_high";
    severity = "alarm";
    threshold = sensor.alarmHigh;
    message = `${sensor.name} above alarm threshold`;
  }

  // ----------------------------------------
  // ALARM LOW
  // ----------------------------------------
  else if (
    sensor.alarmLow !== null &&
    sensor.alarmLow !== undefined &&
    numericValue <= Number(sensor.alarmLow)
  ) {
    alertType = "alarm_low";
    severity = "alarm";
    threshold = sensor.alarmLow;
    message = `${sensor.name} below alarm threshold`;
  }

  // ----------------------------------------
  // WARNING HIGH
  // ----------------------------------------
  else if (
    sensor.warningHigh !== null &&
    sensor.warningHigh !== undefined &&
    numericValue >= Number(sensor.warningHigh)
  ) {
    alertType = "warning_high";
    severity = "warning";
    threshold = sensor.warningHigh;
    message = `${sensor.name} above warning threshold`;
  }

  // ----------------------------------------
  // WARNING LOW
  // ----------------------------------------
  else if (
    sensor.warningLow !== null &&
    sensor.warningLow !== undefined &&
    numericValue <= Number(sensor.warningLow)
  ) {
    alertType = "warning_low";
    severity = "warning";
    threshold = sensor.warningLow;
    message = `${sensor.name} below warning threshold`;
  }

  // ========================================
  // NORMAL CONDITION
  // ========================================

  if (!alertType) {
    if (activeAlert && activeAlert.alertType !== "offline") {
      await activeAlert.update({
        status: "resolved",
        resolvedAt: timestamp,
      });

      return {
        action: "resolved",
        alert: activeAlert,
      };
    }

    return {
      action:
        activeAlert && activeAlert.alertType === "offline" ? "resolved" : null,
      alert:
        activeAlert && activeAlert.alertType === "offline" ? activeAlert : null,
    };
  }

  // ========================================
  // SAME ALERT ALREADY ACTIVE
  // ========================================

  if (activeAlert && activeAlert.alertType === alertType) {
    await activeAlert.update({
      value: numericValue,
      threshold,
      message,
      metadata,
    });

    return {
      action: "updated",
      alert: activeAlert,
    };
  }

  // ========================================
  // DIFFERENT ALERT LEVEL
  // ========================================

  if (activeAlert) {
    await activeAlert.update({
      status: "resolved",
      resolvedAt: timestamp,
    });
  }

  // ========================================
  // CREATE NEW ALERT
  // ========================================

  const alert = await SensorAlert.create({
    sensorId: sensor.id,
    deviceId,
    alertType,
    severity,
    value: numericValue,
    threshold,
    message,
    status: "active",
    triggeredAt: timestamp,
    metadata,
  });

  return {
    action: "created",
    alert,
  };
};
