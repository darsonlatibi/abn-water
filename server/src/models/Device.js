import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Device extends Model {}

Device.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    waterSiteId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        "esp8266",
        "esp32",
        "plc",
        "rtu",
        "gateway",
        "transmitter",
        "controller",
        "sensor",
        "other",
      ),
      allowNull: false,
      defaultValue: "other",
    },

    manufacturer: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    model: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    serialNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },

    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },

    macAddress: {
      type: DataTypes.STRING(17),
      allowNull: true,
      unique: true,
    },

    firmwareVersion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    protocol: {
      type: DataTypes.ENUM(
        "mqtt",
        "http",
        "https",
        "modbus_tcp",
        "modbus_rtu",
        "websocket",
        "other",
      ),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("online", "offline", "maintenance", "disabled"),
      allowNull: false,
      defaultValue: "offline",
    },

    lastSeenAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Device",
    tableName: "devices",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ["code"],
      },
      {
        unique: true,
        fields: ["serial_number"],
      },
      {
        unique: true,
        fields: ["mac_address"],
      },
      {
        fields: ["type"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["last_seen_at"],
      },
      {
        fields: ["water_site_id"],
      },
    ],
  },
);

export default Device;
