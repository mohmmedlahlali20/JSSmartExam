require("dotenv").config();
const express = require("express");
const path = require("path");
const Database = require("./config/db.config");
const indexRouter = require("./routes/index");
const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const db = new Database({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jssmartexam",
});

db.connect();

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
