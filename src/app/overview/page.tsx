import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentSales } from "../_components/dashboard/RecentSales";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Stats } from "../_components/dashboard/Stats";
import { Overview } from "../_components/dashboard/overview";

export default () => {
  return (
    <div>
      <Tabs defaultValue="overview" className="mt-4 h-full space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Overview />

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Stats />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Poslední akce</CardTitle>
                <CardDescription />
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
