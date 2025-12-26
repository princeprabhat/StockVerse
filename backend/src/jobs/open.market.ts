import nodeCron from "node-cron";

import { startEmitter } from "../price/price.socket.js";
import { prisma } from "../config/db.js";
import { priceMap } from "../price/price.store.js";

async function openMarket() {
  console.log("Market open now...");
  await loadFirstPriceSnap();
  startEmitter();
}

const loadFirstPriceSnap = async () => {
  const stockData = await prisma.stock.findMany({
    select: {
      id: true,
      symbol: true,
      prices: {
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
  });

  for (let stock of stockData) {
    if (!stock.prices.length) continue;
    let price = stock.prices[0];

    priceMap[stock.symbol] = {
      symbol: stock.symbol,
      currentPrice: price.currentPrice,
      high: price.currentPrice,
      low: price.currentPrice,
      closingPrice: null,
      openingPrice: price.closingPrice ?? price.currentPrice,
      stockId: stock.id,
    };
  }
};

nodeCron.schedule("0 9 * * *", openMarket);
