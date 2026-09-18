import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class WaterSite extends Model {}

WaterSite.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    province: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
    },

    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true,
    },

    timezone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Asia/Jakarta",
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "maintenance"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "WaterSite",
    tableName: "water_sites",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ["code"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["city"],
      },
    ],
  },
);

export default WaterSite;
