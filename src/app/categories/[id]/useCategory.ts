import { useState, useCallback } from "react";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";

export const useCategory = (categoryId: number) => {
  const { data: stats } = api.category.getStats.useQuery(categoryId);
  const { data, refetch: refetchCategory } = api.category.getCategory.useQuery(categoryId);

  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const changeProduct = useCallback(
    <T,>(property: keyof Product & string, value: T) => {
      setEditingProduct((prevProduct) => {
        if (!prevProduct) return undefined;

        return {
          ...prevProduct,
          [property]: value,
        };
      });
    },
    []
  );

  const { mutateAsync: editProduct, isLoading: isEditingProduct } =
    api.product.edit.useMutation();

  const onEditProduct = () => {
    if (!editingProduct) return;

    editProduct({
      id: editingProduct.id,
      name: editingProduct.name,
      price: Number(editingProduct.price),
    });

    refetchCategory();
    setEditingProduct(undefined);
  };

  return {
    editingProduct,
    setEditingProduct,
    changeProduct,
    isEditingProduct,
    onEditProduct,
    stats,
    data,
  };
};
