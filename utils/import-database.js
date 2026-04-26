import connection from "./mysql.js";
import fs from "fs";

try {
  const sql = fs.readFileSync("./utils/instock.sql").toString();
  await connection.query(sql);
  console.log("Database imported");
} catch (error) {
  console.error(`Database import failed: ${error}`);
}

process.exit();
