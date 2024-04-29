import { useEffect, useRef, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";

interface MenuButtonProps {
  item: { id: number };
  deleteCategory: (id: number) => void;
}

export const MenuButton = ({ item, deleteCategory }: MenuButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.SyntheticEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleDeleteCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
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
      <RxDotsHorizontal className="h-8 w-8 rounded-full p-2 transition-all hover:bg-slate-200" onClick={toggleMenu} />
      {isOpen && (
        <div ref={menuRef} className="absolute right-0 z-50 mt-2 rounded-md bg-white shadow-lg">
          <button type="button" className="block w-full rounded-t-md px-4 py-2 text-left hover:bg-gray-100">
            Přejmenovat
          </button>
          <button
            type="button"
            className="block w-full rounded-b-md px-4 py-2 text-left hover:bg-gray-100"
            onClick={(e) => handleDeleteCategory(e, item.id)}
          >
            Smazat
          </button>
        </div>
      )}
    </div>
  );
};
