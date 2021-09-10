/* Imports */
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

/* Database and dotenv */
const fs = require("fs");
if (!fs.existsSync("./.env")) {
  throw new Error("Cannot locate .env file in the root directory.");
}
const db = require("./db/models");

/* Route Imports */
const testRoutes = require("./API/test/routes");
const userRoutes = require("./API/user/routes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

/* Routes */
app.use("/test", testRoutes);
app.use("/", userRoutes);
app.use("/media", express.static("media"));

/* Error Handling */
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Errror." });
});

/* Incorrect Path Handling */
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful");
    /* Listen @ port defined in .env */
    await app.listen(PORT, () => {
      console.log(`The application is running on localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error conencting to the database: ", error);
  }
};

run();
