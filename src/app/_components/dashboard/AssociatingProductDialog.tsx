import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";
import { useState } from "react";
import Select from "react-select";

type Props = {
  categoryId: number;
  product: boolean;
  onClose: VoidFunction;
  onSuccess: VoidFunction;
};

export const AssociatingProductDialog = ({
  categoryId,
  product,
  onClose,
  onSuccess,
}: Props) => {
  const {
    data: products,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = api.product.listAll.useQuery({
    notShowAssociatedCategoryId: categoryId,
  });
  const { mutateAsync: associateProducts } =
    api.category.associateProducts.useMutation();

  const [selectedProducts, setSelectedProducts] = useState<string[]>();

  const onAssociateProduct = async () => {
    if (!selectedProducts) return;

    onClose();

    await associateProducts({
      categoryId,
      productIds: selectedProducts,
    });

    await refetchProducts();
    onSuccess();
  };

  return (
    <Dialog
      open={product}
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <h1>Asociovat produkt</h1>

        <Select
          options={products?.map((product: Product) => ({
            label: product.name,
            value: product.id,
          }))}
          onChange={(selected) => {
            setSelectedProducts(
              (selected as unknown as { label: string; value: string }[]).map(
                (product) => product.value,
              ),
            );
          }}
          isLoading={productsLoading}
          isMulti
        />

        <Button onClick={onAssociateProduct} className="w-fit">
          Asociovat produkty
        </Button>
      </DialogContent>
    </Dialog>
  );
};
