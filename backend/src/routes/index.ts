import express from "express";
import authRoute from "./auth.route.js";
import stockRoute from "./stock.route.js";
const router = express.Router();

router.use("/v1/auth", authRoute);
router.use("/v1/stocks", stockRoute);

export default router;
