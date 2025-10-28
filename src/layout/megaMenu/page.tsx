import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import img1 from "@/src/assets/img/1295.png";
import img1104 from "@/src/assets/img/1104.png";
import img10100 from "@/src/assets/img/0100.png";
import img1178 from "@/src/assets/img/1178.png";
import { categoryServices } from "@/src/api/services/categoryServices";
const categoryImages = [img1, img1104, img10100, img1178];

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

  const getCategoryImage = (categoryId: string) => {
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
      className={`absolute top-full left-0 w-full h-[80vh] bg-white backdrop-blur-md border-t border-gray-200 shadow-lg z-40 transform transition-all duration-500 ease-out ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="container mx-auto py-6">
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
                    className={`flex items-center justify-between p-3 ${
                      hoveredCategory === category.id ? "text-blue-700" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="font-medium font11 flex-1 text-right hover:text-blue-600 transition-colors duration-200">
                        {category.title_per}
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
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
                <div className="w-">
                  <div
                    className="grid gap-3 max-h-[70vh] overflow-y-auto p-2"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
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
                          className="block p-3 hover:text-blue-600 transition-all duration-200"
                        >
                          <span className="font-semibold text-gray-700 text-sm line-clamp-2">
                            {subCategory.title}
                          </span>
                        </Link>
                      );
                    })}
                    {loading === hoveredCategory &&
                      currentSubCategories.length === 0 && (
                        <div className="flex justify-center items-center py-4 col-span-full">
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
