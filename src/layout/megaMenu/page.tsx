import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Metr from "@/src/assets/img/5025.png";
import Body from "@/src/assets/img/2704.png";
import Handly from "@/src/assets/img/9606.png";
import Electricy from "@/src/assets/img/2236.png";
import Gass from "@/src/assets/img/9565.png";
import Cheft from "@/src/assets/img/1173.png";
import Baghbani from "@/src/assets/img/2470.png";
import TamirGahi from "@/src/assets/img/2202.png";
import Looleh from "@/src/assets/img/1178.png";
import Joosh from "@/src/assets/img/2420.png";
import General from "@/src/assets/img/6016.png";
import Light from "@/src/assets/img/3032.png";
import Other from "@/src/assets/img/2943.png";
import Chargy from "@/src/assets/img/7715.png";
import { categoryServices } from "@/src/api/services/categoryServices";

const categoryImages = [
  Metr,
  Body,
  Handly,
  Electricy,
  Gass,
  Cheft,
  Baghbani,
  TamirGahi,
  Looleh,
  "",
  Joosh,
  General,
  Light,
  Other,
  Chargy,
];

interface MegaMenuProps {
  setIsProductsPanelOpen: (isOpen: boolean) => void;
  categories: any[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  setIsProductsPanelOpen,
  categories,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: any[] }>(
    {}
  );
  const [loading, setLoading] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSubCategories, setCurrentSubCategories] = useState<any[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchSubCategories = async (categoryId: string) => {
    setLoading(categoryId);
    try {
      const res: any = await categoryServices.getSubCategories(categoryId);
      setSubCategories((prev) => ({
        ...prev,
        [categoryId]: res?.data || [],
      }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategories((prev) => ({
        ...prev,
        [categoryId]: [],
      }));
    } finally {
      setLoading(null);
    }
  };

  const handleCategoryHover = (categoryId: string) => {
    setHoveredCategory(categoryId);
    if (!subCategories[categoryId]) {
      fetchSubCategories(categoryId);
    }
  };

  const getCategoryImage = (categoryId: string): any => {
    const index =
      categories.findIndex((cat) => cat.id === categoryId) %
      categoryImages.length;
    return categoryImages[index];
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTimeout(() => {
          setIsProductsPanelOpen(false);
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsProductsPanelOpen]);

  useEffect(() => {
    if (hoveredCategory && subCategories[hoveredCategory]) {
      setCurrentSubCategories(subCategories[hoveredCategory]);
    } else {
      setCurrentSubCategories([]);
    }
  }, [hoveredCategory, subCategories]);

  return (
    <div
      ref={menuRef}
      className={`absolute top-full left-0 w-full h-[60vh] bg-white backdrop-blur-md border-t border-gray-200 shadow-lg z-40 transform transition-all duration-500 ease-out ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="container mx-auto pt-6 ">
        <div className="flex gap-8">
          <div className="w-1/7 pl-6">
            <div className="">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => handleCategoryHover(category.id)}
                >
                  <div
                    className={`flex items-center justify-between p-2 ${
                      hoveredCategory === category.id ? "text-blue-700" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className=" font13 flex-1 text-right hover:scale-105  hover:text-blue-600 transition-colors duration-200">
                        {category.title_per}
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`w-4 h-4  flex-shrink-0 transition-transform duration-200 ${
                        hoveredCategory === category.id
                          ? "rotate-180 text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            {hoveredCategory && (
              <div className="flex justify-around">
                <div className="w-96">
                  <div
                    className="p-2"
                    style={{
                      columnCount: currentSubCategories.length > 14 ? 2 : 1,
                      maxHeight: "60vh",
                    }}
                  >
                    {currentSubCategories.map((subCategory, index) => {
                      return (
                        <Link
                          key={subCategory.id}
                          href={`/category/${subCategory.id}`}
                          onClick={() => {
                            setIsOpen(false);
                            setTimeout(() => {
                              setIsProductsPanelOpen(false);
                            }, 300);
                          }}
                          className="block hover:text-blue-600 transform  transition-all duration-200 mb-3 break-inside-avoid"
                        >
                          <span className="font-medium font12 text-gray-700 hover:scale-105 inline-block cursor-pointer">
                            {subCategory.title}
                          </span>
                        </Link>
                      );
                    })}
                    {loading === hoveredCategory &&
                      currentSubCategories.length === 0 && (
                        <div className="flex justify-center items-center py-4 break-inside-avoid">
                          <div className="animate-spin h-6 w-6 border-b-2"></div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="w-1/3 flex items-start justify-center">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-4/5 h-4/5 object-contain"
                      src={getCategoryImage(hoveredCategory).src}
                      alt={
                        categories.find((cat) => cat.id === hoveredCategory)
                          ?.title_per
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
