import { useState } from 'react';
import { api } from '@/trpc/react';
import { Product } from '@prisma/client';

export const useCategory = (categoryId: number) => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const changeProduct = <T,>(
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

    await editProduct({ id: editingProduct.id, name: 'new name' });
    setEditingProduct(undefined);
  };

  const { data: stats } = api.category.getStats.useQuery(categoryId);
  const { data } = api.category.getCategory.useQuery(categoryId);

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