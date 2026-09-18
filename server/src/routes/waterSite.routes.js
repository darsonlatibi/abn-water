import express from "express";

import {
  getWaterSites,
  getWaterSiteById,
  createWaterSite,
  updateWaterSite,
  deleteWaterSite,
} from "../controllers/waterSite.controller.js";

const router = express.Router();

// GET    /api/water-sites
router.get("/", getWaterSites);

// GET    /api/water-sites/:id
router.get("/:id", getWaterSiteById);

// POST   /api/water-sites
router.post("/", createWaterSite);

// PUT    /api/water-sites/:id
router.put("/:id", updateWaterSite);

// DELETE /api/water-sites/:id
router.delete("/:id", deleteWaterSite);

export default router;
