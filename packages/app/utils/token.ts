export const addressShortner = (address: string) =>
  address.slice(0, 4) + "..." + address.slice(-4);

export const formatTokenValue = (value: number, custom?: number) => {
  if (value === 0) return value.toFixed(2);

  return custom ? value.toFixed(custom) : value.toFixed(4);
};
