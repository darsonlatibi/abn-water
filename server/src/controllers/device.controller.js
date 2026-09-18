import { Op } from "sequelize";
import db from "../models/index.js";

const { Device, WaterSite, Sensor } = db;

// ========================================
// GET ALL DEVICES
// ========================================

export const getDevices = async (req, res) => {
  try {
    const devices = await Device.findAll({
      include: [
        {
          model: WaterSite,
          as: "site",
          attributes: ["id", "code", "name", "city", "province", "status"],
        },
        {
          model: Sensor,
          as: "sensors",
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      data: devices,
    });
  } catch (error) {
    console.error("getDevices:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve devices",
    });
  }
};

// ========================================
// GET DEVICE BY ID
// ========================================

export const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [
        {
          model: WaterSite,
          as: "site",
        },
        {
          model: Sensor,
          as: "sensors",
        },
      ],
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    console.error("getDeviceById:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve device",
    });
  }
};

// ========================================
// CREATE DEVICE
// ========================================

export const createDevice = async (req, res) => {
  try {
    const {
      waterSiteId,
      code,
      name,
      type,
      manufacturer,
      model,
      serialNumber,
      ipAddress,
      macAddress,
      firmwareVersion,
      protocol,
      status,
      lastSeenAt,
      metadata,
    } = req.body;

    if (!waterSiteId || !code || !name) {
      return res.status(400).json({
        success: false,
        message: "waterSiteId, code and name are required",
      });
    }

    // Check Water Site
    const site = await WaterSite.findByPk(waterSiteId);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Water site not found",
      });
    }

    // Check duplicate code / serial / MAC
    const existing = await Device.findOne({
      where: {
        [Op.or]: [
          { code },
          ...(serialNumber ? [{ serialNumber }] : []),
          ...(macAddress ? [{ macAddress }] : []),
        ],
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Device code, serial number or MAC address already exists",
      });
    }

    const device = await Device.create({
      waterSiteId,
      code,
      name,
      type,
      manufacturer,
      model,
      serialNumber,
      ipAddress,
      macAddress,
      firmwareVersion,
      protocol,
      status,
      lastSeenAt,
      metadata,
    });

    res.status(201).json({
      success: true,
      message: "Device created successfully",
      data: device,
    });
  } catch (error) {
    console.error("createDevice:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create device",
    });
  }
};

// ========================================
// UPDATE DEVICE
// ========================================

export const updateDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    if (req.body.waterSiteId) {
      const site = await WaterSite.findByPk(req.body.waterSiteId);

      if (!site) {
        return res.status(404).json({
          success: false,
          message: "Water site not found",
        });
      }
    }

    await device.update(req.body);

    res.json({
      success: true,
      message: "Device updated successfully",
      data: device,
    });
  } catch (error) {
    console.error("updateDevice:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update device",
    });
  }
};

// ========================================
// DELETE DEVICE
// ========================================

export const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    await device.destroy();

    res.json({
      success: true,
      message: "Device deleted successfully",
    });
  } catch (error) {
    console.error("deleteDevice:", error);

    res.status(409).json({
      success: false,
      message: "Device cannot be deleted because it is still in use",
    });
  }
};
