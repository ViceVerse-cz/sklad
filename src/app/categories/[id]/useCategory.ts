import { useState, useCallback } from "react";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";

export const useCategory = (categoryId: number) => {
  const { data: stats } = api.category.getStats.useQuery(categoryId);
  const { data, refetch: refetchCategory } =
    api.category.getCategory.useQuery(categoryId);

  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [creatingProduct, setCreatingProduct] = useState<Product | undefined>();

  const addProduct = useCallback(
    <T>(property: keyof Product & string, value: T) => {
      setCreatingProduct((prevProduct) => {
        if (!prevProduct) return undefined;

        return {
          ...prevProduct,
          [property]: value,
        };
      });
    },
    [],
  );

  const changeProduct = useCallback(
    <T>(property: keyof Product & string, value: T) => {
      setEditingProduct((prevProduct) => {
        if (!prevProduct) return undefined;

        return {
          ...prevProduct,
          [property]: value,
        };
      });
    },
    [],
  );

  const { mutateAsync: editProduct, isLoading: isEditingProduct } =
    api.product.edit.useMutation();

  const { mutateAsync: createProduct } = api.product.create.useMutation();

  const onCreateProduct = async () => {
    if (!creatingProduct) return;

    await createProduct({
      name: creatingProduct.name,
      price: Number(creatingProduct.price),
      defaultQuantity: creatingProduct.quantity,
      description: creatingProduct.description ?? "Popisek nezadán",
      defaultCategoryId: categoryId,
    });

    refetchCategory();
    setCreatingProduct(undefined);
  };

  const onEditProduct = async () => {
    if (!editingProduct) return;

    await editProduct({
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
    createProduct,
    creatingProduct,
    setCreatingProduct,
    onCreateProduct,
    addProduct,
    stats,
    data,
    refetchCategory,
  };
};
