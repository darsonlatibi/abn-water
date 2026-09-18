import bcrypt from "bcryptjs";

import sequelize from "../config/database.js";
import db from "../models/index.js";

const { User, WaterSite, Device, Sensor, SensorReading } = db;

try {
  console.log("");
  console.log("========================================");
  console.log("       ABN WATER DEVELOPMENT SEED");
  console.log("========================================");
  console.log("");

  // ========================================
  // DATABASE
  // ========================================

  await sequelize.authenticate();

  console.log("Database connection : OK");
  console.log("");

  // ========================================
  // 1. USER
  // ========================================

  const passwordHash = await bcrypt.hash("admin123", 10);

  const [admin] = await User.findOrCreate({
    where: {
      email: "admin@abn.web.id",
    },
    defaults: {
      name: "ABN Administrator",
      email: "admin@abn.web.id",
      password: passwordHash,
      role: "admin",
      status: "active",
    },
  });

  console.log("User created        :", admin.email);

  // ========================================
  // 2. WATER SITE
  // ========================================

  const [site] = await WaterSite.findOrCreate({
    where: {
      code: "RO-BARATA",
    },
    defaults: {
      code: "RO-BARATA",
      name: "RO Barata",
      description: "ABN Water demonstration site",
      address: "RO Barata",
      city: "Surabaya",
      province: "Jawa Timur",
      timezone: "Asia/Jakarta",
      status: "active",
    },
  });

  console.log("Water Site          :", site.code);

  // ========================================
  // 3. DEVICE
  // ========================================

  const [device] = await Device.findOrCreate({
    where: {
      code: "ABN-WATER-ESP8266-001",
    },
    defaults: {
      waterSiteId: site.id,
      code: "ABN-WATER-ESP8266-001",
      name: "ABN Water ESP8266 Gateway 001",
      type: "esp8266",
      manufacturer: "ABN",
      model: "ESP8266",
      serialNumber: "ABN-WTR-ESP-001",
      protocol: "http",
      status: "offline",
      metadata: {
        environment: "development",
        purpose: "water-monitoring",
      },
    },
  });

  console.log("Device              :", device.code);

  // ========================================
  // 4. SENSORS
  // ========================================

  const sensorDefinitions = [
    {
      code: "PH-001",
      name: "pH Sensor 001",
      type: "ph",
      unit: "pH",
      dataType: "float",
      minValue: 0,
      maxValue: 14,
      warningLow: 6.5,
      warningHigh: 8.5,
      alarmLow: 6.0,
      alarmHigh: 9.0,
    },
    {
      code: "FLOW-001",
      name: "Flow Sensor 001",
      type: "flow",
      unit: "L/min",
      dataType: "float",
      minValue: 0,
      maxValue: 1000,
      warningLow: 50,
      warningHigh: 800,
      alarmLow: 20,
      alarmHigh: 900,
    },
    {
      code: "PRESSURE-001",
      name: "Pressure Sensor 001",
      type: "pressure",
      unit: "bar",
      dataType: "float",
      minValue: 0,
      maxValue: 10,
      warningLow: 1,
      warningHigh: 6,
      alarmLow: 0.5,
      alarmHigh: 8,
    },
    {
      code: "LEVEL-001",
      name: "Tank Level Sensor 001",
      type: "level",
      unit: "%",
      dataType: "float",
      minValue: 0,
      maxValue: 100,
      warningLow: 20,
      warningHigh: 90,
      alarmLow: 10,
      alarmHigh: 95,
    },
  ];

  const sensors = [];

  for (const definition of sensorDefinitions) {
    const [sensor] = await Sensor.findOrCreate({
      where: {
        code: definition.code,
      },
      defaults: {
        deviceId: device.id,
        ...definition,
        status: "active",
      },
    });

    sensors.push(sensor);

    console.log("Sensor              :", sensor.code);
  }

  // ========================================
  // 5. SENSOR READINGS
  // ========================================

  const readingValues = {
    "PH-001": 7.12,
    "FLOW-001": 125.4,
    "PRESSURE-001": 2.35,
    "LEVEL-001": 78.5,
  };

  for (const sensor of sensors) {
    const value = readingValues[sensor.code];

    await SensorReading.create({
      sensorId: sensor.id,
      deviceId: device.id,
      value,
      quality: "good",
      timestamp: new Date(),
      metadata: {
        source: "seed",
        environment: "development",
      },
    });

    await sensor.update({
      lastValue: value,
      lastValueAt: new Date(),
    });
  }

  console.log("");
  console.log("Sensor readings     : CREATED");
  console.log("");

  // ========================================
  // SUMMARY
  // ========================================

  console.log("========================================");
  console.log("       SEED COMPLETED");
  console.log("========================================");
  console.log("");
  console.log("Admin email         : admin@abn.web.id");
  console.log("Admin password      : admin123");
  console.log("Water Site          :", site.code);
  console.log("Device              :", device.code);
  console.log("Sensors             :", sensors.length);
  console.log("");

  await sequelize.close();
} catch (error) {
  console.error("");
  console.error("❌ Seed failed:");
  console.error(error);
  console.error("");

  await sequelize.close();
  process.exit(1);
}
