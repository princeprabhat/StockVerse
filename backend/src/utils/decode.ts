import jwt from "jsonwebtoken";
import "dotenv/config";
import ApiError from "./ApiError.js";
import httpStatus from "http-status";
import { AuthPayload } from "../types/auth.js";

const decodeToken = (token: string): AuthPayload => {
  const jwtSecret: string = String(process.env.JWT_SECRET);
  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthPayload;
    return decoded;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid token... ${error.message}`
    );
  }
};

export { decodeToken };
