import express from "express";

import {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller.js";

const router = express.Router();

// GET    /api/devices
router.get("/", getDevices);

// GET    /api/devices/:id
router.get("/:id", getDeviceById);

// POST   /api/devices
router.post("/", createDevice);

// PUT    /api/devices/:id
router.put("/:id", updateDevice);

// DELETE /api/devices/:id
router.delete("/:id", deleteDevice);

export default router;
