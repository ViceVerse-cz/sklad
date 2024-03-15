import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MainNav } from "@/app/_components/dashboard/main-nav";
import { Overview } from "@/app/_components/dashboard/overview";
import { RecentSales } from "@/app/_components/dashboard/recent-sales";
import { api } from "@/trpc/server";
import { MdOutlineCategory } from "react-icons/md";
import { Decimal } from "@prisma/client/runtime/library";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: Decimal;
  quantity: number;
}

export default async function DashboardPage() {
  const categories = await api.category.listCategories.query();

  return (
    <>
      <div className="md:hidden" />
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4" />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Kategorie</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {categories?.map(() => (
                    <>
                      <CarouselItem>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              Total Revenue
                            </CardTitle>
                            <MdOutlineCategory />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">Joe</div>
                            <p className="text-xs text-muted-foreground">
                              +20.1% from last month
                            </p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    </>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
