"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { MenuButton } from "./MenuButton";
import { WarningPopup } from "./WarningPopup";

export const Overview = () => {
  const {
    data,
    isLoading,
    refetch: refetchCategories,
  } = api.category.listCategories.useQuery();

  const deleteCategoryMutation = api.category.deleteCategories.useMutation({
    onSuccess: () => refetchCategories(),
  });
  const [deletingCategoryId, setDeletingCategoryId] = useState<
    number | undefined
  >();

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const toggleCreateCategoryOpen = () => setCreateCategoryOpen((prev) => !prev);

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={toggleCreateCategoryOpen}
        className="w-fit"
        variant="default"
      >
        Přidat kategorii
      </Button>

      <WarningPopup
        onConfirm={() => {
          if (deletingCategoryId) {
            deleteCategoryMutation.mutate(deletingCategoryId);
            setDeletingCategoryId(undefined);
          }
        }}
        onClose={() => setDeletingCategoryId(undefined)}
        open={!!deletingCategoryId}
        text="Opravdu chcete smazat kategorii?"
      />

      <Carousel className="w-full">
        <CarouselContent>
          {data?.map((item) => (
            <CarouselItem key={item.id}>
              <Link href={`categories/${item.id}`}>
                <Card className="hover:cursor-pointer hover:bg-gray-50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Kategorie
                    </CardTitle>
                    <MenuButton
                      item={item}
                      deleteCategory={setDeletingCategoryId}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.name}</div>
                    <p className="text-xs text-muted-foreground">
                      Počet produktů: {item.productCount}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <CreateCategoryDialog
        open={createCategoryOpen}
        onClose={toggleCreateCategoryOpen}
        onSuccess={refetchCategories}
      />
    </div>
  );
};
