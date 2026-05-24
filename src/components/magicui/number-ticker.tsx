"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type NumberTickerProps = React.HTMLAttributes<HTMLSpanElement> & {
  value: number;
  startValue?: number;
  delay?: number;
  decimalPlaces?: number;
  direction?: "up" | "down";
};

export function NumberTicker({
  value,
  startValue = 0,
  delay = 0,
  decimalPlaces = 0,
  direction = "up",
  className,
  ...props
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = React.useState(startValue);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const from = direction === "down" ? Math.max(startValue, value) : startValue;
    const to = value;
    let frame = 0;
    let startTime: number | null = null;

    const timeout = window.setTimeout(() => {
      const tick = (time: number) => {
        if (startTime === null) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(from + (to - from) * eased);

        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };

      frame = window.requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, decimalPlaces, direction, startValue, value]);

  return (
    <span className={cn("tabular-nums", className)} {...props}>
      {displayValue.toLocaleString("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })}
    </span>
  );
}
