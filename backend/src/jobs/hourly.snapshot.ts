import nodeCron from "node-cron";
import { priceMap } from "../price/price.store.js";
import { prisma } from "../config/db.js";

const saveHourlySnapshot = async () => {
  for (let data of Object.values(priceMap)) {
    // TODO:Save snapshot every-hour from priceMap to stockPrice.
  }
};

nodeCron.schedule("0 10-20 * * *", saveHourlySnapshot);
