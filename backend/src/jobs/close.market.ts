import nodeCron from "node-cron";

import { stopEmitter } from "../price/price.socket.js";
import { prisma } from "../config/db.js";
import { priceMap } from "../price/price.store.js";
import { getIO } from "../socket.js";

const io = getIO();

async function closeMarket() {
  console.log("Market close now...");
  stopEmitter();
  await saveLastPriceSnap();
  io.emit("market:closed", priceMap);
}

const saveLastPriceSnap = async () => {
  for (let [symbol, data] of Object.entries(priceMap)) {
    await prisma.stockPrice.create({
      data: {
        stockId: data.stockId,
        currentPrice: data.currentPrice,
        closingPrice: data.currentPrice,
        high: data.high,
        low: data.low,
        openPrice: data.openingPrice,
      },
    });
    // Save closingPrice in PriceMap once market is closed
    data.closingPrice = data.currentPrice;
  }
};

nodeCron.schedule("0 21 * * *", closeMarket);
