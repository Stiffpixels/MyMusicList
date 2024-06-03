import { app } from "./backend/app.js";
import serverless from "serverless-http";
import { connDB } from "./backend/config/ConnMongodb.js";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to ucaught exception");
  process.exit(1);
});

if (process.env.NODE_ENV !== "Production") {
  dotenv.config({ path: "backend/config/config.env" });
} else {
  dotenv.config({ path: "./.env" });
}

const start = async () => {
  await connDB(process.env.MONGO_URI);
};
start();

process.on("unhandledRejection", (err) => {
  console.log("Error: ", err);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

export const handler = serverless(app);
