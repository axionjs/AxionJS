"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table";
import { motion } from "motion/react";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";

// User data for the table
const users = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "@alexthompson",
    image: "https://github.com/shadcn.png",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    image: "https://via.placeholder.com/40?text=SC",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Maria Garcia",
    username: "@mariagarcia",
    image: "https://via.placeholder.com/40?text=MG",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Inactive",
    balance: "$0.00",
  },
  {
    id: "4",
    name: "David Kim",
    username: "@davidkim",
    image: "https://via.placeholder.com/40?text=DK",
    email: "d.kim@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "-$1,000.00",
  },
];

export default function TableBasic() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-3 sm:p-6 bg-background rounded-lg border h-full min-h-[300px] sm:min-h-[400px] flex flex-col">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
        <Badge variant="secondary" className="text-xs">
          Team Members
        </Badge>
      </h2>
      <div className="overflow-x-auto flex-1">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="min-w-full"
        >
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs sm:text-sm">Name</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                  Email
                </TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                  Location
                </TableHead>
                <TableHead className="text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">
                  Balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <motion.tr key={user.id} variants={item} className="group">
                  <TableCell className="py-2 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="font-medium group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                          {user.name}
                        </div>
                        <span className="mt-0.5 text-xs text-muted-foreground block sm:hidden">
                          {user.username}
                        </span>
                        <span className="mt-0.5 text-xs text-muted-foreground hidden sm:block">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                    {user.location}
                  </TableCell>
                  <TableCell className="py-2 sm:py-4">
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium text-xs sm:text-sm py-2 sm:py-4 ${
                      user.balance.startsWith("-")
                        ? "text-red-500"
                        : user.balance !== "$0.00"
                          ? "text-green-500"
                          : ""
                    }`}
                  >
                    {user.balance}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
