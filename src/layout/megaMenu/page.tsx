import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { RsetIsOpenMegaMenu } from "@/src/store/slices/main";
import StringHelpers from "@/src/config/StringHelpers";

const MegaMenu: React.FC<any> = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: any[] }>(
    {},
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

  const handleCategoryHover = (category: any) => {
    setHoveredCategory(category?.categoryid);
    if (!subCategories[category?.categoryid]) {
      fetchSubCategories(category?.categoryid);
    }
  };

  const getCategoryImage = (categoryId: string) => {
    const category = categories.find((cat: any) => cat.id === categoryId);
    if (!category) return "";
    return `${StringHelpers.baseURL}/${category.attachmentType}/${category.code}${category.ext}`;
  };

  const getCategoryIcon = (categoryId: string): any => {
    const category = categories.find((cat: any) => cat.id === categoryId);
    if (!category) return "";
    return `${StringHelpers.baseURL}/${category.attachmentType}/${category.code}${category.ext}`;
  };

  useEffect(() => {
    if (!main?.isOpenMegaMenu) return;
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
    console.log(hoveredCategory, subCategories);

    if (hoveredCategory && subCategories[hoveredCategory]) {
      setCurrentSubCategories(subCategories[hoveredCategory]);
    } else {
      setCurrentSubCategories([]);
    }
  }, [hoveredCategory, subCategories]);

  return (
    <div
      ref={menuRef}
      className={`absolute 
        top-full right-0 w-full
        bg-white backdrop-blur-md border-t border-gray-200 shadow-lg z-40 
        transform transition-all duration-500 ease-out ${
          main?.isOpenMegaMenu
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
    >
      <div className="">
        <div className="flex">
          <div className="">
            <div className="py-4 ">
              {categories?.map((category: any) => {
                const image = `${StringHelpers.baseURL}/${category?.attachmentType}/${category?.code}${category?.ext}`;
                return (
                  <div
                    key={category.id}
                    className="relative group "
                    onMouseEnter={() => handleCategoryHover(category)}
                  >
                    <div className={`flex items-center justify-between`}>
                      <div className="ms-5 mt-2 flex items-center flex-1">
                        <img
                          className="w-9 h-9 me-5 object-contain"
                          src={image}
                          alt={category.categoryname}
                        />
                        <Link
                          key={category.id}
                          href={`/category/${category?.categoryid}`}
                          onClick={() => dispatch(RsetIsOpenMegaMenu(false))}
                          className="
                          text hover:bg-gray-100 cursor-pointer grid grid-cols-1 font13 flex-1 text-right 
                          hover:font-bold hover:font16 py-2 px-28 ps-2 transition-colors duration-200"
                        >
                          {category.categoryname}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 bg-gray-100 py-4">
            {hoveredCategory && (
              <div className="flex justify-around">
                <div className="w-96">
                  <div
                    className=""
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
                          <span className="font-medium  font12 text-gray-700 hover:scale-105 hover:font-bold inline-block cursor-pointer">
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
                      src={getCategoryImage(hoveredCategory)}
                      alt={
                        categories.find(
                          (cat: any) => cat.id === hoveredCategory,
                        )?.categoryname
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
