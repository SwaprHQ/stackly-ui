import { TokenSubgraph } from "@stackly/sdk";

type TokenWithoutIdAndAddress = Omit<TokenSubgraph, "id" | "address">;

interface TokenWithAddress extends TokenWithoutIdAndAddress {
  address: string;
}

interface TokenWithId extends TokenWithoutIdAndAddress {
  address: string;
}

type TokenWithAddressAndId = TokenWithAddress & TokenWithId;

export type Token = TokenWithAddress | TokenWithId | TokenWithAddressAndId;

export interface TokenFromTokenlist {
  address: string;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  chainId: number;
}
