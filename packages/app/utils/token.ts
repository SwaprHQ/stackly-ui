export const addressShortner = (address: string) =>
  address.slice(0, 4) + "..." + address.slice(-4);

export const formatTokenValue = (
  value: number | string,
  decimals: number = 4
) => {
  if (value === 0) return value.toFixed(2);

  const relevantZeroDecimals = new Array(decimals - 1).fill(0).join("");

  const formattedValue =
    value < `0.${relevantZeroDecimals}1`
      ? `< 0.${relevantZeroDecimals}1`
      : Number(value).toFixed(decimals);

  return formattedValue;
};
