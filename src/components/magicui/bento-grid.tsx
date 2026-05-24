import * as React from "react";

import { cn } from "@/lib/utils";

type BentoGridProps = React.HTMLAttributes<HTMLDivElement>;

type BentoCardProps = React.HTMLAttributes<HTMLElement> & {
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  cta?: React.ReactNode;
};

export function BentoGrid({ className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-3 md:grid-cols-6", className)}
      {...props}
    />
  );
}

export function BentoCard({
  className,
  name,
  description,
  icon: Icon,
  cta,
  children,
  ...props
}: BentoCardProps) {
  return (
    <article
      className={cn(
        "group relative flex min-h-56 overflow-hidden rounded-lg border bg-card p-5 transition-colors hover:bg-accent/30",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex h-full w-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {Icon ? (
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
                <Icon className="size-4" aria-hidden />
              </div>
            ) : null}
            <div className="min-w-0">
              <h3 className="font-semibold leading-6">{name}</h3>
              <p className="mt-2 line-clamp-4 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
          {cta}
        </div>
        {children}
      </div>
    </article>
  );
}
