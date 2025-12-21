import { catchAsync } from "../utils/catchAsync.js";

const login = catchAsync(async (req, res) => {
  res.json({ message: "Welcome to login" });
});

const register = catchAsync(async (req, res) => {
  res.json({ message: "Welcome to register" });
});

const logout = catchAsync(async (req, res) => {
  res.json({ message: "Welcome to logout" });
});

export { login, logout, register };
