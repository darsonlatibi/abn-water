import db from "../models/index.js";

const { SensorAlert, Sensor, Device } = db;

// ========================================
// GET ALL SENSOR ALERTS
// ========================================

export const getSensorAlerts = async (req, res) => {
  try {
    const {
      sensorId,
      deviceId,
      status,
      severity,
      alertType,
      limit = 100,
    } = req.query;

    const where = {};

    if (sensorId) {
      where.sensorId = sensorId;
    }

    if (deviceId) {
      where.deviceId = deviceId;
    }

    if (status) {
      where.status = status;
    }

    if (severity) {
      where.severity = severity;
    }

    if (alertType) {
      where.alertType = alertType;
    }

    const alerts = await SensorAlert.findAll({
      where,
      include: [
        {
          model: Sensor,
          as: "sensor",
          attributes: [
            "id",
            "deviceId",
            "code",
            "name",
            "type",
            "unit",
            "status",
          ],
        },
        {
          model: Device,
          as: "device",
          attributes: ["id", "waterSiteId", "code", "name", "type", "status"],
        },
      ],
      order: [["triggeredAt", "DESC"]],
      limit: Math.min(Number(limit) || 100, 1000),
    });

    res.json({
      success: true,
      data: alerts,
    });
  } catch (error) {
    console.error("getSensorAlerts:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensor alerts",
    });
  }
};

// ========================================
// GET SENSOR ALERT BY ID
// ========================================

export const getSensorAlertById = async (req, res) => {
  try {
    const alert = await SensorAlert.findByPk(req.params.id, {
      include: [
        {
          model: Sensor,
          as: "sensor",
        },
        {
          model: Device,
          as: "device",
        },
      ],
    });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Sensor alert not found",
      });
    }

    res.json({
      success: true,
      data: alert,
    });
  } catch (error) {
    console.error("getSensorAlertById:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensor alert",
    });
  }
};

// ========================================
// CREATE SENSOR ALERT
// ========================================

export const createSensorAlert = async (req, res) => {
  try {
    const {
      sensorId,
      deviceId,
      alertType,
      severity = "warning",
      value,
      threshold,
      message,
      status = "active",
      triggeredAt,
      metadata,
    } = req.body;

    if (!sensorId) {
      return res.status(400).json({
        success: false,
        message: "sensorId is required",
      });
    }

    if (!alertType) {
      return res.status(400).json({
        success: false,
        message: "alertType is required",
      });
    }

    if (
      ![
        "warning_low",
        "warning_high",
        "alarm_low",
        "alarm_high",
        "offline",
      ].includes(alertType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid alertType",
      });
    }

    if (!["info", "warning", "alarm", "critical"].includes(severity)) {
      return res.status(400).json({
        success: false,
        message: "Invalid severity",
      });
    }

    if (!["active", "acknowledged", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "message is required",
      });
    }

    const sensor = await Sensor.findByPk(sensorId);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    let resolvedDeviceId = sensor.deviceId;

    if (deviceId !== undefined && deviceId !== null) {
      const device = await Device.findByPk(deviceId);

      if (!device) {
        return res.status(404).json({
          success: false,
          message: "Device not found",
        });
      }

      if (Number(deviceId) !== Number(sensor.deviceId)) {
        return res.status(400).json({
          success: false,
          message: "Device does not belong to this sensor",
        });
      }

      resolvedDeviceId = deviceId;
    }

    const alertTimestamp = triggeredAt ? new Date(triggeredAt) : new Date();

    if (Number.isNaN(alertTimestamp.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid triggeredAt",
      });
    }

    const alert = await SensorAlert.create({
      sensorId,
      deviceId: resolvedDeviceId,
      alertType,
      severity,
      value,
      threshold,
      message,
      status,
      triggeredAt: alertTimestamp,
      metadata,
    });

    res.status(201).json({
      success: true,
      message: "Sensor alert created successfully",
      data: alert,
    });
  } catch (error) {
    console.error("createSensorAlert:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create sensor alert",
    });
  }
};

// ========================================
// UPDATE SENSOR ALERT STATUS
// ========================================

export const updateSensorAlertStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "acknowledged", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const alert = await SensorAlert.findByPk(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Sensor alert not found",
      });
    }

    const now = new Date();

    const updateData = {
      status,
    };

    if (status === "acknowledged") {
      updateData.acknowledgedAt = now;
    }

    if (status === "resolved") {
      updateData.resolvedAt = now;
    }

    await alert.update(updateData);

    res.json({
      success: true,
      message: "Sensor alert status updated successfully",
      data: alert,
    });
  } catch (error) {
    console.error("updateSensorAlertStatus:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update sensor alert status",
    });
  }
};

// ========================================
// DELETE SENSOR ALERT
// ========================================

export const deleteSensorAlert = async (req, res) => {
  try {
    const alert = await SensorAlert.findByPk(req.params.id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Sensor alert not found",
      });
    }

    await alert.destroy();

    res.json({
      success: true,
      message: "Sensor alert deleted successfully",
    });
  } catch (error) {
    console.error("deleteSensorAlert:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete sensor alert",
    });
  }
};
