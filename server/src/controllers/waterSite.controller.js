import { Op } from "sequelize";
import db from "../models/index.js";

const { WaterSite, Device, Sensor } = db;

// ========================================
// GET ALL WATER SITES
// ========================================

export const getWaterSites = async (req, res) => {
  try {
    const sites = await WaterSite.findAll({
      include: [
        {
          model: Device,
          as: "devices",
          include: [
            {
              model: Sensor,
              as: "sensors",
            },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json({
      success: true,
      data: sites,
    });
  } catch (error) {
    console.error("getWaterSites:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve water sites",
    });
  }
};

// ========================================
// GET WATER SITE BY ID
// ========================================

export const getWaterSiteById = async (req, res) => {
  try {
    const site = await WaterSite.findByPk(req.params.id, {
      include: [
        {
          model: Device,
          as: "devices",
          include: [
            {
              model: Sensor,
              as: "sensors",
            },
          ],
        },
      ],
    });

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Water site not found",
      });
    }

    res.json({
      success: true,
      data: site,
    });
  } catch (error) {
    console.error("getWaterSiteById:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve water site",
    });
  }
};

// ========================================
// CREATE WATER SITE
// ========================================

export const createWaterSite = async (req, res) => {
  try {
    const {
      code,
      name,
      description,
      address,
      city,
      province,
      latitude,
      longitude,
      timezone,
      status,
    } = req.body;

    if (!code || !name) {
      return res.status(400).json({
        success: false,
        message: "code and name are required",
      });
    }

    const existing = await WaterSite.findOne({
      where: {
        [Op.or]: [{ code }, { name }],
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Water site code or name already exists",
      });
    }

    const site = await WaterSite.create({
      code,
      name,
      description,
      address,
      city,
      province,
      latitude,
      longitude,
      timezone,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Water site created successfully",
      data: site,
    });
  } catch (error) {
    console.error("createWaterSite:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create water site",
    });
  }
};

// ========================================
// UPDATE WATER SITE
// ========================================

export const updateWaterSite = async (req, res) => {
  try {
    const site = await WaterSite.findByPk(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Water site not found",
      });
    }

    await site.update(req.body);

    res.json({
      success: true,
      message: "Water site updated successfully",
      data: site,
    });
  } catch (error) {
    console.error("updateWaterSite:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update water site",
    });
  }
};

// ========================================
// DELETE WATER SITE
// ========================================

export const deleteWaterSite = async (req, res) => {
  try {
    const site = await WaterSite.findByPk(req.params.id);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Water site not found",
      });
    }

    await site.destroy();

    res.json({
      success: true,
      message: "Water site deleted successfully",
    });
  } catch (error) {
    console.error("deleteWaterSite:", error);

    res.status(409).json({
      success: false,
      message: "Water site cannot be deleted because it is still in use",
    });
  }
};
