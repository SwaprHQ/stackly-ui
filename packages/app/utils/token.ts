const getZeroDecimalsCount = (value: string) => {
  if (!value) return 0;

  const firstDecimalZeroIndex = value
    .split("")
    .findIndex((digit: string) => digit >= "1");

  return firstDecimalZeroIndex === -1 ? 0 : firstDecimalZeroIndex;
};

export const addressShortner = (address: string) =>
  address.slice(0, 4) + "..." + address.slice(-4);

export const formatTokenValue = (
  value: number | string,
  decimals: number = 4
) => {
  if (value === 0) return value.toFixed(2);

  const [wholePart, decimalPart] = value.toString().split(".");

  const relevantZeroDecimalCount = getZeroDecimalsCount(decimalPart);
  const relevantZeroDecimals = new Array(decimals - 1).fill(0).join("");

  const formattedValue =
    relevantZeroDecimalCount >= decimals && wholePart < "1"
      ? `< 0.${relevantZeroDecimals}1`
      : Number(value).toFixed(decimals);

  return formattedValue;
};
