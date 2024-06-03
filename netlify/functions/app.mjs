import app from "./backend/app";
import serverless from "serverless-http";

export const handler = serverless(app);
