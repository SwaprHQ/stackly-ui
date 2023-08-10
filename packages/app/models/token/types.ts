import { TokenSubgraph } from "@stackly/sdk";

export type Token = TokenSubgraph | Omit<TokenSubgraph, "id">;

export interface TokenFromTokenlist {
  address: string;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  chainId: number;
}
