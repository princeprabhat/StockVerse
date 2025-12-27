import nodeCron from "node-cron";

import { startEmitter } from "../price/price.socket.js";
import { prisma } from "../config/db.js";
import { priceMap } from "../price/price.store.js";
import { getIO } from "../socket.js";

const io = getIO();

async function openMarket() {
  console.log("Market open now...");
  io.emit("market:open", "Market is live now...");
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
