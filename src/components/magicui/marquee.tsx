import * as React from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
};

export function Marquee({
  className,
  reverse,
  pauseOnHover,
  vertical,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--duration:28s] [--gap:0.5rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          aria-hidden={index > 0}
          className={cn(
            "flex shrink-0 justify-around gap-[var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          key={index}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
