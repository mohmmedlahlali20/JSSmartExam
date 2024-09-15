import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jssmartexam",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

const checkConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

checkConnection();

export default db;
