const mongoose = require("mongoose");

// Load environment variables from server/.env when this module is required
// This ensures tests that import services/mongo.js directly (without
// starting the full server) still get MONGO_URL from the .env file.
require("dotenv").config({ path: __dirname + "/../../.env" });

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined. Make sure your .env file exists and contains MONGO_URL.");
  }

  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
