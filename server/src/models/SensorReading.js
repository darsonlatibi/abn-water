import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class SensorReading extends Model {}

SensorReading.init(
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

    value: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: true,
    },

    valueText: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    quality: {
      type: DataTypes.ENUM("good", "uncertain", "bad", "offline"),
      allowNull: false,
      defaultValue: "good",
    },

    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SensorReading",
    tableName: "sensor_readings",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        fields: ["sensor_id", "timestamp"],
      },
      {
        fields: ["device_id", "timestamp"],
      },
      {
        fields: ["timestamp"],
      },
      {
        fields: ["quality"],
      },
    ],
  },
);

export default SensorReading;
