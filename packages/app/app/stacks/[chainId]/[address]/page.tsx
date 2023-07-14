import { EmptyState } from "@/app/stacks/empty-state";
import { getOrders } from "@/models/order";
import { getStackOrders } from "@/models/stack-order";
import { StackOrders } from "@/app/stacks/stacks-orders";
import { isAddress } from "viem";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;

  const chainId = 100;

  if (!isAddress(address)) notFound();

  const orders = await getOrders(chainId, address);

  if (!orders) return <EmptyState />;
  const stackOrders = await getStackOrders(chainId, orders);

  return (
    <div className="space-y-8">
      <StackOrders stackOrders={stackOrders} />
    </div>
  );
}
