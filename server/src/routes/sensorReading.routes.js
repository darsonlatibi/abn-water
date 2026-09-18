import express from "express";

import {
  getSensorReadings,
  getSensorReadingById,
  getReadingsBySensor,
  createSensorReading,
} from "../controllers/sensorReading.controller.js";

const router = express.Router();

// GET /api/sensor-readings
router.get("/", getSensorReadings);

// GET /api/sensor-readings/sensor/:sensorId
router.get("/sensor/:sensorId", getReadingsBySensor);

// GET /api/sensor-readings/:id
router.get("/:id", getSensorReadingById);

// POST /api/sensor-readings
router.post("/", createSensorReading);

export default router;
