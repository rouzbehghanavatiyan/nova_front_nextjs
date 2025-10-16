import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  ArchiveBoxIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import img1 from "@/src/assets/img/1295.png";
import img1104 from "@/src/assets/img/1104.png";
import img10100 from "@/src/assets/img/0100.png";
import img1178 from "@/src/assets/img/1178.png";
import { categoryServices } from "@/src/api/services/categoryServices";

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

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 50);
    return () => clearTimeout(timer);
  }, []);

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

  const categoryImages = [img1, img1104, img10100, img1178];

  const getCategoryImage = (categoryId: string) => {
    const index =
      categories.findIndex((cat) => cat.id === categoryId) %
      categoryImages.length;
    return categoryImages[index];
  };

  return (
    <div
      className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-40 transform transition-all duration-500 ease-out ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">دسته‌بندی محصولات</h2>
          <button
            onClick={() => setIsProductsPanelOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex gap-8">
          <div className="w-1/4    pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              دسته‌بندی‌ها
            </h3>
            <div className="">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div
                    className={`flex items-center justify-between p-3 ${
                      hoveredCategory === category.id
                        ? " text-blue-700  "
                        : // scale-[1.02]
                          "  "
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                        <img
                          className="w-6 h-6 object-contain"
                          src={getCategoryImage(category.id).src}
                          alt={category.title_per}
                        />
                      </div> */}
                      <Link
                        href={`/category/categoryId=${category.id}`}
                        onClick={() => setIsProductsPanelOpen(false)}
                        className="font-medium font11 flex-1 text-right hover:text-blue-600 transition-colors duration-200"
                      >
                        {category.title_per}
                      </Link>
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
              <div className="animate-fadeIn">
                <div className="flex items-start justify-around gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    زیردسته‌های{" "}
                    {
                      categories.find((cat) => cat.id === hoveredCategory)
                        ?.title_per
                    }
                  </h3>
                  <div className="  rounded-lg flex items-center justify-center">
                    <img
                      className="w-100 h-100 object-contain"
                      src={getCategoryImage(hoveredCategory).src}
                      alt={
                        categories.find((cat) => cat.id === hoveredCategory)
                          ?.title_per
                      }
                    />
                  </div>
                </div>

                {loading === hoveredCategory ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2  "></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {subCategories[hoveredCategory]?.map(
                      (subCategory, index) => (
                        <Link
                          key={subCategory.id}
                          href={`/category/${subCategory.slug}`}
                          onClick={() => setIsProductsPanelOpen(false)}
                          className="group p-4 rounded-lg hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200 text-center transform hover:scale-[1.02] hover:shadow-sm"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors duration-200">
                            <img
                              className="w-10 h-10 object-contain"
                              src={
                                subCategory.image ||
                                categoryImages[index % categoryImages.length]
                                  .src
                              }
                              alt={subCategory.title_per}
                            />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200 text-sm">
                            {subCategory.title_per}
                          </span>
                        </Link>
                      )
                    )}

                    {(!subCategories[hoveredCategory] ||
                      subCategories[hoveredCategory].length === 0) && (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        هیچ زیردسته‌ای یافت نشد
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
