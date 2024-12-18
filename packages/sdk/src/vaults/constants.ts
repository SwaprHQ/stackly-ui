import { AddressZero } from "@ethersproject/constants";
import { ChainId } from "../constants";

export const MAINNET_ORDER_FACTORY_ADDRESS =
  "0x8b1a70feccc6c2ae6017ddd8d0bebdd1bd6eb261";

export const GNOSIS_ORDER_FACTORY_ADDRESS =
  "0x45B91Da2834010751b17F1eadE0a5a7B64233add";

export const ARBITRUM_ORDER_FACTORY_ADDRESS =
  "0xf4cd605e5fef8618ac450e84b7e912c870927922";

export const BASE_ORDER_FACTORY_ADDRESS =
  "0xf4cd605e5fef8618ac450e84b7e912c870927922";

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
  [ChainId.ARBITRUM]: ARBITRUM_ORDER_FACTORY_ADDRESS,
  [ChainId.BASE]: BASE_ORDER_FACTORY_ADDRESS,
};

/**
 * Stackly's DCA Order singleton/mastercopy address list
 */
export const DCAORDER_SINGLETON_ADDRESS_LIST: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "0xc97ecbdba20c672c61e27bd657d4dfbd2328f6fa",
  [ChainId.GNOSIS]: "0xFc41E4DCBab781092a32E8487cFB7444F9e0e403",
  [ChainId.ARBITRUM]: "0x810f9f1384421b6d185f46253e36f3a558e57369",
  [ChainId.BASE]: "0x810f9f1384421b6d185f46253e36f3a558e57369",
};

/**
 * CoW's settlement address list
 * @see https://docs.cow.fi/smart-contracts/introduction
 * to check CoW contracts addresses
 */

// GPv2Settlement
const COW_SETTLEMENT_ADDRESS = "0x9008D19f58AAbD9eD0D60971565AA8510560ab41";

export const COW_SETTLEMENT_ADDRESS_LIST: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: COW_SETTLEMENT_ADDRESS,
  [ChainId.GNOSIS]: COW_SETTLEMENT_ADDRESS,
  [ChainId.ARBITRUM]: COW_SETTLEMENT_ADDRESS,
  [ChainId.BASE]: COW_SETTLEMENT_ADDRESS,
};

const API_BASE_URL = "https://gateway-arbitrum.network.thegraph.com/api";

const SUBGRAPH_API_KEY =
  process.env.STACKLY_SUBGRAPH_API_KEY ?? "e7b7ff845e506590498946cd6bf83bf6";
const ETHEREUM_SUBGRAPH_ENDPOINT_URL =
  process.env.ETHEREUM_SUBGRAPH_API_URL ??
  `${API_BASE_URL}/${SUBGRAPH_API_KEY}/subgraphs/id/35bL4ohk2tnXqDnrp7NSyAKW8bbUmGDapyfe2ddCxV8H`;

const GNOSIS_SUBGRAPH_ENDPOINT_URL =
  process.env.GNOSIS_SUBGRAPH_API_URL ??
  `${API_BASE_URL}/${SUBGRAPH_API_KEY}/subgraphs/id/72Lysd4A2kZFqMqJtPQk3zMEEBExFfXeZbkJGTx8phRL`;

const ARBITRUM_SUBGRAPH_ENDPOINT_URL =
  process.env.ARBITRUM_SUBGRAPH_API_URL ??
  `${API_BASE_URL}/${SUBGRAPH_API_KEY}/subgraphs/id/FNmemHB6tUh7eHmJnBFKYFf27U5GUAzXnatry4ZbrF7f`;

const BASE_SUBGRAPH_ENDPOINT_URL =
  process.env.BASE_SUBGRAPH_API_URL ??
  `${API_BASE_URL}/${SUBGRAPH_API_KEY}/subgraphs/id/7WUXPez9b9DMfJriVPS3yttxA6xLRwq73duq15jXaVi7`;

export const SUBGRAPH_ENDPOINT_LIST: Readonly<Record<string, string>> = {
  [ChainId.ETHEREUM]: ETHEREUM_SUBGRAPH_ENDPOINT_URL,
  [ChainId.GNOSIS]: GNOSIS_SUBGRAPH_ENDPOINT_URL,
  [ChainId.ARBITRUM]: ARBITRUM_SUBGRAPH_ENDPOINT_URL,
  [ChainId.BASE]: BASE_SUBGRAPH_ENDPOINT_URL,
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
