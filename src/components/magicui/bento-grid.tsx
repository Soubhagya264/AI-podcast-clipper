import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShineBorder } from "./shine-border";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl group  border shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] border-neutral-800/30 bg-gradient-to-br from-neutral-900 to-neutral-950 hover:shadow-xl transition-all duration-300",
      className
    )}
    {...props}
  >
    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B", "#fe17d4"]} />

    {/* Background */}
    <div className="absolute inset-0 z-0">{background}</div>

    {/* Content */}
    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
      <div>
        <Icon className="h-12 w-12 text-white mb-3 transition-transform duration-300 group-hover:scale-90" />
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-neutral-300 mt-2">{description}</p>
      </div>

      <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <Button variant="ghost" asChild size="sm" className="text-white">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>

    {/* Overlay effect */}
    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none rounded-2xl" />
  </div>
);

export { BentoCard, BentoGrid };
