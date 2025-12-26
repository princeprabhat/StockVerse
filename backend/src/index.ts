import { Server } from "socket.io";
import http from "http";
import app from "./app.js";
import { connectDb, disconnectDb } from "./config/db.js";
import { config } from "dotenv";
import { initPriceMap } from "./price/price.store.js";
import "./jobs/open.market.js";
import "./jobs/close.market.js";
import { initSocket } from "./socket.js";

config();

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

initSocket(io);

const startServer = async () => {
  try {
    await connectDb();
    await initPriceMap();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the main server and connect db
startServer();

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDb();
  process.exit(1);
});

process.on("unhandledRejection", async (reason) => {
  console.error("Unhandled Rejection:", reason);
  await disconnectDb();
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down...");
  await disconnectDb();
  server.close(() => console.log("Server stopped"));
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down...");
  await disconnectDb();
  server.close(() => console.log("Server stopped"));
  process.exit(0);
});
