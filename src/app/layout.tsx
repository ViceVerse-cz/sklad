import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { MainNav } from "./_components/dashboard/MainNav";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sklad",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <div className={"px-8 pt-8"}>
            <MainNav />

            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
