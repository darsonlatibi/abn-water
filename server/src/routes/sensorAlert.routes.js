import express from "express";

import {
  getSensorAlerts,
  getSensorAlertById,
  createSensorAlert,
  updateSensorAlertStatus,
  deleteSensorAlert,
} from "../controllers/sensorAlert.controller.js";

const router = express.Router();

router.get("/", getSensorAlerts);
router.get("/:id", getSensorAlertById);
router.post("/", createSensorAlert);
router.patch("/:id/status", updateSensorAlertStatus);
router.delete("/:id", deleteSensorAlert);

export default router;
