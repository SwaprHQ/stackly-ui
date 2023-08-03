import { GraphQLClient } from "graphql-request";
import { filterAllButCancelledOrders } from "@/models/order/filters";
import { getUserOrders, getSubgraphEndpoint, ChainId } from "@stackly/sdk";

export async function getOrders(chainId: ChainId, address: string) {
  try {
    const graphqlClient = new GraphQLClient(getSubgraphEndpoint(chainId));
    const orders = await getUserOrders(graphqlClient, address);

    if (!orders) throw "Failed to fetch subgraph data";

    return filterAllButCancelledOrders(orders);
  } catch (e) {
    console.error(e);
  }
}
