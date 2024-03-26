import { AddressZero } from "@ethersproject/constants";
import { ChainId } from "../constants";

export const GNOSIS_ORDER_FACTORY_ADDRESS =
  "0x45B91Da2834010751b17F1eadE0a5a7B64233add";

export const MAINNET_ORDER_FACTORY_ADDRESS =
  "0x8b1a70feccc6c2ae6017ddd8d0bebdd1bd6eb261";

const validateVaultInfo = (
  chainId: ChainId,
  map: Record<ChainId, string> | Readonly<Record<string, string>>,
  mapName: string
) => {
  const address = map[chainId];
  if (!address || address === AddressZero) {
    throw new Error(`${mapName} is not deployed on chain ${chainId}`);
  }

  return address;
};

/**
 * Stackly's Order factory address list
 */
export const ORDER_FACTORY_ADDRESS_LIST: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: MAINNET_ORDER_FACTORY_ADDRESS,
  [ChainId.GNOSIS]: GNOSIS_ORDER_FACTORY_ADDRESS,
};

/**
 * Stackly's DCA Order singleton/mastercopy address list
 */
export const DCAORDER_SINGLETON_ADDRESS_LIST: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "0xc97ecbdba20c672c61e27bd657d4dfbd2328f6fa",
  [ChainId.GNOSIS]: "0xC38EE432Ce1ba198041e736F334ef472A56946A9",
};

/**
 * CoW's settlement address list
 * @see https://docs.cow.fi/smart-contracts/introduction
 * to check CoW contracts addresses
 */
export const COW_SETTLEMENT_ADDRESS_LIST: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  [ChainId.GNOSIS]: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
};

export const SUBGRAPH_ENDPOINT_LIST: Readonly<Record<string, string>> = {
  [ChainId.ETHEREUM]:
    "https://api.thegraph.com/subgraphs/name/swaprhq/stackly-ethereum",
  [ChainId.GNOSIS]: "https://api.thegraph.com/subgraphs/name/swaprhq/stackly",
};

/**
 * Returns the address of the order factory for a given chain id
 * @param chainId The chain id
 * @returns
 */
export function getOrderFactoryAddress(chainId: ChainId): string {
  return validateVaultInfo(
    chainId,
    ORDER_FACTORY_ADDRESS_LIST,
    "Order factory"
  );
}

/**
 * Gets the address of the order singleton for a given chain id
 * @param chainId The chain id
 * @returns
 */
export function getDCAOrderSingletonAddress(chainId: ChainId): string {
  return validateVaultInfo(
    chainId,
    DCAORDER_SINGLETON_ADDRESS_LIST,
    "DCAOrder singleton"
  );
}

/**
 * Gets the address of the settlement contract for a given chain id
 * @param chainId The chain id
 * @returns The address of the settlement contract
 */
export function getCOWProtocolSettlementAddress(chainId: ChainId): string {
  return validateVaultInfo(
    chainId,
    COW_SETTLEMENT_ADDRESS_LIST,
    "CoW Settlement"
  );
}

/**
 * Get the subgraph endpoint for a chainId
 * @param chainId - Chain ID
 * @returns Subgraph endpoint
 * @throws Error if no subgraph endpoint is found for the chainId
 */
export function getSubgraphEndpoint(chainId: ChainId) {
  return validateVaultInfo(chainId, SUBGRAPH_ENDPOINT_LIST, "Subraph Endpoint");
}

/**
 * DCA Frequency interval. How often the order will be placed.
 */
export enum DCAFrequencyInterval {
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}
