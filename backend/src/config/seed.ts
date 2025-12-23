import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { stocks } from "./stockData.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
});

const seedStock = async () => {
  for (let stock of stocks) {
    console.log("Seeding stock: ", stock.symbol);
    try {
      await prisma.stock.create({
        data: {
          symbol: stock.symbol,
          name: stock.name,
          logoUrl: stock.logoUrl,
          exchange: stock.exchange,
          listingPrice: stock.listingPrice,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log(`⚠️  Skipped (already exists): ${stock.symbol}`);
      } else {
        console.error(`❌ Failed: ${stock.symbol}`, error);
      }
    }
  }
  console.log("Seeding Done...");
};

const seedStockPrice = async () => {
  const dbStocks = await prisma.stock.findMany();
  for (let stock of dbStocks) {
    const base = stock.listingPrice;

    const open = base;
    const current = base.plus(Math.random() * 5);
    const high = current.plus(Math.random() * 3);
    const low = base.minus(Math.random() * 2);
    const closing = low.plus(high.minus(low).mul(Math.random()));

    try {
      console.log("Seeding Price for stock: ", stock.symbol);
      await prisma.stockPrice.create({
        data: {
          stockId: stock.id,
          openPrice: open,
          closingPrice: closing,
          high,
          low,
          currentPrice: current,
        },
      });
    } catch (error: any) {
      console.error(`Failed to seed Price for stock: ${stock.symbol}`, error);
    }
  }
  console.log("Seeding Done for price table...");
};

seedStockPrice()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
