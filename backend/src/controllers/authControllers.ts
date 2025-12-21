import { prisma } from "../config/db.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { encodeToken } from "../utils/encode.js";
import ApiError from "../utils/ApiError.js";
import { comparePassword, hashPassword } from "../utils/password.js";

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });
  if (!user || !(await comparePassword(user.password, password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials");
  }

  const token = encodeToken({ userId: user.id, role: user.role });
  res.json({ message: "Login successfull", token });
  // TODO:Set token in cookies.
});

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already existed");
  }
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const token = encodeToken({ userId: user.id, role: user.role });
  res.status(httpStatus.CREATED).json({ user, token });
});

const logout = catchAsync(async (req, res) => {
  res.json({ message: "Welcome to logout" });
});

export { login, logout, register };
