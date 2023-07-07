export interface Token {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
}

export interface TokenFromTokenlist {
  address: string;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  chainId?: number;
}
