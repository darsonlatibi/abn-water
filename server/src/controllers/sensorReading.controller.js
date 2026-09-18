//import { Op } from "sequelize";
import db from "../models/index.js";

const { SensorReading, Sensor, Device } = db;

// ========================================
// GET ALL SENSOR READINGS
// ========================================

export const getSensorReadings = async (req, res) => {
  try {
    const { sensorId, deviceId, quality, limit = 100 } = req.query;

    const where = {};

    if (sensorId) {
      where.sensorId = sensorId;
    }

    if (deviceId) {
      where.deviceId = deviceId;
    }

    if (quality) {
      where.quality = quality;
    }

    const readings = await SensorReading.findAll({
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
            "dataType",
            "status",
          ],
        },
        {
          model: Device,
          as: "device",
          attributes: ["id", "waterSiteId", "code", "name", "type", "status"],
        },
      ],
      order: [["timestamp", "DESC"]],
      limit: Math.min(Number(limit) || 100, 1000),
    });

    res.json({
      success: true,
      data: readings,
    });
  } catch (error) {
    console.error("getSensorReadings:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensor readings",
    });
  }
};

// ========================================
// GET SENSOR READING BY ID
// ========================================

export const getSensorReadingById = async (req, res) => {
  try {
    const reading = await SensorReading.findByPk(req.params.id, {
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

    if (!reading) {
      return res.status(404).json({
        success: false,
        message: "Sensor reading not found",
      });
    }

    res.json({
      success: true,
      data: reading,
    });
  } catch (error) {
    console.error("getSensorReadingById:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensor reading",
    });
  }
};

// ========================================
// GET READINGS BY SENSOR
// ========================================

export const getReadingsBySensor = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { limit = 100, quality } = req.query;

    const sensor = await Sensor.findByPk(sensorId);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    const where = {
      sensorId,
    };

    if (quality) {
      where.quality = quality;
    }

    const readings = await SensorReading.findAll({
      where,
      order: [["timestamp", "DESC"]],
      limit: Math.min(Number(limit) || 100, 1000),
    });

    res.json({
      success: true,
      sensor: {
        id: sensor.id,
        deviceId: sensor.deviceId,
        code: sensor.code,
        name: sensor.name,
        type: sensor.type,
        unit: sensor.unit,
      },
      data: readings,
    });
  } catch (error) {
    console.error("getReadingsBySensor:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensor readings",
    });
  }
};

// ========================================
// CREATE SENSOR READING
// ========================================

export const createSensorReading = async (req, res) => {
  try {
    const {
      sensorId,
      deviceId,
      value,
      valueText,
      quality = "good",
      timestamp,
      metadata,
    } = req.body;

    // ------------------------------------
    // VALIDATION
    // ------------------------------------

    if (!sensorId) {
      return res.status(400).json({
        success: false,
        message: "sensorId is required",
      });
    }

    if (value === undefined && valueText === undefined) {
      return res.status(400).json({
        success: false,
        message: "value or valueText is required",
      });
    }

    if (!["good", "uncertain", "bad", "offline"].includes(quality)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quality",
      });
    }

    // ------------------------------------
    // FIND SENSOR
    // ------------------------------------

    const sensor = await Sensor.findByPk(sensorId);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    // ------------------------------------
    // RESOLVE DEVICE
    // ------------------------------------

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

    // ------------------------------------
    // TIMESTAMP
    // ------------------------------------

    const readingTimestamp = timestamp ? new Date(timestamp) : new Date();

    if (Number.isNaN(readingTimestamp.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid timestamp",
      });
    }

    // ------------------------------------
    // CREATE READING
    // ------------------------------------

    const reading = await SensorReading.create({
      sensorId,
      deviceId: resolvedDeviceId,
      value,
      valueText,
      quality,
      timestamp: readingTimestamp,
      metadata,
    });

    // ------------------------------------
    // UPDATE SENSOR LAST VALUE
    // ------------------------------------

    if (value !== undefined && value !== null) {
      await sensor.update({
        lastValue: value,
        lastValueAt: readingTimestamp,
      });
    }

    res.status(201).json({
      success: true,
      message: "Sensor reading created successfully",
      data: reading,
    });
  } catch (error) {
    console.error("createSensorReading:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create sensor reading",
    });
  }
};
