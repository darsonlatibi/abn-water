import express from "express";

import {
  getSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
} from "../controllers/sensor.controller.js";

const router = express.Router();

router.get("/", getSensors);
router.get("/:id", getSensorById);
router.post("/", createSensor);
router.put("/:id", updateSensor);
router.delete("/:id", deleteSensor);

export default router;
