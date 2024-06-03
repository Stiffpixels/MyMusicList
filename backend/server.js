const app = require("./app");
const connDB = require("./config/ConnMongodb.js");

const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to ucaught exception");
  process.exit(1);
});

if (process.env.NODE_ENV !== "Production") {
  dotenv.config({ path: "backend/config/config.env" });
} else {
  dotenv.config({ path: "../.env" });
}

const port = process.env.PORT || 8080;

const start = async () => {
  await connDB(process.env.MONGO_URI);
};
start();
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log("Error: ", err);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
module.exports = server;
