import sequelize from "./database.js";
import "../models/index.js";

try {
  console.log("");
  console.log("========================================");
  console.log("       ABN WATER DATABASE SYNC");
  console.log("========================================");
  console.log("");

  await sequelize.authenticate();

  console.log("Database connection : OK");
  console.log("Database            :", process.env.DB_NAME);
  console.log("");

  await sequelize.sync();

  console.log("Database sync       : SUCCESS");
  console.log("");

  console.log("========================================");
  console.log("       DATABASE READY");
  console.log("========================================");
  console.log("");

  await sequelize.close();
} catch (error) {
  console.error("");
  console.error("❌ Database sync failed:");
  console.error(error.message);
  console.error("");

  await sequelize.close();
  process.exit(1);
}
