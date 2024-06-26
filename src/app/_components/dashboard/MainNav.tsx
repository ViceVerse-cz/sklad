import Link from "next/link";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export async function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex flex-col gap-2">
      <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
        <Link href="/overview" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Přehled
        </Link>
        <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Tabulka produktů
        </Link>
      </nav>

      <Separator className="my-2" />
    </div>
  );
}
