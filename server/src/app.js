import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import waterSiteRoutes from "./routes/waterSite.routes.js";
import deviceRoutes from "./routes/device.routes.js";
import sensorRoutes from "./routes/sensor.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// ========================================
// SECURITY
// ========================================

app.use(helmet());

// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

// ========================================
// BODY PARSER
// ========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ========================================
// LOGGER
// ========================================

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "ABN Water API",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

// ========================================
// ROOT
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ABN Water API",
    version: "1.0.0",
  });
});

// ========================================
// API ROUTES
// ========================================

app.use("/api/water-sites", waterSiteRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/sensors", sensorRoutes);

// ========================================
// 404
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// ========================================
// ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {
  console.error("API ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ========================================
// START SERVER
// ========================================

const server = app.listen(PORT, HOST, () => {
  console.log("");
  console.log("========================================");
  console.log("       ABN WATER API SERVER");
  console.log("========================================");
  console.log(`Environment : ${process.env.NODE_ENV || "development"}`);
  console.log(`Host        : ${HOST}`);
  console.log(`Port        : ${PORT}`);
  console.log(`Client URL  : ${CLIENT_URL}`);
  console.log(`API         : http://localhost:${PORT}`);
  console.log(`Health      : http://localhost:${PORT}/api/health`);
  console.log(`Water Sites : http://localhost:${PORT}/api/water-sites`);
  console.log("========================================");
  console.log("");
  console.log("SERVER LISTENING:", server.listening);
});

server.on("error", (error) => {
  console.error("");
  console.error("SERVER ERROR:");
  console.error(error);
});

server.on("close", () => {
  console.log("");
  console.log("SERVER CLOSED");
});
