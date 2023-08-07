import { COW_API_BASE_URL } from "@/models/cow-order/cow-order";

const buildUrl = (chainId: 1 | 100, address: string) =>
  `${COW_API_BASE_URL[chainId]}/account/${address}/orders/?limit=500`;

export async function getCowOrders(chainId: 1 | 100, address: string) {
  try {
    const res = await fetch(buildUrl(chainId, address));
    if (!res.ok) throw "Failed to fetch cow data";
    return res.json();
  } catch (error) {
    console.error("🐄 Cow API", error);
  }
}
