import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { registerUser, loginUser } from "../validation/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerUser), register);

router.post("/login", validate(loginUser), login);

router.post("/logout", logout);

export default router;
