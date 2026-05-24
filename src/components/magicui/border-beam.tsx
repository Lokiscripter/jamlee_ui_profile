import * as React from "react";

import { cn } from "@/lib/utils";

type BorderBeamProps = React.SVGAttributes<SVGSVGElement> & {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  radius?: number;
};

export function BorderBeam({
  className,
  size = 90,
  duration = 8,
  delay = 0,
  colorFrom = "currentColor",
  colorTo = "currentColor",
  borderWidth = 1.5,
  radius = 8,
  ...props
}: BorderBeamProps) {
  const id = React.useId();

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] text-foreground/60",
        className
      )}
      style={
        {
          "--beam-size": size,
          "--beam-duration": `${duration}s`,
          "--beam-delay": `${delay}s`,
        } as React.CSSProperties
      }
      {...props}
    >
      <defs>
        <linearGradient id={id} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
          <stop offset="45%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
      </defs>
      <rect
        width="100%"
        height="100%"
        rx={radius}
        fill="none"
        stroke={`url(#${id})`}
        strokeDasharray={`${size} 560`}
        strokeLinecap="round"
        strokeWidth={borderWidth}
        vectorEffect="non-scaling-stroke"
        className="animate-border-beam"
      />
    </svg>
  );
}
