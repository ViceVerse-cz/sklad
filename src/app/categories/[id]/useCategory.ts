import { useState } from "react";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";

export const useCategory = (categoryId: number) => {
  const { data: stats } = api.category.getStats.useQuery(categoryId);
  const { data, refetch: refetchCategory } =
    api.category.getCategory.useQuery(categoryId);

  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const changeProduct = <T>(
    property: keyof Product & string,
    value: T,
  ): void => {
    if (!editingProduct) return;

    setEditingProduct({
      ...editingProduct,
      [property]: value,
    });
  };

  const { mutateAsync: editProduct, isLoading: isEditingProduct } =
    api.product.edit.useMutation();

  const onEditProduct = async () => {
    if (!editingProduct) return;

    await editProduct({
      id: editingProduct.id,
      name: editingProduct.name,
      price: Number(editingProduct.price),
    });

    await refetchCategory();
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
