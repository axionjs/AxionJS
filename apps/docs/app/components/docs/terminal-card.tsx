"use client";

import { AnimatedSpan, Terminal, TypingAnimation } from "./terminal";
import { useEffect, useRef } from "react";

export function AxionTerminalDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const delays = [1500, 2000, 2500, 2800, 3100, 3500, 3900, 4300, 4700, 5100];

  useEffect(() => {
    delays.forEach((delay) => {
      setTimeout(() => {
        scrollToBottom();
      }, delay + 100);
    });
  }, []);

  return (
    <div
      ref={scrollRef}
      className="h-[400px] w-full px-0"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(100,116,139,0.4) transparent",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: rgba(100, 116, 139, 0.4);
          border-radius: 6px;
        }
      `}</style>

      <Terminal className="w-full">
        <TypingAnimation>$ npx axionjs-ui add</TypingAnimation>

        <AnimatedSpan delay={1500}>
          <span>┌</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2000} className="text-pink-500">
          <span>◇ Which components would you like to add?</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2500}>
          <span>│</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2800}>
          <span>
            │ ◇ Hint: Space to select. A to toggle all. Enter to submit.
          </span>
        </AnimatedSpan>

        <AnimatedSpan delay={3100}>
          <span>│ ◇ chart</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3500} className="text-pink-500">
          <span>✓ Checking registry.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3900} className="text-pink-500">
          <span>✓ Updating CSS variables in src\app\globals.css</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4300} className="text-pink-500">
          <span>✓ Installing dependencies.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4700} className="text-pink-500">
          <span>✓ Created 1 file:</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5100} className="text-green-500">
          <span> - src\components\ui\chart.jsx</span>
        </AnimatedSpan>
      </Terminal>
    </div>
  );
}
