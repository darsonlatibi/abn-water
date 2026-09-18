import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Sensor extends Model {}

Sensor.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        "ph",
        "tds",
        "conductivity",
        "flow",
        "pressure",
        "level",
        "temperature",
        "turbidity",
        "orp",
        "chlorine",
        "voltage",
        "current",
        "power",
        "other",
      ),
      allowNull: false,
      defaultValue: "other",
    },

    unit: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    dataType: {
      type: DataTypes.ENUM("integer", "float", "boolean", "string"),
      allowNull: false,
      defaultValue: "float",
    },

    minValue: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    maxValue: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    warningLow: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    warningHigh: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    alarmLow: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    alarmHigh: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },

    lastValue: {
      type: DataTypes.DECIMAL(15, 5),
      allowNull: true,
    },

    lastValueAt: {
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
    modelName: "Sensor",
    tableName: "sensors",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ["code"],
      },
      {
        fields: ["type"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["last_value_at"],
      },
      {
        fields: ["device_id"],
      },
    ],
  },
);

export default Sensor;
