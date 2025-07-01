"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { CheckIcon, MonitorIcon, SmartphoneIcon, XIcon } from "lucide-react";

// Basic user data for standard table
const users = [
  {
    id: "1",
    name: "Alex Thompson",
    username: "@alexthompson",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358071/avatar-40-02_upqrxi.jpg",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "@sarahchen",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358073/avatar-40-01_ij9v7j.jpg",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "Maria Garcia",
    username: "@mariagarcia",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358072/avatar-40-03_dkeufx.jpg",
    email: "m.garcia@company.com",
    location: "Madrid, Spain",
    status: "Active",
    balance: "$0.00",
  },
  {
    id: "4",
    name: "David Kim",
    username: "@davidkim",
    image:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1736358070/avatar-40-05_cmz0mg.jpg",
    email: "d.kim@company.com",
    location: "Seoul, KR",
    status: "Active",
    balance: "-$1,000.00",
  },
];

// Data for browser compatibility table
const browserFeatures = [
  {
    feature: "container-queries",
    desktop: [
      { name: "Chrome", supported: true, version: "105" },
      { name: "Edge", supported: true, version: "105" },
      { name: "Firefox", supported: true, version: "110" },
      { name: "Opera", supported: true, version: "91" },
      { name: "Safari", supported: true, version: "16" },
    ],
    mobile: [
      { name: "Chrome Android", supported: true, version: "105" },
      { name: "Firefox Android", supported: true, version: "110" },
      { name: "Opera Android", supported: true, version: "73" },
      { name: "Safari iOS", supported: true, version: "16" },
      { name: "Samsung Internet", supported: true, version: "20" },
    ],
  },
  {
    feature: "subgrid",
    desktop: [
      { name: "Chrome", supported: true, version: "117" },
      { name: "Edge", supported: true, version: "117" },
      { name: "Firefox", supported: true, version: "71" },
      { name: "Opera", supported: true, version: "103" },
      { name: "Safari", supported: true, version: "16" },
    ],
    mobile: [
      { name: "Chrome Android", supported: true, version: "117" },
      { name: "Firefox Android", supported: true, version: "71" },
      { name: "Opera Android", supported: true, version: "79" },
      { name: "Safari iOS", supported: true, version: "16" },
      { name: "Samsung Internet", supported: true, version: "22" },
    ],
  },
  {
    feature: "has-selector",
    desktop: [
      { name: "Chrome", supported: true, version: "121" },
      { name: "Edge", supported: true, version: "121" },
      { name: "Firefox", supported: true, version: "121" },
      { name: "Opera", supported: true, version: "107" },
      { name: "Safari", supported: true, version: "15.4" },
    ],
    mobile: [
      { name: "Chrome Android", supported: true, version: "121" },
      { name: "Firefox Android", supported: true, version: "121" },
      { name: "Opera Android", supported: true, version: "79" },
      { name: "Safari iOS", supported: true, version: "15.4" },
      { name: "Samsung Internet", supported: false, version: "No" },
    ],
  },
];

// Invoice data for table with footer
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
];

// Basic table with user profiles
export function BasicTable() {
  return (
    <div className="not-prose">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent ">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {item.username}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">{item.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Table with images
      </p>
    </div>
  );
}

// Vertical table (key-value pairs)
export function VerticalTable() {
  // Use David Kim's info
  const userInfo = users[3];

  return (
    <div className="mx-auto max-w-lg not-prose">
      <div className="overflow-hidden rounded-md border bg-background">
        <Table>
          <TableBody>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Name
              </TableCell>
              <TableCell className="py-2">{userInfo.name}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Email
              </TableCell>
              <TableCell className="py-2">{userInfo.email}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Location
              </TableCell>
              <TableCell className="py-2">{userInfo.location}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Status
              </TableCell>
              <TableCell className="py-2">{userInfo.status}</TableCell>
            </TableRow>
            <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted/50 py-2 font-medium">
                Balance
              </TableCell>
              <TableCell className="py-2">{userInfo.balance}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Vertical table
      </p>
    </div>
  );
}

// Complex table with browser compatibility
export function BrowserCompatibilityTable() {
  return (
    <div className="not-prose overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="*:border-border border-y-0 hover:bg-transparent [&>:not(:last-child)]:border-r">
            <TableCell></TableCell>
            <TableHead className="border-b text-center" colSpan={5}>
              <MonitorIcon
                className="inline-flex"
                size={16}
                aria-hidden="true"
              />
              <span className="sr-only">Desktop browsers</span>
            </TableHead>
            <TableHead className="border-b text-center" colSpan={5}>
              <SmartphoneIcon
                className="inline-flex"
                size={16}
                aria-hidden="true"
              />
              <span className="sr-only">Mobile browsers</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableHeader>
          <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <TableCell></TableCell>
            {browserFeatures[0].desktop.map((browser) => (
              <TableHead
                key={browser.name}
                className="h-auto py-3 align-bottom text-foreground"
              >
                <span className="relative left-[calc(50%-.5rem)] block rotate-180 whitespace-nowrap leading-4 [text-orientation:sideways] [writing-mode:vertical-rl]">
                  {browser.name}
                </span>
              </TableHead>
            ))}
            {browserFeatures[0].mobile.map((browser) => (
              <TableHead
                key={browser.name}
                className="h-auto py-3 align-bottom text-foreground"
              >
                <span className="relative left-[calc(50%-.5rem)] block rotate-180 whitespace-nowrap leading-4 [text-orientation:sideways] [writing-mode:vertical-rl]">
                  {browser.name}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {browserFeatures.map((item) => (
            <TableRow
              key={item.feature}
              className="*:border-border [&>:not(:last-child)]:border-r"
            >
              <TableHead className="font-medium text-foreground">
                {item.feature}
              </TableHead>
              {[...item.desktop, ...item.mobile].map((browser, index) => (
                <TableCell
                  key={`${browser.name}-${index}`}
                  className="space-y-1 text-center"
                >
                  {browser.supported ? (
                    <CheckIcon
                      className="inline-flex stroke-emerald-600"
                      size={16}
                      aria-hidden="true"
                    />
                  ) : (
                    <XIcon
                      className="inline-flex stroke-red-600"
                      size={16}
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">
                    {browser.supported ? "Supported" : "Not supported"}
                  </span>
                  <div className="text-xs font-medium text-muted-foreground">
                    {browser.version}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Browser compatibility table
      </p>
    </div>
  );
}

// Table with caption and footer
export function TableWithFooter() {
  return (
    <div className="not-prose">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>
                <span className={getStatusClass(invoice.paymentStatus)}>
                  {invoice.paymentStatus}
                </span>
              </TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$1,950.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Table with caption and footer
      </p>
    </div>
  );
}

// Helper function to get status badge class
function getStatusClass(status: string) {
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
}

// Main export that combines all examples
export default function TablePreview() {
  return (
    <div className="space-y-10">
      <BasicTable />
      <VerticalTable />
      <TableWithFooter />
      <BrowserCompatibilityTable />
    </div>
  );
}
