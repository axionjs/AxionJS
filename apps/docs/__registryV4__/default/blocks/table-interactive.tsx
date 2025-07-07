"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";

// Invoice data
const invoices = [
  {
    id: "INV001",
    paymentStatus: "Paid",
    totalAmount: 250.0,
    paymentMethod: "Credit Card",
    customer: "Alex Johnson",
    date: "2023-01-15",
  },
  {
    id: "INV002",
    paymentStatus: "Pending",
    totalAmount: 150.0,
    paymentMethod: "PayPal",
    customer: "Sarah Williams",
    date: "2023-02-03",
  },
  {
    id: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: 350.0,
    paymentMethod: "Bank Transfer",
    customer: "Michael Brown",
    date: "2023-02-18",
  },
  {
    id: "INV004",
    paymentStatus: "Paid",
    totalAmount: 450.0,
    paymentMethod: "Credit Card",
    customer: "Emily Davis",
    date: "2023-03-05",
  },
  {
    id: "INV005",
    paymentStatus: "Paid",
    totalAmount: 550.0,
    paymentMethod: "PayPal",
    customer: "James Wilson",
    date: "2023-03-22",
  },
  {
    id: "INV006",
    paymentStatus: "Pending",
    totalAmount: 200.0,
    paymentMethod: "Bank Transfer",
    customer: "Olivia Martinez",
    date: "2023-04-10",
  },
];

type SortDirection = "asc" | "desc" | null;
type SortField =
  | "id"
  | "customer"
  | "date"
  | "totalAmount"
  | "paymentStatus"
  | "paymentMethod"
  | null;

export default function TableInteractive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort invoices
  const filteredInvoices = invoices
    .filter((invoice) => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          invoice.id.toLowerCase().includes(searchLower) ||
          invoice.customer.toLowerCase().includes(searchLower) ||
          invoice.paymentMethod.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((invoice) => {
      // Apply status filter
      if (statusFilter) {
        return invoice.paymentStatus === statusFilter;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (!sortField || !sortDirection) return 0;

      if (sortField === "totalAmount") {
        return sortDirection === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      }

      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  // Calculate total amount
  const totalAmount = filteredInvoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0,
  );

  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Unpaid":
        return "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 bg-background rounded-lg border">
      <h2 className="text-2xl font-bold mb-6">Invoice Management</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              {statusFilter || "All Statuses"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              All Statuses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Paid")}>
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Unpaid")}>
              Unpaid
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchTerm}-${statusFilter}-${sortField}-${sortDirection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[100px] cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      Invoice
                      {sortField === "id" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("customer")}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortField === "customer" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === "date" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("paymentStatus")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortField === "paymentStatus" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("paymentMethod")}
                  >
                    <div className="flex items-center">
                      Method
                      {sortField === "paymentMethod" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer"
                    onClick={() => handleSort("totalAmount")}
                  >
                    <div className="flex items-center justify-end">
                      Amount
                      {sortField === "totalAmount" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>
                        <span className={getStatusClass(invoice.paymentStatus)}>
                          {invoice.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        ${invoice.totalAmount.toFixed(2)}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">
                    ${totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
