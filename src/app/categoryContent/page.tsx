"use client";
import React, { useState, useEffect, useRef } from "react";
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
import DefaultImage from "@/src/assets/img/6016.png";

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
  DefaultImage,
  Joosh,
  General,
  Light,
  Other,
  Chargy,
];

interface CategoryItem {
  title_per: string;
  id: number;
}

interface CategoryContentPageProps {
  categories: CategoryItem[] | null | undefined;
}

const CategoryContentPage: React.FC<any> = ({ categories }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getImageByIndex = (index: number) => {
    if (!categoryImages || categoryImages.length === 0) {
      return DefaultImage;
    }

    if (index >= 0 && index < categoryImages.length) {
      const image = categoryImages[index];
      if (!image || typeof image === "string") {
        return DefaultImage;
      }
      return image;
    }
    return DefaultImage;
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!categories) {
    return (
      <div className="flex justify-center py-8 items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            دسته‌بندی‌ها
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 p-8">
            <p className="text-yellow-700 text-lg">
              اطلاعات دسته‌بندی‌ها در دسترس نیست.
            </p>
            <p className="text-gray-600 mt-2">
              لطفاً دوباره تلاش کنید یا صفحه را رفرش نمایید.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="flex justify-center py-8 items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            دسته‌بندی‌ها
          </h2>
          <div className="bg-gray-100 p-8">
            <p className="text-gray-600 text-lg">هیچ دسته‌بندی‌ای یافت نشد.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8 items-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          دسته‌بندی‌ها
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {categories.map((item, index) => {
            const image = getImageByIndex(index);

            return (
              <div
                key={item.id || index}
                className="group flex flex-col items-center justify-center p-5 bg-white 
                  shadow-lg hover:shadow-2xl transition-all duration-300 
                transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
              >
                <div className="w-44 h-44 flex items-center justify-center mb-4 p-3">
                  {image && image.src ? (
                    <img
                      src={image.src}
                      alt={item.title_per || `Category ${index + 1}`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = DefaultImage.src;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">بدون تصویر</span>
                    </div>
                  )}
                </div>
                <span className="text-sm md:text-base font-semibold text-gray-700 text-center line-clamp-2">
                  {item?.title_per || `دسته ${index + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryContentPage;
