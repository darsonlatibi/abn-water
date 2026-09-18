import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import waterSiteRoutes from "./routes/waterSite.routes.js";
import deviceRoutes from "./routes/device.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";
import sensorReadingRoutes from "./routes/sensorReading.routes.js";
import sensorAlertRoutes from "./routes/sensorAlert.routes.js";
import { startDeviceOfflineMonitor } from "./services/deviceOfflineMonitor.service.js";

dotenv.config();

/* =========================================================
 * PATH
 * ========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WATER_DIST = path.resolve(__dirname, "../../client/dist");

/* =========================================================
 * APP CONFIG
 * ========================================================= */

const app = express();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

/* =========================================================
 * SECURITY
 * ========================================================= */

app.use(helmet());

/* =========================================================
 * CORS
 * ========================================================= */

const allowedOrigins = CLIENT_URL.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, ESP8266, server-to-server, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

/* =========================================================
 * BODY PARSER
 * ========================================================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================================================
 * LOGGER
 * ========================================================= */

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* =========================================================
 * HEALTH CHECK
 * ========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "ABN Water API",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
 * API ROUTES
 * ========================================================= */

app.use("/api/water-sites", waterSiteRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/sensor-readings", sensorReadingRoutes);
app.use("/api/sensor-alerts", sensorAlertRoutes);

/* =========================================================
 * STATIC REACT CLIENT
 * ========================================================= */

app.use(express.static(WATER_DIST));

/* =========================================================
 * SPA FALLBACK
 * ========================================================= */

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(path.join(WATER_DIST, "index.html"));
});

/* =========================================================
 * ERROR HANDLER
 * ========================================================= */

app.use((err, req, res, next) => {
  console.error("API ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/* =========================================================
 * START SERVER
 * ========================================================= */

const server = app.listen(PORT, HOST, () => {
  console.log("");
  console.log("========================================");
  console.log("       ABN WATER SERVER");
  console.log("========================================");
  console.log(`Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`Host        : ${HOST}`);
  console.log(`Port        : ${PORT}`);
  console.log(`Client URL  : ${CLIENT_URL}`);
  console.log(`React Dist  : ${WATER_DIST}`);
  console.log(`API         : http://localhost:${PORT}/api`);
  console.log(`Health      : http://localhost:${PORT}/api/health`);
  console.log(`Water Sites : http://localhost:${PORT}/api/water-sites`);
  console.log("========================================");
  console.log("");
  console.log("SERVER LISTENING:", server.listening);

  startDeviceOfflineMonitor();
});

/* =========================================================
 * SERVER EVENTS
 * ========================================================= */

server.on("error", (error) => {
  console.error("");
  console.error("SERVER ERROR:");
  console.error(error);
});

server.on("close", () => {
  console.log("");
  console.log("SERVER CLOSED");
});
