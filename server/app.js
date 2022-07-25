const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
// const { expressjwt: jwt } = require("express-jwt");
const mysql = require("mysql");

const dbconfig = require("./dbconfig");
const db = mysql.createConnection(dbconfig);
const port = process.env.PORT || 3000;

const loginRoute = require("./routes/login-routes");
const orderRoute = require("./routes/order-routes");
const trackRoute = require("./routes/track-routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/login", loginRoute);
app.use("/api/order", orderRoute);
app.use("/api/track", trackRoute);

app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use((req, res, next) => {
  throw new HttpError("Could not find this route", 404);
});

db.connect((err) => {
  if (err) throw err;
});
console.log("Connected to MySQL...");

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
