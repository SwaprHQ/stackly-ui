import { GraphQLClient } from "graphql-request";
import {
  getUserOrders,
  getSubgraphEndpoint,
  getUserActiveOrders,
  getUserCancelledOrders,
  getUserCompleteOrders,
  ChainId,
} from "@stackly/sdk";

export async function getOrders(chainId: ChainId, address: string) {
  try {
    const graphqlClient = new GraphQLClient(getSubgraphEndpoint(chainId));
    const orders = await getUserOrders(graphqlClient, address);

    if (!orders) throw "Failed to fetch subgraph data";

    return orders;
  } catch (e) {
    console.error(e);
  }
}

export async function getActiveOrders(
  chainId: ChainId,
  address: string,
  currentTimestamp: number,
  skip?: number,
  first?: number
) {
  try {
    const graphqlClient = new GraphQLClient(getSubgraphEndpoint(chainId));
    const orders = await getUserActiveOrders(
      graphqlClient,
      address,
      currentTimestamp,
      skip,
      first
    );

    if (!orders) throw "Failed to fetch active orders data from subgraph";

    return orders;
  } catch (e) {
    console.error(e);
  }
}

export async function getCompleteOrders(
  chainId: ChainId,
  address: string,
  currentTimestamp: number,
  skip?: number,
  first?: number
) {
  try {
    const graphqlClient = new GraphQLClient(getSubgraphEndpoint(chainId));
    const orders = await getUserCompleteOrders(
      graphqlClient,
      address,
      currentTimestamp,
      skip,
      first
    );

    if (!orders) throw "Failed to fetch active orders data from subgraph";

    return orders;
  } catch (e) {
    console.error(e);
  }
}

export async function getCancelledOrders(
  chainId: ChainId,
  address: string,
  currentTimestamp: number,
  skip?: number,
  first?: number
) {
  try {
    console.log("currentTimestamp:", currentTimestamp);
    const graphqlClient = new GraphQLClient(getSubgraphEndpoint(chainId));
    const orders = await getUserCancelledOrders(
      graphqlClient,
      address,
      skip,
      first
    );

    if (!orders) throw "Failed to fetch cancelled orders data from subgraph";

    return orders;
  } catch (e) {
    console.error(e);
  }
}
