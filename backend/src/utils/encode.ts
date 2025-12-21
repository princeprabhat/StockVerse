import jwt from "jsonwebtoken";
import "dotenv/config";

type Role = "Member" | "Admin";

interface JwtPayload {
  userId: string;
  role?: Role;
}

const encodeToken = (payload: JwtPayload): string => {
  const jwtSecret = process.env.JWT_SECRET!;

  if (!jwtSecret) {
    throw new Error("JWT SECRET is not defined");
  }

  return jwt.sign(payload, jwtSecret, {
    expiresIn: "5d",
  });
};

export { encodeToken };
