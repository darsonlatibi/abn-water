import db from "./index.js";

const { sequelize, User, WaterSite, Device, Sensor, SensorReading } = db;

console.log("");

console.log("========================================");
console.log("       ABN WATER MODEL ASSOCIATIONS");
console.log("========================================");

console.log("Models:");
console.log([
  User.name,
  WaterSite.name,
  Device.name,
  Sensor.name,
  SensorReading.name,
]);

console.log("");

console.log("WaterSite → Devices : hasMany");
console.log("Device → WaterSite   : belongsTo");

console.log("Device → Sensors     : hasMany");
console.log("Sensor → Device      : belongsTo");

console.log("Sensor → Readings    : hasMany");
console.log("Reading → Sensor     : belongsTo");

console.log("Device → Readings    : hasMany");
console.log("Reading → Device     : belongsTo");

console.log("");

console.log("Associations:");

console.log("WaterSite:", Object.keys(WaterSite.associations));
console.log("Device:", Object.keys(Device.associations));
console.log("Sensor:", Object.keys(Sensor.associations));
console.log("SensorReading:", Object.keys(SensorReading.associations));

console.log("");
console.log("========================================");
console.log("       ASSOCIATIONS READY");
console.log("========================================");
console.log("");

await sequelize.close();
