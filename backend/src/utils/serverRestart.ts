export const isMarketOpen = () => {
  const hour = new Date().getHours();
  return hour >= 9 && hour < 21;
};
