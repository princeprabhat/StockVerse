import { Decimal } from "@prisma/client/runtime/client";
import { prisma } from "../config/db.js";

interface priceType {
  symbol: string;
  currentPrice: Decimal;
  high: Decimal;
  low: Decimal;
  closingPrice?: Decimal | null;
  openingPrice: Decimal;
  stockId: string;
}

export const priceMap: Record<string, priceType> = {};

const getStockPrice = async () => {
  const stockPrice = await prisma.stock.findMany({
    select: {
      id: true,
      symbol: true,
      prices: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
  });

  for (let stock of stockPrice) {
    if (!stock.prices.length) continue;

    let price = stock.prices[0];

    priceMap[stock.symbol] = {
      symbol: stock.symbol,
      currentPrice: price.currentPrice,
      high: price.high,
      low: price.low,
      closingPrice: null,
      openingPrice: price.openPrice,
      stockId: stock.id,
    };
  }
};

getStockPrice();
