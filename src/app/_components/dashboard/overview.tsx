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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { MenuButton } from "./MenuButton";
import { WarningPopup } from "./WarningPopup";
import { AddProductDialog } from "./AddProductDialog";
import { Product } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export const Overview = () => {
  const { toast } = useToast();

  const { data, refetch: refetchCategories } =
    api.category.listCategories.useQuery();

  const deleteCategoryMutation = api.category.deleteCategories.useMutation({
    onSuccess: () => refetchCategories(),
  });
  const [deletingCategoryId, setDeletingCategoryId] = useState<
    number | undefined
  >();

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const toggleCreateCategoryOpen = () => setCreateCategoryOpen((prev) => !prev);

  const [createProductOpen, setProductOpen] = useState(false);
  const [createProduct, setCreateProduct] = useState<Product | undefined>(
    undefined,
  );
  const changeProduct = (
    field: Exclude<keyof Product, "id">,
    value: string | number,
  ) => {
    setCreateProduct((prev) => {
      if (!prev) {
        return {
          id: 0,
          name: "",
          description: null,
          price: 0,
          visibility: "PUBLIC",
          quantity: 0,
          [field]: value,
        } as any;
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    console.log(createProduct);
  };
  const toggleCreateProductOpen = () => setProductOpen((prev) => !prev);
  const { mutateAsync: createProductAsync } = api.product.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Produkt vytvořen",
        description: "Produkt byl úspěšně vytvořen.",
      });
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <Button
          onClick={toggleCreateCategoryOpen}
          className="w-fit"
          variant="default"
        >
          Přidat kategorii
        </Button>

        <Button
          onClick={toggleCreateProductOpen}
          className="w-fit"
          variant="default"
        >
          Přidat produkt
        </Button>
      </div>

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
          {data?.map((item: any) => (
            <CarouselItem className="md:w-1/3 sm:w-1/2 w-full" key={item.id}>
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
      <AddProductDialog
        open={createProductOpen}
        onAddProduct={changeProduct}
        creatingProduct={createProduct}
        onCreateProduct={() => {
          if (createProduct) {
            // TODO: Refactor this shit
            createProductAsync({
              ...createProduct,
              defaultQuantity: createProduct.quantity,
              description: createProduct.description ?? "Popisek nebyl zadán",
              price: Number(createProduct.price),
            });

            setCreateProduct(undefined);
            toggleCreateProductOpen();

            // Reset the form
            changeProduct("name", "");
            changeProduct("price", 0);
            changeProduct("quantity", 0);
            changeProduct("description", "");
          }
        }}
        onOpenChange={toggleCreateProductOpen}
      />
    </div>
  );
};
