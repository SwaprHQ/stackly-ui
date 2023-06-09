import { OrdersProgressText } from "@/app/stacks/components/OrdersProgressText";
import { CellWrapper } from "./CellWrapper";

import {
  BodyText,
  Button,
  CaptionText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import { useState } from "react";
import { StackedTokenLogoPair } from "@/app/stacks/components/StackedTokenLogoPair";
import { StackModal } from "@/app/stacks/components/stack-modal/StackModal";
import {
  Order,
  fundsUsedWithToken,
  getOrderPairSymbols,
  totalFundsUsed,
} from "@/app/models/order";
import { convertedAmount } from "@/utils/numbers";

const mockCowOrders = [
  {
    creationDate: "2023-06-01T17:47:21.439282Z",
    owner: "0x68b57d8b652aee685c6b8c387616911eca5ed883",
    uid: "0x86c95122ed312f02fa9904e8b9d5b19c70317eac0dc0a207bf4d4b36e6686f2668b57d8b652aee685c6b8c387616911eca5ed8836478e024",
    availableBalance: null,
    executedBuyAmount: "182201661599561308717",
    executedSellAmount: "13783979663205039289",
    executedSellAmountBeforeFees: "13783979663205039289",
    executedFeeAmount: "0",
    invalidated: false,
    status: "fulfilled",
    class: "limit",
    surplusFee: "4855798329137440",
    surplusFeeTimestamp: "2023-06-01T17:47:25.339953Z",
    executedSurplusFee: "4855798329137440",
    settlementContract: "0x9008d19f58aabd9ed0d60971565aa8510560ab41",
    fullFeeAmount: "4855798329137440",
    solverFee: "4855798329137440",
    isLiquidityOrder: false,
    sellToken: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
    buyToken: "0x177127622c4a00f3d409b75571e12cb3c8973d3c",
    receiver: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
    sellAmount: "13783979663205039289",
    buyAmount: "1",
    validTo: 1685643300,
    appData:
      "0x9b5c6dfa0fa4be89e17700f05bee8775b281aa6d2dac7dfbf3945e0f9642d777",
    feeAmount: "0",
    kind: "sell",
    partiallyFillable: false,
    sellTokenBalance: "erc20",
    buyTokenBalance: "erc20",
    signingScheme: "eip1271",
    signature:
      "0x000000000000000000000000e91d153e0b41518a2ce8dd3d7944fa863463a97d000000000000000000000000177127622c4a00f3d409b75571e12cb3c8973d3c00000000000000000000000005a4ed2367bd2f0aa63cc14897850be7474bc722000000000000000000000000000000000000000000000000bf4a8879188b7cb90000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000006478e0249b5c6dfa0fa4be89e17700f05bee8775b281aa6d2dac7dfbf3945e0f9642d7770000000000000000000000000000000000000000000000000000000000000000f3b277728b3fee749481eb3e0b3b48980dbbab78658fc419025cb16eee34677500000000000000000000000000000000000000000000000000000000000000005a28e9363bb942b639270062aa6bb295f434bcdfc42c97267bf003f272060dc95a28e9363bb942b639270062aa6bb295f434bcdfc42c97267bf003f272060dc9",
    interactions: {
      pre: [],
      post: [],
    },
  },
];

// mock function to be replaced
const getCowOrders = (order: Order) => mockCowOrders;

const calculateAveragePrice = (order: Order) => {
  let totalExecutedBuyAmount = 0;
  let totalExecutedSellAmount = 0;
  getCowOrders(order).forEach((cowOrder) => {
    if (cowOrder.executedBuyAmount === "0") return;

    totalExecutedBuyAmount += convertedAmount(
      cowOrder.executedBuyAmount,
      order.buyToken.decimals
    );
    totalExecutedSellAmount += convertedAmount(
      cowOrder.executedSellAmount,
      order.sellToken.decimals
    );
  });
  const averagePrice = totalExecutedSellAmount / totalExecutedBuyAmount;
  return averagePrice;
};

export const totalStacked = (order: Order) =>
  getCowOrders(order).reduce((acc, cowOrder) => {
    return (
      acc + convertedAmount(cowOrder.executedBuyAmount, order.buyToken.decimals)
    );
  }, 0);

export const StacksTable = ({ orders }: { orders: Order[] }) => {
  const [stackOrder, setStackOrder] = useState<Order>();

  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const setupAndOpenModal = (order: Order) => {
    setStackOrder(order);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-white border rounded-3xl border-surface-50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stack</TableHead>
            <TableHead className="text-right">Used funds</TableHead>
            <TableHead className="text-right">Avg. Buy Price</TableHead>
            <TableHead className="text-right">Progress</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="flex items-center font-medium">
                <StackedTokenLogoPair order={order} />
                <div className="ml-3 space-y-0.5">
                  <BodyText weight="bold">
                    {totalStacked(order).toFixed(3)}
                  </BodyText>
                  <CaptionText className="text-em-low">
                    {getOrderPairSymbols(order)}
                  </CaptionText>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <BodyText className="text-em-high">
                    {totalFundsUsed(order).toFixed(2)}
                  </BodyText>
                  <BodyText className="text-em-low">
                    / {fundsUsedWithToken(order)}
                  </BodyText>
                </CellWrapper>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <BodyText className="text-em-high">
                    {calculateAveragePrice(order).toFixed(3)}
                  </BodyText>
                  <BodyText className="text-em-low">
                    {getOrderPairSymbols(order)}
                  </BodyText>
                </CellWrapper>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <OrdersProgressText order={order} />
                </CellWrapper>
              </TableCell>
              <TableCell className="flex justify-end">
                <Button
                  className="w-max"
                  size="sm"
                  action="tertiary"
                  onClick={() => setupAndOpenModal(order)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {stackOrder && (
        <StackModal
          isOpen={isModalOpen}
          closeAction={closeModal}
          order={stackOrder}
        />
      )}
    </div>
  );
};
