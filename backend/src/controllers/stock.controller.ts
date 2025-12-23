import { prisma } from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";

const getAllStock = catchAsync(async (req, res) => {
  const stocks = await prisma.stock.findMany();
  res.status(httpStatus.OK).json({ stocks });
});

const getStockById = catchAsync(async (req, res) => {
  const { stockId } = req.params;
  const stock = await prisma.stock.findUnique({
    where: {
      id: stockId,
    },
    include: {
      prices: true,
    },
  });
  if (!stock) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `No Stock found for the id ${stockId}`
    );
  }
  res.status(httpStatus.OK).json({ stock });
});

export { getAllStock, getStockById };
