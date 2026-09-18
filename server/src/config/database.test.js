import db from "./database.js";

try {
  await db.authenticate();

  console.log("");
  console.log("========================================");
  console.log("       ABN WATER DATABASE");
  console.log("========================================");
  console.log("Database :", process.env.DB_NAME);
  console.log("Host     :", process.env.DB_HOST);
  console.log("Port     :", process.env.DB_PORT);
  console.log("Status   : CONNECTED");
  console.log("========================================");
  console.log("");

  await db.close();
} catch (error) {
  console.error("");
  console.error("❌ MySQL connection failed:");
  console.error(error.message);
  console.error("");

  process.exit(1);
}
