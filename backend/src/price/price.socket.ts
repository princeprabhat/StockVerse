import priceEngine from "./price.engine.js";

let intervalId: any = null;
const startEmitter = () => {
  if (intervalId) return;

  intervalId = setInterval(() => {}, 5000);
};

const stopEmitter = () => {
  if (!intervalId) return;

  clearInterval(intervalId);
  intervalId = null;
};

export { startEmitter, stopEmitter };
