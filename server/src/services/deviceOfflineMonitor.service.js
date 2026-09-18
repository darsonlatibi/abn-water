import { Op } from "sequelize";
import db from "../models/index.js";
import { evaluateSensorAlert } from "./sensorAlert.service.js";

const { Device, Sensor } = db;

let monitorTimer = null;
let isRunning = false;

const getConfig = () => {
  const timeoutSec = Number(process.env.DEVICE_OFFLINE_TIMEOUT_SEC || 60);

  const checkIntervalSec = Number(
    process.env.DEVICE_OFFLINE_CHECK_INTERVAL_SEC || 10,
  );

  return {
    timeoutMs: timeoutSec * 1000,
    checkIntervalMs: checkIntervalSec * 1000,
    timeoutSec,
    checkIntervalSec,
  };
};

const checkDevices = async () => {
  if (isRunning) {
    return;
  }

  isRunning = true;

  try {
    const { timeoutMs, timeoutSec } = getConfig();

    const now = new Date();
    const offlineBefore = new Date(now.getTime() - timeoutMs);

    const devices = await Device.findAll({
      where: {
        status: "online",
        lastSeenAt: {
          [Op.ne]: null,
          [Op.lt]: offlineBefore,
        },
      },
      include: [
        {
          model: Sensor,
          as: "sensors",
        },
      ],
    });

    for (const device of devices) {
      await device.update({
        status: "offline",
      });

      console.log(
        `[DEVICE OFFLINE] ${device.code} - last seen ${device.lastSeenAt?.toISOString()} - timeout ${timeoutSec}s`,
      );

      for (const sensor of device.sensors || []) {
        try {
          await evaluateSensorAlert({
            sensor,
            deviceId: device.id,
            value: null,
            quality: "offline",
            timestamp: now,
            metadata: {
              source: "device-offline-monitor",
              lastSeenAt: device.lastSeenAt,
              timeoutSec,
            },
          });
        } catch (error) {
          console.error(
            `[DEVICE OFFLINE ALERT ERROR] ${device.code} / ${sensor.code}:`,
            error,
          );
        }
      }
    }
  } catch (error) {
    console.error("[DEVICE OFFLINE MONITOR ERROR]:", error);
  } finally {
    isRunning = false;
  }
};

export const startDeviceOfflineMonitor = () => {
  if (monitorTimer) {
    console.log("[DEVICE OFFLINE MONITOR] Already running");
    return;
  }

  const { checkIntervalMs, timeoutSec, checkIntervalSec } = getConfig();

  console.log(
    `[DEVICE OFFLINE MONITOR] Starting - timeout=${timeoutSec}s, interval=${checkIntervalSec}s`,
  );

  // Check immediately after server startup
  checkDevices();

  monitorTimer = setInterval(checkDevices, checkIntervalMs);
};

export const stopDeviceOfflineMonitor = () => {
  if (monitorTimer) {
    clearInterval(monitorTimer);
    monitorTimer = null;

    console.log("[DEVICE OFFLINE MONITOR] Stopped");
  }
};
