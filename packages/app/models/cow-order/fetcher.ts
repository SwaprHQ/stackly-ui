import { COW_API_URL } from "@/models/cow-order/cow-order";
import { ChainId } from "@stackly/sdk";

const buildUrl = (chainId: ChainId, address: string) =>
  `${COW_API_URL[chainId]}/account/${address}/orders/?limit=500`;

export async function getCowOrders(chainId: ChainId, address: string) {
  try {
    const res = await fetch(buildUrl(chainId, address));
    if (!res.ok) throw "Failed to fetch cow data";
    return res.json();
  } catch (error) {
    console.error("🐄 Cow API", error);
  }
}
