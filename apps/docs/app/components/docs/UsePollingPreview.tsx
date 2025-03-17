"use client";

import * as React from "react";
import { usePolling } from "@/registry/new-york/hooks/use-polling";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { Progress } from "@/registry/new-york/ui/progress";
import { Slider } from "@/registry/new-york/ui/slider";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table";

export function UsePollingPreview() {
  // Mock data and fetch function
  const [mockData, setMockData] = React.useState({
    count: 0,
    timestamp: new Date().toISOString(),
  });

  const mockFetch = React.useCallback(async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate occasional errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Random fetch error occurred");
    }

    // Update mock data
    const newData = {
      count: mockData.count + 1,
      timestamp: new Date().toISOString(),
    };

    setMockData(newData);
    return newData;
  }, [mockData]);

  // Polling interval state
  const [pollingInterval, setPollingInterval] = React.useState(3000);
  const maxErrors = 3;

  // Polling hook
  const {
    data,
    error,
    status,
    lastUpdated,
    errorCount,
    isPolling,
    isPaused,
    isStopped,
    isError,
    startPolling,
    pausePolling,
    stopPolling,
    resetErrors,
    fetchNow,
  } = usePolling({
    fetchFn: mockFetch,
    interval: pollingInterval,
    autoStart: false,
    maxErrors: maxErrors,
  });

  // Format time ago
  const getTimeAgo = (timestamp: number | null) => {
    if (!timestamp) return "Never";

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  };

  // Handle interval change
  const handleIntervalChange = (value: number[]) => {
    setPollingInterval(value[0]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Data Polling</span>
          <Badge
            variant={isPolling ? "default" : isPaused ? "outline" : "secondary"}
          >
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isError && (
            <Alert variant="destructive">
              <AlertDescription className="flex justify-between">
                <span>{error?.message || "An error occurred"}</span>
                <Button variant="outline" size="sm" onClick={resetErrors}>
                  Reset
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium mb-1">Polling Interval</p>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[pollingInterval]}
                    min={1000}
                    max={10000}
                    step={1000}
                    onValueChange={handleIntervalChange}
                    disabled={isPolling}
                    className="w-[180px]"
                  />
                  <span className="text-sm">{pollingInterval / 1000}s</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="auto-start" className="text-sm">
                  Auto Start
                </Label>
                <Switch id="auto-start" defaultChecked={false} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isPolling ? "secondary" : "default"}
                onClick={isPolling ? pausePolling : startPolling}
                disabled={isError}
                className="flex-1"
              >
                {isPolling ? "Pause" : isPaused ? "Resume" : "Start"}
              </Button>
              <Button
                variant="outline"
                onClick={stopPolling}
                disabled={isStopped || isError}
                className="flex-1"
              >
                Stop
              </Button>
              <Button
                variant="outline"
                onClick={fetchNow}
                disabled={isError || isStopped}
              >
                Fetch Now
              </Button>
            </div>
          </div>

          <Tabs defaultValue="data">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
            </TabsList>
            <TabsContent value="data" className="space-y-4">
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Latest Data</h3>
                  {lastUpdated && (
                    <Badge variant="outline">{getTimeAgo(lastUpdated)}</Badge>
                  )}
                </div>

                {data ? (
                  <div className="rounded-md bg-muted p-3">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No data fetched yet
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="status">
              <div className="rounded-md border p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <Badge>{status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Error Count</p>
                    <p>
                      {errorCount} / {maxErrors}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Last Updated</p>
                    <p>{lastUpdated ? getTimeAgo(lastUpdated) : "Never"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Polling Interval</p>
                    <p>{pollingInterval / 1000}s</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Time Until Next Poll</p>
                  {isPolling ? (
                    <Progress
                      value={
                        ((Date.now() - (lastUpdated || Date.now())) /
                          pollingInterval) *
                        100
                      }
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Not currently polling
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>
          This demo uses simulated data. In a real application, you would fetch
          data from an API endpoint.
        </p>
      </CardFooter>
    </Card>
  );
}

export function CryptoTrackerPreview() {
  // Mock cryptocurrency data with realistic prices
  const initialCrypto = [
    { symbol: "BTC", name: "Bitcoin", price: 56789.34, change: 2.45 },
    { symbol: "ETH", name: "Ethereum", price: 2834.56, change: -1.2 },
    { symbol: "SOL", name: "Solana", price: 123.78, change: 5.67 },
    { symbol: "DOT", name: "Polkadot", price: 34.56, change: 0.89 },
    { symbol: "DOGE", name: "Dogecoin", price: 0.1234, change: -3.45 },
  ];

  const [cryptoData, setCryptoData] = React.useState(initialCrypto);
  const [activePairs, setActivePairs] = React.useState(
    initialCrypto.map((c) => c.symbol)
  );
  const [error, setError] = React.useState<string | null>(null);

  // Function to update crypto prices with realistic fluctuations
  const fetchCryptoPrices = React.useCallback(async () => {
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulate API error (5% chance)
      if (Math.random() < 0.05) {
        throw new Error("API rate limit exceeded");
      }

      // Update prices with realistic fluctuations (between -2% and +2%)
      const updatedCrypto = cryptoData.map((crypto) => {
        const priceChange = (crypto.price * (Math.random() * 4 - 2)) / 100;
        const newPrice = crypto.price + priceChange;

        // Calculate 24h price change with some randomness to simulate real market
        const changeAdjustment = (Math.random() - 0.5) * 2;
        const newChange = crypto.change + changeAdjustment;

        return {
          ...crypto,
          price: newPrice,
          change: parseFloat(newChange.toFixed(2)),
        };
      });

      setCryptoData(updatedCrypto);
      setError(null);
      return updatedCrypto;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch crypto prices";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [cryptoData]);

  // Toggle tracking for a specific currency
  const toggleTracking = (symbol: string) => {
    setActivePairs((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  // Use the polling hook to periodically fetch prices
  const {
    isPolling,
    lastUpdated,
    startPolling,
    pausePolling,
    fetchNow,
    isError,
    resetErrors,
  } = usePolling({
    fetchFn: fetchCryptoPrices,
    interval: 5000, // Update every 5 seconds
    autoStart: true,
    onError: (err) => console.error("Failed to update crypto prices:", err),
  });

  // Format price with proper decimal places based on value
  const formatPrice = (price: number) => {
    if (price < 0.1) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cryptocurrency Tracker</span>
          <Badge variant={isPolling ? "default" : "outline"}>
            {isPolling ? "Live Updates" : "Paused"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isError && (
          <Alert variant="destructive">
            <AlertDescription className="flex justify-between">
              <span>{error || "Failed to update prices"}</span>
              <Button variant="outline" size="sm" onClick={resetErrors}>
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={isPolling ? "secondary" : "default"}
              size="sm"
              onClick={isPolling ? pausePolling : startPolling}
            >
              {isPolling ? "Pause Updates" : "Resume Updates"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNow}
              disabled={!activePairs.length}
            >
              Refresh Now
            </Button>
          </div>

          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Track</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Price (USD)</TableHead>
              <TableHead className="text-right w-[100px]">24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptoData.map((crypto) => (
              <TableRow key={crypto.symbol}>
                <TableCell>
                  <Switch
                    checked={activePairs.includes(crypto.symbol)}
                    onCheckedChange={() => toggleTracking(crypto.symbol)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <div>{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {crypto.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${formatPrice(crypto.price)}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    crypto.change > 0
                      ? "text-green-600"
                      : crypto.change < 0
                        ? "text-red-600"
                        : ""
                  }`}
                >
                  {crypto.change > 0 ? "+" : ""}
                  {crypto.change}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Toggle currencies to track specific assets</p>
        <p>Data refreshes every 5 seconds</p>
      </CardFooter>
    </Card>
  );
}

export function ServerStatusPreview() {
  // Mock server status data
  const servers = [
    { id: "web-01", name: "Web Server 01", type: "web", region: "us-east" },
    { id: "api-01", name: "API Server 01", type: "api", region: "us-east" },
    { id: "db-01", name: "Database 01", type: "database", region: "us-east" },
    {
      id: "cache-01",
      name: "Cache Server 01",
      type: "cache",
      region: "us-west",
    },
    {
      id: "worker-01",
      name: "Worker 01",
      type: "worker",
      region: "eu-central",
    },
  ];

  const [serverStatus, setServerStatus] = React.useState<
    Record<
      string,
      {
        status: "healthy" | "degraded" | "down";
        uptime: number;
        cpu: number;
        memory: number;
        lastChecked: number;
      }
    >
  >({});

  // Function to fetch server statuses
  const fetchServerStatus = React.useCallback(async () => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Simulate server error (rare)
      if (Math.random() < 0.03) {
        throw new Error("Monitoring service temporarily unavailable");
      }

      const updatedStatus: Record<string, any> = {};

      // Update each server with realistic metric changes
      servers.forEach((server) => {
        const currentStatus = serverStatus[server.id];

        // Calculate realistic metrics with some fluctuation
        const currentCpu = currentStatus?.cpu || 15 + Math.random() * 30;
        const currentMemory = currentStatus?.memory || 30 + Math.random() * 40;
        const currentUptime = currentStatus?.uptime || 0;

        // Random CPU fluctuation (-5% to +5%)
        const cpuChange = Math.random() * 10 - 5;
        const newCpu = Math.max(1, Math.min(99, currentCpu + cpuChange));

        // Smaller memory fluctuation (-2% to +2%)
        const memoryChange = Math.random() * 4 - 2;
        const newMemory = Math.max(
          10,
          Math.min(95, currentMemory + memoryChange)
        );

        // Determine status based on metrics
        let status: "healthy" | "degraded" | "down" = "healthy";

        // Very small chance of server being down completely
        if (Math.random() < 0.01) {
          status = "down";
        }
        // Server is degraded if CPU or memory is high
        else if (newCpu > 80 || newMemory > 85) {
          status = "degraded";
        }

        // If server was previously down, it's now recovering with lower resource usage
        if (currentStatus?.status === "down" && Math.random() < 0.7) {
          status = "degraded";
          // Lower resource usage during recovery
          const newCpu = 50 + Math.random() * 20;
          const newMemory = 60 + Math.random() * 15;
        }

        updatedStatus[server.id] = {
          status,
          uptime: status === "down" ? 0 : (currentStatus?.uptime || 0) + 10,
          cpu: newCpu,
          memory: newMemory,
          lastChecked: Date.now(),
        };
      });

      setServerStatus(updatedStatus);
      return updatedStatus;
    } catch (err) {
      throw err;
    }
  }, [serverStatus]);

  // Format uptime to human readable format
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Get status indicator color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "down":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  // Use polling to fetch server status regularly
  const {
    isPolling,
    error,
    lastUpdated,
    startPolling,
    pausePolling,
    fetchNow,
  } = usePolling({
    fetchFn: fetchServerStatus,
    interval: 10000, // Check every 10 seconds
    autoStart: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Server Monitoring Dashboard</span>
          <Badge variant={isPolling ? "default" : "outline"}>
            {isPolling ? "Monitoring Active" : "Monitoring Paused"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error.message || "Failed to fetch server status"}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={isPolling ? "secondary" : "default"}
              size="sm"
              onClick={isPolling ? pausePolling : startPolling}
            >
              {isPolling ? "Pause Monitoring" : "Resume Monitoring"}
            </Button>
            <Button variant="outline" size="sm" onClick={fetchNow}>
              Check Now
            </Button>
          </div>

          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servers.map((server) => {
            const status = serverStatus[server.id];
            return (
              <Card key={server.id} className="overflow-hidden">
                <div
                  className={`h-1 ${status?.status ? getStatusColor(status.status) : "bg-gray-300"}`}
                />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{server.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {server.type} | {server.region}
                      </p>
                    </div>
                    {status && (
                      <Badge
                        variant={
                          status.status === "healthy"
                            ? "default"
                            : status.status === "degraded"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {status.status}
                      </Badge>
                    )}
                  </div>

                  {status ? (
                    <div className="space-y-3 mt-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>CPU</span>
                          <span>{status.cpu.toFixed(1)}%</span>
                        </div>
                        <Progress value={status.cpu} className="h-1" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Memory</span>
                          <span>{status.memory.toFixed(1)}%</span>
                        </div>
                        <Progress value={status.memory} className="h-1" />
                      </div>

                      <div className="pt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Uptime: {formatUptime(status.uptime)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[90px] flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Fetching server status...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Monitoring {servers.length} servers across 3 regions</p>
        <p>Refreshes every 10 seconds</p>
      </CardFooter>
    </Card>
  );
}
