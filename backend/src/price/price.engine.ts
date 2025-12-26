import { Decimal } from "@prisma/client/runtime/client";
import { priceMap } from "./price.store.js";

function getRandomPrice(price: Decimal): Decimal {
  const selectedDirection = Math.random() > 0.5 ? "up" : "down";
  let newPrice = price;

  const change = 0.01 + (0.05 - 0.01) * Math.random();

  if (selectedDirection === "up") {
    // Increment the number by 1% to 5%
    newPrice = price.plus(price.mul(change));
  } else {
    // ecrement the number by 1% to 5%
    newPrice = price.minus(price.mul(change));
  }
  if (newPrice.lt(0)) return new Decimal(0);
  return newPrice;
}

const priceEngine = () => {
  for (let [symbol, data] of Object.entries(priceMap)) {
    const newPrice = getRandomPrice(data.currentPrice);
    data.currentPrice = newPrice;
    if (newPrice.gt(data.high)) {
      data.high = newPrice;
    }
    if (newPrice.lt(data.low)) {
      data.low = newPrice;
    }
  }
};

export default priceEngine;
