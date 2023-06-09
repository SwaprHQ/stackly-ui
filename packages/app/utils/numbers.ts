// we'll probably use viem/ethers function when we connect to data
export const convertedAmount = (amount: string | number, decimals: number) =>
  Number(amount) / 10 ** decimals;
