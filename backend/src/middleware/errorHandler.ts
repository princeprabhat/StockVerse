import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
interface CustomError extends Error {
  status?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};

export default errorHandler;
