"use client";

import * as React from "react";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { AlertCircle } from "lucide-react";

export function IdleTimeoutPreview() {
  const [lastActive, setLastActive] = React.useState<Date>(new Date());
  const [showModal, setShowModal] = React.useState(false);
  const [isIdle, setIsIdle] = React.useState(false);

  // Simulate the useIdleTimeout hook
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let idleTimeout = 5000; // 5 seconds for demo

    const handleActivity = () => {
      setLastActive(new Date());
      setIsIdle(false);

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout
      timeoutId = setTimeout(() => {
        setIsIdle(true);
        setShowModal(true);
      }, idleTimeout);
    };

    // Initialize activity detection
    handleActivity();

    // Set up event listeners for user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    // Cleanup event listeners
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  // Format time since last activity
  const getTimeSinceActive = () => {
    const now = new Date();
    const diff = now.getTime() - lastActive.getTime();
    return `${Math.floor(diff / 1000)} seconds ago`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div
              className={`h-16 w-16 rounded-full flex items-center justify-center ${
                isIdle
                  ? "bg-amber-100 text-amber-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <div className="text-2xl font-bold">{isIdle ? "😴" : "👋"}</div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium">
                {isIdle ? "You are idle" : "You are active"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Last activity: {getTimeSinceActive()}
              </p>
            </div>

            <p className="text-sm text-center">
              Move your mouse, press a key, or scroll to show activity.
              <br />
              The idle timeout is set to 5 seconds for this demo.
            </p>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <Card className="w-[350px] max-w-[90vw]">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-2 text-amber-600">
                <AlertCircle className="h-5 w-5" />
                <h3 className="text-lg font-medium">Inactivity Detected</h3>
              </div>
              <p className="text-sm">
                You've been inactive for a while. In a real application, you
                might be logged out soon.
              </p>
              <Button
                onClick={() => {
                  setShowModal(false);
                  setIsIdle(false);
                  setLastActive(new Date());
                }}
                className="w-full"
              >
                I'm Still Here
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export function SessionTimeoutPreview() {
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [isIdle, setIsIdle] = React.useState(false);
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);

  // Reset the demo
  const resetDemo = () => {
    setTimeLeft(60);
    setIsIdle(false);
    setIsLoggedOut(false);
  };

  // Simulate the idle timeout
  React.useEffect(() => {
    let activityTimeout: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout | null = null;

    const handleActivity = () => {
      if (isLoggedOut) return;

      if (isIdle) {
        // User became active again - reset
        setIsIdle(false);
        setTimeLeft(60);
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
      }

      // Clear any existing timeout
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }

      // Set new timeout (10 seconds for the demo)
      activityTimeout = setTimeout(() => {
        setIsIdle(true);

        // Start countdown
        countdownInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              // Time's up - log out
              clearInterval(countdownInterval!);
              setIsLoggedOut(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 10000);
    };

    // Initialize
    handleActivity();

    // Set up event listeners
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      if (activityTimeout) clearTimeout(activityTimeout);
      if (countdownInterval) clearInterval(countdownInterval);

      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isIdle, isLoggedOut]);

  if (isLoggedOut) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium mb-4">
            You've been logged out due to inactivity
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            For security reasons, your session has expired.
          </p>
          <Button onClick={resetDemo}>Log back in (Reset Demo)</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div
            className={`inline-block h-16 w-16 rounded-full flex items-center justify-center ${
              isIdle
                ? "bg-amber-100 text-amber-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            <div className="text-2xl font-bold">{isIdle ? "⏰" : "👨‍💻"}</div>
          </div>
          <h3 className="text-lg font-medium mt-2">
            {isIdle ? "Session Timeout Warning" : "User Session Active"}
          </h3>
        </div>

        {isIdle ? (
          <div className="space-y-4">
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-1000"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Your session will expire in {timeLeft} seconds due to inactivity.
            </p>
            <p className="text-center text-xs">
              Move your cursor or press a key to continue your session.
            </p>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Stay inactive for 10 seconds to see the timeout warning.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
