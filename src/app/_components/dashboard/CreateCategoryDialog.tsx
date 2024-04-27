import { Dialog, DialogContent } from "@/components/ui/dialog";
import Input from "../Popup/Input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState } from "react";
import Select from "react-select";
import { Category, Product } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Props = {
  open?: boolean;
  onClose: VoidFunction;
  onSuccess: VoidFunction;
};

type NewCategory = {
  name: string;
  productIds: number[];
};

export const CreateCategoryDialog = ({ open, onClose, onSuccess }: Props) => {
  const { toast } = useToast();

  const { mutateAsync: createCategory } =
    api.category.createCategory.useMutation({
      onSuccess: (data: Category) => {
        toast({
          title: "Kategorie vytvořena",
          description: "Kategorie byla úspěšně vytvořena.",
          action: (
            <ToastAction
              onClick={() => {
                window.location.href = "/categories/" + data.id;
              }}
              altText="Přejít na kategorii"
            >
              Přejít na kategorii
            </ToastAction>
          ),
        });
      },
    });
  const { data: products, isLoading: productsLoading } =
    api.product.listAll.useQuery({
      notShowAssociatedCategoryId: 0,
    });

  const [newData, setNewData] = useState<NewCategory>({
    name: "Nová kategorie",
    productIds: [],
  });
  const onNewDataChange = (key: keyof NewCategory, value: any) => {
    setNewData({
      ...newData,
      [key]: value,
    });
  };

  const onCategoryCreate = async () => {
    await createCategory({
      name: newData.name,
      productIds: newData.productIds,
    });

    onClose();
    onSuccess();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value: boolean) => {
        if (!value) onClose();
      }}
    >
      <DialogContent>
        <h1 className="text-2xl font-bold">Vytvořit novou kategorii</h1>
        <Input
          defaultValue={newData?.name}
          onChange={(e) => onNewDataChange("name", e.target.value)}
          type="text"
          label="Název kategorie"
        />

        <div>
          <label className="text-sm text-gray-700" htmlFor="multiSelect">
            Produkty
          </label>

          {productsLoading ? (
            <p>Načítání...</p>
          ) : (
            <Select
              id="multiSelect"
              closeMenuOnSelect={false}
              isMulti
              placeholder="Vyberte produkty"
              options={products?.map((item: Product) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(selected) => {
                onNewDataChange(
                  "productIds",
                  selected.map((item: any) => item.value),
                );
              }}
            />
          )}
        </div>

        <div className="mx-auto mr-0 flex w-fit flex-row gap-2">
          <Button
            type="submit"
            onClick={onCategoryCreate}
            className="w-fit"
            variant="default"
          >
            Vytvořit
          </Button>
          <Button onClick={onClose} variant="outline">
            Zrušit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
