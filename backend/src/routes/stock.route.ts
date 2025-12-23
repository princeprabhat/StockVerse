import { Router } from "express";
import { getAllStock, getStockById } from "../controllers/stock.controller.js";
import authVerify from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { stockById } from "../validation/stock.validation.js";

const router = Router();

router.get("/", getAllStock);
router.get("/:stockId", validate(stockById), getStockById);

export default router;
