import { getIO } from "../socket.js";
import priceEngine from "./price.engine.js";
import { priceMap } from "./price.store.js";

let intervalId: any = null;

const startEmitter = () => {
  if (intervalId) return;
  const io = getIO();

  intervalId = setInterval(() => {
    // Call the PriceEngine --> Runs every 5 seconds and change the Price
    priceEngine(); // --> priceMap reference has been updated now.

    // Emit the update price to the frontend
    io.emit("price:update", priceMap);
  }, 5000);
};

const stopEmitter = () => {
  if (!intervalId) return;

  clearInterval(intervalId);
  intervalId = null;
};

export { startEmitter, stopEmitter };
