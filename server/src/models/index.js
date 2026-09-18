import sequelize from "../config/database.js";

import User from "./User.js";
import WaterSite from "./WaterSite.js";
import Device from "./Device.js";
import Sensor from "./Sensor.js";
import SensorReading from "./SensorReading.js";

// ========================================
// WATER SITE → DEVICE
// ========================================

WaterSite.hasMany(Device, {
  foreignKey: "waterSiteId",
  as: "devices",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Device.belongsTo(WaterSite, {
  foreignKey: "waterSiteId",
  as: "site",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

// ========================================
// DEVICE → SENSOR
// ========================================

Device.hasMany(Sensor, {
  foreignKey: "deviceId",
  as: "sensors",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Sensor.belongsTo(Device, {
  foreignKey: "deviceId",
  as: "device",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

// ========================================
// SENSOR → SENSOR READING
// ========================================

Sensor.hasMany(SensorReading, {
  foreignKey: "sensorId",
  as: "readings",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

SensorReading.belongsTo(Sensor, {
  foreignKey: "sensorId",
  as: "sensor",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

// ========================================
// DEVICE → SENSOR READING
// ========================================

Device.hasMany(SensorReading, {
  foreignKey: "deviceId",
  as: "readings",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

SensorReading.belongsTo(Device, {
  foreignKey: "deviceId",
  as: "device",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

// ========================================
// DATABASE REGISTRY
// ========================================

const db = {
  sequelize,
  User,
  WaterSite,
  Device,
  Sensor,
  SensorReading,
};

export default db;
