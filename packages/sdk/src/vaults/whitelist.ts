import { AddressZero } from "@ethersproject/constants";
import type { Provider } from "@ethersproject/abstract-provider";
import type { Signer } from "@ethersproject/abstract-signer";

import {
  StacklyWhitelist,
  StacklyWhitelist__factory,
} from "../generated/contracts";

/**
 *
 * @param address
 * @param provider
 * @returns
 */
export function getWhitelist(
  address: string,
  signerOrProvider: Provider | Signer
) {
  if (address === AddressZero) {
    throw new Error(`Zero address is not a valid order factory address`);
  }

  return StacklyWhitelist__factory.connect(address, signerOrProvider);
}

export function getWhitelistInterface() {
  return StacklyWhitelist__factory.createInterface();
}

/**
 * Mints an NFT to join whitelist
 * @param stacklyWhitelist The whitelist contract
 * @returns
 */
export async function nftWhitelistMint(stacklyWhitelist: StacklyWhitelist) {
  return await stacklyWhitelist.getBetaAccess();
}

/**
 * Returns the Whitelist NFT balance
 * @param stacklyWhitelist The whitelist contract
 * @param address Address to get the balance from
 * @returns
 */
export async function nftWhitelistBalanceOf(
  stacklyWhitelist: StacklyWhitelist,
  address: string
) {
  return await stacklyWhitelist.balanceOf(address);
}

/**
 * Returns the Whitelist NFT balance
 * @param stacklyWhitelist The whitelist contract
 * @param address Address to get the balance from
 * @returns
 */
export async function nftWhitelistTotalSupply(
  stacklyWhitelist: StacklyWhitelist
) {
  return await stacklyWhitelist.totalSupply();
}

/**
 * Returns the Whitelist NFT balance
 * @param stacklyWhitelist The whitelist contract
 * @param address Address to get the balance from
 * @returns
 */
export async function nftWhitelistMaxSupply(
  stacklyWhitelist: StacklyWhitelist
) {
  return await stacklyWhitelist.maxSupply();
}
