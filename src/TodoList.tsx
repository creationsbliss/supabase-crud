import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete03Icon as DeleteIcon,
  PencilEdit02Icon as EditIcon,
} from "@hugeicons/core-free-icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    paymentMethod: "Bank Transfer",
  },
];

const TodoList = () => {
  return (
    <div className="pt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Todo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button variant="outline">
                  <HugeiconsIcon icon={EditIcon} />
                </Button>
                <Button variant="destructive">
                  <HugeiconsIcon icon={DeleteIcon} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
