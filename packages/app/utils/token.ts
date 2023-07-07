export const addressShortner = (address: string) =>
  address.slice(0, 4) + "..." + address.slice(-4);
