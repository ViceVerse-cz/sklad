import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/trpc/server";
import { RxCross1 } from "react-icons/rx";

export const Overview = async () => {
  const categories = await api.category.listCategories.query();

  return (
    <Carousel className="w-full">
      <Button>Vytvořit kategorii</Button>

      <CarouselContent>
        {categories.map((item) => (
          <>
            <CarouselItem>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Kategorie
                  </CardTitle>
                  <RxCross1 />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.name}</div>
                  <p className="text-xs text-muted-foreground">
                    Počet produktů: {item.productCount}
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
  );
};
