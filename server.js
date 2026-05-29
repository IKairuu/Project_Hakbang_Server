import app from "./app.js";
import express from "express";
import { disconnect_database } from "./modules/config/database.config.js";

app.get("/ping", (req, res) => {
  let response = res.status(200).json({ message: "Connected to Server" });
  return response;
});
const port = process.env.PORT || 5050;
app.listen(port, function () {
  console.log(`Listening to http://localhost:${port}`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection: ", error);
  serverTimestamp.close(async () => {
    await disconnect_database();
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception: ", error);
  serverTimestamp.close(async () => {
    await disconnect_database();
    process.exit(1);
  });
});

process.on("SIGTERM", (error) => {
  console.error("Shutting down...", error);
  serverTimestamp.close(async () => {
    await disconnect_database();
    process.exit(0);
  });
});
