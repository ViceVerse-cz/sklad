"use client"
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
import { RxDotsHorizontal } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";

export const Overview = () => {
  const { data, isLoading } = api.category.listCategories.useQuery();
  const deleteCategoryMutation = api.category.deleteCategories.useMutation();

  if (isLoading) {
    return "Načítání..."
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <Link href={`categories/${item.id}`}>
              <Card className="hover:cursor-pointer hover:bg-gray-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Kategorie
                  </CardTitle>
                  <MenuButton item={item} deleteCategory={deleteCategoryMutation.mutate} />
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
  );
};

const MenuButton = ({ item, deleteCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleDeleteCategory = (e, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    deleteCategory(id);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <RxDotsHorizontal className="rounded-full hover:bg-slate-200 p-2 h-8 w-8 transition-all" onClick={toggleMenu} />
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 rounded-md bg-white shadow-lg"
        >
          <button type="button" className="block w-full rounded-t-md px-4 py-2 text-left hover:bg-gray-100">
            Přejmenovat
          </button>
          <button type="button" className="block w-full rounded-b-md px-4 py-2 text-left hover:bg-gray-100" onClick={(e) => handleDeleteCategory(e, item.id)}>
            Smazat
          </button>
        </div>
      )}
    </div>
  );
};
