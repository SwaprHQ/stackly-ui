const getZeroDecimalsCount = (value: number | string) => {
  if (!value.toString().includes(".")) return 0;

  const firstDecimalZeroIndex = value
    .toString()
    .split(".")[1]
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

  const nonRelevantZeroes = getZeroDecimalsCount(value);
  const relevantZeroDecimals = new Array(decimals - 1).fill(0).join("");

  const formattedValue =
    nonRelevantZeroes >= decimals
      ? `< 0.${relevantZeroDecimals}1`
      : Number(value).toFixed(decimals);

  return formattedValue;
};
