import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class SensorAlert extends Model {}

SensorAlert.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    sensorId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    deviceId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    alertType: {
      type: DataTypes.ENUM(
        "warning_low",
        "warning_high",
        "alarm_low",
        "alarm_high",
        "offline",
      ),
      allowNull: false,
    },

    severity: {
      type: DataTypes.ENUM("info", "warning", "alarm", "critical"),
      allowNull: false,
      defaultValue: "warning",
    },

    value: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: true,
    },

    threshold: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: true,
    },

    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "acknowledged", "resolved"),
      allowNull: false,
      defaultValue: "active",
    },

    triggeredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    acknowledgedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    resolvedAt: {
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
    modelName: "SensorAlert",
    tableName: "sensor_alerts",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        fields: ["sensor_id", "triggered_at"],
      },
      {
        fields: ["device_id", "triggered_at"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["severity"],
      },
      {
        fields: ["alert_type"],
      },
    ],
  },
);

export default SensorAlert;
