import { txEplorerLink } from "@/utils/transaction";
import { Icon } from "@/ui";
import { Transaction } from "@/models/stack";

export const TransactionLink = ({ hash }: Transaction) => (
  <a
    className="flex items-center text-primary-100 hover:underline hover:underline-offset-4"
    href={txEplorerLink(hash)}
    target="blank"
  >
    Check Transaction <Icon size={16} name="arrow-external" className="ml-1" />
  </a>
);
