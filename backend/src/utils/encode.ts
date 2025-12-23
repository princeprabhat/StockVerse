import jwt from "jsonwebtoken";
import "dotenv/config";
import { AuthPayload } from "../types/auth.js";

const encodeToken = (payload: AuthPayload): string => {
  const jwtSecret = process.env.JWT_SECRET!;

  if (!jwtSecret) {
    throw new Error("JWT SECRET is not defined");
  }

  return jwt.sign(payload, jwtSecret, {
    expiresIn: "5d",
  });
};

export { encodeToken };
