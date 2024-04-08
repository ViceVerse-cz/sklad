import { api } from "@/trpc/server";

export default async ({ params }: { params: { id: string } }) => {
  const category = await api.category.getCategory.query(Number(params.id));

  return (
    <div className="space-y-8">
      <h1 className="mt-3 text-4xl font-bold">
        Kategorie {category.category?.name}
      </h1>

      {/** TODO: MICHAL DODEALT */}
    </div>
  );
};
