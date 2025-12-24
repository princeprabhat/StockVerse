import nodeCron from "node-cron";

function closeMarket() {
  console.log("Closing the Market Now...", new Date().getSeconds());
}
nodeCron.schedule("* * * * * *", closeMarket);
