import { COW_API_BASE_URL } from "@/models/cow-order/cow-order";

// how should we get chainId?
const chainId = 100;

const buildUrl = (address: string) =>
  `${COW_API_BASE_URL[chainId]}/account/${address}/orders/?limit=500`;

export async function getCowOrders(address: string) {
  try {
    const res = await fetch(buildUrl(address));
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.error("🐄 Cow API", error);
  }
}
