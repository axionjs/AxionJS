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
    <div className="p-6 bg-background rounded-lg border lg:h-[400px]">
      <h2 className="text-2xl font-bold mb-6">
        <Badge variant="secondary" className="text-xs">
          Team Members
        </Badge>
      </h2>
      <div className="overflow-x-auto">
        <motion.div variants={container} initial="hidden" animate="show">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <motion.tr key={user.id} variants={item} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">
                          {user.name}
                        </div>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
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
