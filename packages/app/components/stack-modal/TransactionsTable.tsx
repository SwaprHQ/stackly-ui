import { OrderProps, getOrderPairSymbols } from "@/models/order";
import {
  BodyText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import Link from "next/link";

export const TransactionsTable = ({ order }: OrderProps) => (
  <div className="border rounded-xl">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:table-cell">Transactions</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">
            {order.sellToken.symbol} spent
          </TableHead>
          <TableHead className="text-right">
            {order.buyToken.symbol} bought
          </TableHead>
          <TableHead className="hidden text-right md:table-cell">
            {getOrderPairSymbols(order)}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[30, 24, 13, 8, 1].map((index) => (
          <TableRow key={index}>
            <TableCell className="hidden md:table-cell">
              <div className="ml-3 space-y-0.5">
                <BodyText
                  size={1}
                  className="text-primary-700 hover:underline hover:underline-offset-2"
                >
                  <Link href={"#"}>0xc...c0b0</Link>
                </BodyText>
              </div>
            </TableCell>
            <TableCell className="md:text-right">
              <BodyText size={1}>{index} Apr 23, 2:00 PM</BodyText>
            </TableCell>
            <TableCell className="text-right">
              <BodyText size={1}>62.5</BodyText>
            </TableCell>
            <TableCell className="text-right">
              <BodyText size={1}>0.02975</BodyText>
            </TableCell>
            <TableCell className="hidden text-right md:table-cell">
              <BodyText size={1}>0.000476</BodyText>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
