import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmblemProps {
  className?: string;
  size?: number;
  variant?: "full" | "icon";
}

export function Emblem({
  className,
  size = 80,
}: EmblemProps) {
 

  return (
    <Image
      alt='logo'
      priority
      src='/logo.png'
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-label='LikeMinds Association Emblem'
    />
  );
}
