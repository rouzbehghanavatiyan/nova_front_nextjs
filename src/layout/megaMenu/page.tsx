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
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { RsetIsOpenMegaMenu } from "@/src/store/slices/main";

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

const MegaMenu: React.FC<any> = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: any[] }>(
    {}
  );
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<string | null>(null);
  const main = useAppSelector((state) => state.product);
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
      categories.findIndex((cat: any) => cat.id === categoryId) %
      categoryImages.length;
    return categoryImages[index];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(RsetIsOpenMegaMenu(false));
        setTimeout(() => {
          dispatch(RsetIsOpenMegaMenu(false));
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      className={`absolute top-full left-0 w-full bg-white backdrop-blur-md border-t border-gray-200 shadow-lg z-40 transform transition-all duration-500 ease-out ${
        main?.isOpenMegaMenu
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="container  mx-auto">
        <div className="flex gap-8">
          <div className="w-[200px]">
            <div className="py-4">
              {categories?.map((category: any) => {
                console.log(category);
                return (
                  <div
                    key={category.id}
                    className="relative  group"
                    onMouseEnter={() => handleCategoryHover(category.id)}
                  >
                    <div
                      className={`flex  items-center justify-between p-2 ${
                        hoveredCategory === category.id ? "text-blue-700" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Link
                          key={category.id}
                          // href={`/category/${category?.id}`}
                          href={`/#`}
                          onClick={() => dispatch(RsetIsOpenMegaMenu(false))}
                          className="cursor-pointer font13 flex-1 text-right hover:scale-105  hover:text-blue-600 transition-colors duration-200"
                        >
                          {category.title_per}
                        </Link>
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
                );
              })}
            </div>
          </div>
          <div className="flex-1  py-4">
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
                          href={`/category/${subCategory?.categoryId}/subCategory/${subCategory.id}`}
                          onClick={() => {
                            dispatch(RsetIsOpenMegaMenu(false));
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
                        categories.find(
                          (cat: any) => cat.id === hoveredCategory
                        )?.title_per
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
