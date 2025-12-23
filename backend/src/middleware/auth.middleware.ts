import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { decodeToken } from "../utils/decode.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AuthPayload } from "../types/auth.js";

const authVerify = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Token is missing...");
    }
    const payload: AuthPayload = decodeToken(token);
    req.user = payload;

    next();
  }
);

export default authVerify;
