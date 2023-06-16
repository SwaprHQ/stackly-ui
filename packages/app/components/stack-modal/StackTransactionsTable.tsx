import { totalStacked } from "@/components/StacksTable";
import { transactionExplorerLink } from "@/components/stack-modal/StackModal";
import {
  OrderProps,
  getOrderPairSymbols,
  totalFundsUsed,
} from "@/models/order";
import {
  BodyText,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import { formatTimestampToDate } from "@/utils/datetime";
import Link from "next/link";

export const StackTransactionsTable = ({ order }: OrderProps) => (
  <div className="border border-surface-75 rounded-xl">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden py-1 md:table-cell">
            <BodyText size={1}>Transactions</BodyText>
          </TableHead>
          <TableHead>
            <BodyText size={1}>Time</BodyText>
          </TableHead>
          <TableHead className="py-1 text-right">
            <BodyText size={1}> {order.sellToken.symbol} spent</BodyText>
          </TableHead>
          <TableHead className="py-1 text-right">
            <BodyText size={1}>{order.buyToken.symbol} bought</BodyText>
          </TableHead>
          <TableHead className="hidden py-1 text-right md:table-cell">
            <BodyText size={1}>{getOrderPairSymbols(order)}</BodyText>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[30, 24, 13, 8, 1].map((index) => (
          <TableRow key={index}>
            <TableCell className="hidden py-2 md:table-cell">
              <BodyText
                size={1}
                className="text-primary-700 hover:underline hover:underline-offset-2"
              >
                <Link href={"#"}>0xc...c0b0</Link>
              </BodyText>
            </TableCell>
            <TableCell className="py-2">
              <BodyText className="text-em-med" size={1}>
                {formatTimestampToDate("1686746216")}
              </BodyText>
            </TableCell>
            <TableCell className="py-2 text-right ">
              <BodyText className="text-em-med" size={1}>
                62.5
              </BodyText>
            </TableCell>
            <TableCell className="py-2 text-right ">
              <BodyText className="text-em-med" size={1}>
                0.02975
              </BodyText>
            </TableCell>
            <TableCell className="hidden py-2 text-right md:table-cell">
              <BodyText className="text-em-med" size={1}>
                0.000476
              </BodyText>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="pb-2 mt-2">
        <Link
          href={transactionExplorerLink(order.id)}
          className="text-primary-700 hover:underline hover:underline-offset-2"
        >
          <BodyText weight="medium" size={1}>
            Check all transactions
          </BodyText>
        </Link>
      </TableCaption>
    </Table>
  </div>
);
