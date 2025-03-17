"use client";

import * as React from "react";
import { useGeolocation } from "@/registry/new-york/hooks/use-geolocation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Badge } from "@/registry/new-york/ui/badge";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

export function UseGeolocationPreview() {
  // Mock implementation to allow preview to work without actual geolocation access
  const [mockPermissionState, setMockPermissionState] =
    React.useState<PermissionState>("prompt");
  const [mockIsWatching, setMockIsWatching] = React.useState(false);
  const [mockPosition, setMockPosition] = React.useState<any>(null);
  const [mockError, setMockError] = React.useState<any>(null);
  const [mockIsLoading, setMockIsLoading] = React.useState(false);

  // Create mock position on first request
  const handleMockGetPosition = () => {
    setMockIsLoading(true);

    if (mockPermissionState === "denied") {
      setTimeout(() => {
        setMockError({
          code: 1,
          message: "User denied geolocation access",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });
        setMockIsLoading(false);
      }, 1000);
      return;
    }

    // Simulate position acquisition delay
    setTimeout(() => {
      // New York coordinates by default
      const basePosition = {
        latitude: 40.7128,
        longitude: -74.006,
        accuracy: 20,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        timestamp: Date.now(),
      };

      // Add small random variations if watching
      if (mockIsWatching) {
        basePosition.latitude += (Math.random() - 0.5) * 0.01;
        basePosition.longitude += (Math.random() - 0.5) * 0.01;
        basePosition.accuracy = Math.max(
          5,
          Math.round(basePosition.accuracy + (Math.random() - 0.5) * 10)
        );
        basePosition.timestamp = Date.now();
      }

      setMockPosition(basePosition);
      setMockError(null);
      setMockIsLoading(false);
    }, 1500);
  };

  const handleMockPermissionChange = (state: PermissionState) => {
    setMockPermissionState(state);

    if (state === "denied" && mockPosition) {
      setMockPosition(null);
      setMockError({
        code: 1,
        message: "User denied geolocation access",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
    }
  };

  const handleMockToggleWatch = () => {
    const newWatchState = !mockIsWatching;
    setMockIsWatching(newWatchState);

    if (newWatchState && mockPermissionState !== "denied") {
      // Start position updates for watching
      handleMockGetPosition();

      // Update position every few seconds if watching
      const watchIntervalId = setInterval(() => {
        if (mockPermissionState !== "denied") {
          handleMockGetPosition();
        }
      }, 5000);

      return () => clearInterval(watchIntervalId);
    }
  };

  // Mock geolocation hook implementation
  const {
    isSupported = true,
    position = mockPosition,
    error = mockError,
    isLoading = mockIsLoading,
    permissionState = mockPermissionState,
    getPosition = handleMockGetPosition,
    stopWatching = () => setMockIsWatching(false),
  } = {} as any;

  // Format coordinates for display
  const formatCoordinate = (coord: number | null) => {
    if (coord === null) return "N/A";
    return coord.toFixed(6);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Geolocation</span>
          {isSupported ? (
            <Badge variant="outline">Supported</Badge>
          ) : (
            <Badge variant="destructive">Not Supported</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!isSupported && (
            <Alert variant="destructive">
              <AlertDescription>
                Geolocation is not supported in this browser.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {/* Mock permission controls */}
            <div className="flex flex-col gap-2 border rounded-md p-3">
              <Label className="text-sm font-medium">
                Permission Status: {permissionState || "unknown"}
              </Label>
              <div className="flex flex-wrap gap-2">
                {["prompt", "granted", "denied"].map((state) => (
                  <Button
                    key={state}
                    size="sm"
                    variant={permissionState === state ? "default" : "outline"}
                    onClick={() =>
                      handleMockPermissionChange(state as PermissionState)
                    }
                  >
                    {state}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This is a simulation for preview purposes. In a real app, the
                permission is controlled by the browser.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="watch-mode"
                checked={mockIsWatching}
                onCheckedChange={handleMockToggleWatch}
                disabled={!isSupported || permissionState === "denied"}
              />
              <Label htmlFor="watch-mode">
                Watch Mode (continuous updates)
              </Label>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={getPosition}
                disabled={
                  !isSupported ||
                  isLoading ||
                  permissionState === "denied" ||
                  mockIsWatching
                }
              >
                {isLoading ? "Getting Location..." : "Get Current Location"}
              </Button>
              {mockIsWatching && (
                <Button variant="outline" onClick={stopWatching}>
                  Stop Watching
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="position">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="position">Position</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent
              value="position"
              className="p-4 border rounded-md mt-2"
            >
              {isLoading ? (
                <div className="flex justify-center items-center py-6">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : error ? (
                <div className="py-4 text-center">
                  <p className="text-red-500 font-medium mb-1">Error</p>
                  <p className="text-sm text-muted-foreground">
                    {error.message || "Failed to get location"}
                  </p>
                  <p className="text-xs mt-2">
                    Error code: {error.code || "unknown"}
                  </p>
                </div>
              ) : position ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Latitude</p>
                      <p className="text-lg">
                        {formatCoordinate(position.latitude)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Longitude</p>
                      <p className="text-lg">
                        {formatCoordinate(position.longitude)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Accuracy</p>
                    <p>
                      {position.accuracy
                        ? `±${position.accuracy.toFixed(1)} meters`
                        : "N/A"}
                    </p>
                  </div>

                  {position.timestamp && (
                    <div>
                      <p className="text-sm font-medium mb-1">Timestamp</p>
                      <p className="text-sm">
                        {new Date(position.timestamp).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center pt-2">
                    <a
                      href={`https://www.google.com/maps?q=${position.latitude},${position.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm underline"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground">
                  <MapPinIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>No location data available</p>
                  <p className="text-sm mt-1">
                    Click "Get Current Location" to get started
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Permission State</p>
                  <Badge
                    variant={
                      permissionState === "granted"
                        ? "success"
                        : permissionState === "denied"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {permissionState || "unknown"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Watch Mode</p>
                  <Badge variant={mockIsWatching ? "default" : "outline"}>
                    {mockIsWatching ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {position && (
                  <>
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Additional Data
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs font-medium">Altitude</p>
                          <p>
                            {position.altitude
                              ? `${position.altitude.toFixed(1)} meters`
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">
                            Altitude Accuracy
                          </p>
                          <p>
                            {position.altitudeAccuracy
                              ? `±${position.altitudeAccuracy.toFixed(1)} meters`
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Heading</p>
                          <p>
                            {position.heading
                              ? `${position.heading.toFixed(1)}°`
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Speed</p>
                          <p>
                            {position.speed
                              ? `${position.speed.toFixed(1)} m/s`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-sm font-medium mb-1">Browser Support</p>
                  <p className="text-sm">
                    {isSupported
                      ? "This browser supports the Geolocation API"
                      : "This browser does not support the Geolocation API"}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>
          This is a simulation. In a real app, actual location data would be
          used.
        </p>
      </CardFooter>
    </Card>
  );
}

export function LocationTrackerPreview() {
  // Mock implementation
  const [mockPosition, setMockPosition] = React.useState<any>({
    latitude: 40.7128,
    longitude: -74.006,
    accuracy: 20,
    timestamp: Date.now(),
  });

  const [isTracking, setIsTracking] = React.useState(false);
  const [trackingPath, setTrackingPath] = React.useState<
    { lat: number; lng: number; time: number }[]
  >([]);

  React.useEffect(() => {
    if (!isTracking) return;

    // Generate new position every 3 seconds
    const interval = setInterval(() => {
      const newPosition = {
        latitude: mockPosition.latitude + (Math.random() - 0.5) * 0.002,
        longitude: mockPosition.longitude + (Math.random() - 0.5) * 0.002,
        accuracy: Math.max(
          5,
          Math.round(mockPosition.accuracy + (Math.random() - 0.5) * 5)
        ),
        timestamp: Date.now(),
      };

      setMockPosition(newPosition);
      setTrackingPath((prev) => [
        ...prev,
        {
          lat: newPosition.latitude,
          lng: newPosition.longitude,
          time: newPosition.timestamp,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isTracking, mockPosition]);

  const startTracking = () => {
    setIsTracking(true);
    setTrackingPath([
      {
        lat: mockPosition.latitude,
        lng: mockPosition.longitude,
        time: Date.now(),
      },
    ]);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const clearTracking = () => {
    setTrackingPath([]);
    setIsTracking(false);
  };

  // Calculate distance
  const calculateDistance = (
    path: { lat: number; lng: number; time: number }[]
  ) => {
    if (path.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1];
      const curr = path[i];
      totalDistance += getDistanceFromLatLng(
        prev.lat,
        prev.lng,
        curr.lat,
        curr.lng
      );
    }

    return totalDistance;
  };

  // Calculate distance between two coordinates
  const getDistanceFromLatLng = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d; // Distance in meters
  };

  // Format distance
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters.toFixed(0)} m`;
    } else {
      return `${(meters / 1000).toFixed(2)} km`;
    }
  };

  // Calculate elapsed time
  const calculateElapsedTime = (
    path: { lat: number; lng: number; time: number }[]
  ) => {
    if (path.length < 2) return 0;
    return path[path.length - 1].time - path[0].time;
  };

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Location Tracker</span>
          <Badge variant={isTracking ? "default" : "outline"}>
            {isTracking ? "Tracking" : "Inactive"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={isTracking ? "secondary" : "default"}
              onClick={isTracking ? stopTracking : startTracking}
            >
              {isTracking ? "Pause Tracking" : "Start Tracking"}
            </Button>
            <Button
              variant="outline"
              onClick={clearTracking}
              disabled={trackingPath.length === 0}
            >
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3 flex flex-col items-center">
              <p className="text-sm font-medium mb-1">Distance</p>
              <p className="text-2xl font-bold">
                {formatDistance(calculateDistance(trackingPath))}
              </p>
            </div>
            <div className="border rounded-md p-3 flex flex-col items-center">
              <p className="text-sm font-medium mb-1">Time</p>
              <p className="text-2xl font-bold">
                {trackingPath.length > 1
                  ? formatTime(calculateElapsedTime(trackingPath))
                  : "0s"}
              </p>
            </div>
          </div>

          <div className="rounded-md bg-muted p-3 min-h-[150px]">
            {trackingPath.length > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Path Points: {trackingPath.length}</span>
                  <span>Current Accuracy: ±{mockPosition.accuracy}m</span>
                </div>
                <div className="h-[100px] bg-black/5 rounded relative overflow-hidden">
                  {/* Simple path visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">
                      {trackingPath.length > 1
                        ? "Path visualization (simulated)"
                        : "Start tracking to visualize path"}
                    </p>
                  </div>

                  {trackingPath.length > 1 && (
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={trackingPath
                          .map((point, i) => {
                            // Normalize the coordinates to the SVG viewport
                            const minLat = Math.min(
                              ...trackingPath.map((p) => p.lat)
                            );
                            const maxLat = Math.max(
                              ...trackingPath.map((p) => p.lat)
                            );
                            const minLng = Math.min(
                              ...trackingPath.map((p) => p.lng)
                            );
                            const maxLng = Math.max(
                              ...trackingPath.map((p) => p.lng)
                            );

                            const latRange = maxLat - minLat || 0.001;
                            const lngRange = maxLng - minLng || 0.001;

                            const x =
                              ((point.lng - minLng) / lngRange) * 90 + 5;
                            const y =
                              100 -
                              (((point.lat - minLat) / latRange) * 90 + 5);

                            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      {trackingPath.map((point, i) => {
                        const minLat = Math.min(
                          ...trackingPath.map((p) => p.lat)
                        );
                        const maxLat = Math.max(
                          ...trackingPath.map((p) => p.lat)
                        );
                        const minLng = Math.min(
                          ...trackingPath.map((p) => p.lng)
                        );
                        const maxLng = Math.max(
                          ...trackingPath.map((p) => p.lng)
                        );

                        const latRange = maxLat - minLat || 0.001;
                        const lngRange = maxLng - minLng || 0.001;

                        const x = ((point.lng - minLng) / lngRange) * 90 + 5;
                        const y =
                          100 - (((point.lat - minLat) / latRange) * 90 + 5);

                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={
                              i === 0
                                ? "3"
                                : i === trackingPath.length - 1
                                  ? "3"
                                  : "1.5"
                            }
                            fill={
                              i === 0
                                ? "green"
                                : i === trackingPath.length - 1
                                  ? "red"
                                  : "currentColor"
                            }
                          />
                        );
                      })}
                    </svg>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <MapPinIcon className="h-8 w-8 mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Click "Start Tracking" to begin tracking your location
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Simulated data for demonstration purposes</p>
        {isTracking && (
          <span>
            Last updated:{" "}
            {new Date(mockPosition.timestamp).toLocaleTimeString()}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}

// Icons
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
