import { Op } from "sequelize";
import db from "../models/index.js";

const { Sensor, Device } = db;

// ========================================
// GET ALL SENSORS
// ========================================

export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.findAll({
      include: [
        {
          model: Device,
          as: "device",
          attributes: ["id", "waterSiteId", "code", "name", "type", "status"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      data: sensors,
    });
  } catch (error) {
    console.error("getSensors:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensors",
    });
  }
};

// ========================================
// GET SENSOR BY ID
// ========================================

export const getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id, {
      include: [
        {
          model: Device,
          as: "device",
        },
      ],
    });

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    res.json({
      success: true,
      data: sensor,
    });
  } catch (error) {
    console.error("getSensorById:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve sensor",
    });
  }
};

// ========================================
// CREATE SENSOR
// ========================================

export const createSensor = async (req, res) => {
  try {
    const {
      deviceId,
      code,
      name,
      type,
      unit,
      dataType,
      minValue,
      maxValue,
      warningLow,
      warningHigh,
      alarmLow,
      alarmHigh,
      address,
      description,
      status,
      lastValue,
      lastValueAt,
      metadata,
    } = req.body;

    if (!deviceId || !code || !name) {
      return res.status(400).json({
        success: false,
        message: "deviceId, code and name are required",
      });
    }

    const device = await Device.findByPk(deviceId);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    const existing = await Sensor.findOne({
      where: {
        [Op.or]: [{ code }],
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Sensor code already exists",
      });
    }

    const sensor = await Sensor.create({
      deviceId,
      code,
      name,
      type,
      unit,
      dataType,
      minValue,
      maxValue,
      warningLow,
      warningHigh,
      alarmLow,
      alarmHigh,
      address,
      description,
      status,
      lastValue,
      lastValueAt,
      metadata,
    });

    res.status(201).json({
      success: true,
      message: "Sensor created successfully",
      data: sensor,
    });
  } catch (error) {
    console.error("createSensor:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create sensor",
    });
  }
};

// ========================================
// UPDATE SENSOR
// ========================================

export const updateSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    if (req.body.deviceId) {
      const device = await Device.findByPk(req.body.deviceId);

      if (!device) {
        return res.status(404).json({
          success: false,
          message: "Device not found",
        });
      }
    }

    await sensor.update(req.body);

    res.json({
      success: true,
      message: "Sensor updated successfully",
      data: sensor,
    });
  } catch (error) {
    console.error("updateSensor:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update sensor",
    });
  }
};

// ========================================
// DELETE SENSOR
// ========================================

export const deleteSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    await sensor.destroy();

    res.json({
      success: true,
      message: "Sensor deleted successfully",
    });
  } catch (error) {
    console.error("deleteSensor:", error);

    res.status(409).json({
      success: false,
      message: "Sensor cannot be deleted because it is still in use",
    });
  }
};
