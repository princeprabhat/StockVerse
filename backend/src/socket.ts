import { Server } from "socket.io";
import ApiError from "./utils/ApiError.js";
import httpStatus from "http-status";

let io: Server | null = null;

export const initSocket = (serverIo: Server) => {
  io = serverIo;
};

export const getIO = (): Server => {
  if (!io) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Socket.io not initialized"
    );
  }
  return io;
};
