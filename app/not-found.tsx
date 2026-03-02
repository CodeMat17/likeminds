import Link from "next/link";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Emblem } from "@/components/ui/Emblem";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="text-center max-w-md">
        <Emblem size={80} className="text-primary mx-auto mb-6" />
        <p className="font-serif text-7xl font-black text-primary/20 leading-none mb-2">404</p>
        <h1 className="font-serif text-2xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Let us take you back to the brotherhood.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 gap-2">
            <Link href="/">
              <HomeIcon className="size-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/works">
              <ArrowLeftIcon className="size-4" />
              View Our Works
            </Link>
          </Button>
        </div>
        <p className="mt-8 font-serif italic text-gold text-sm">"Ofu Obi Umunwanne"</p>
      </div>
    </div>
  );
}
