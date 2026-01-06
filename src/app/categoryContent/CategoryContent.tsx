"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MainTitle from "@/src/components/mainTitle";
import Metr from "../../assets/img/5025.png";
import Body from "../../assets/img/2704.png";
import Handly from "../../assets/img/9606.png";
import Electricy from "../../assets/img/2236.png";
import Gass from "../../assets/img/9565.png";
import Cheft from "../../assets/img/1173.png";
import Baghbani from "../../assets/img/2470.png";
import TamirGahi from "../../assets/img/2202.png";
import Looleh from "../../assets/img/1178.png";
import Joosh from "../../assets/img/2420.png";
import General from "../../assets/img/6016.png";
import Light from "../../assets/img/3032.png";
import Other from "../../assets/img/2943.png";
import Chargy from "../../assets/img/7715.png";
import DefaultImage from "../../assets/img/6016.png";

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
  id: number;
  title_per: string;
}

interface CategoryContentPageProps {
  categories?: CategoryItem[] | { data?: CategoryItem[] } | null;
}

const CategoryContentPage: React.FC<CategoryContentPageProps> = ({
  categories,
}) => {
  const swiperRef = useRef<any>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  const safeCategories: CategoryItem[] = Array.isArray(categories)
    ? categories
    : Array.isArray(categories?.data)
    ? categories.data
    : [];

  const getImageByIndex = (index: number) => {
    return categoryImages[index] || DefaultImage;
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    setLoadedImages(new Array(safeCategories.length).fill(false));
  }, [safeCategories.length]);

  if (!safeCategories.length) return null;

  return (
    <div className="flex mt-10 justify-center bg-white">
      <div className="w-full max-w-7xl px-4">
        <MainTitle title="دسته‌بندی محصولات" />
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={500}
          loop={safeCategories.length > 5}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 10 },
          }}
        >
          {safeCategories.map((item, index) => {
            const image = getImageByIndex(index);
            const imageSrc = image?.src || DefaultImage.src;

            return (
              <SwiperSlide key={item.id}>
                <div className="h-full flex flex-col items-center">
                  <Link
                    href={`/category/${item.id}`}
                    className="group w-full h-full flex flex-col items-center p-4 bg-white border border-gray-200 transition-all duration-300"
                  >
                    <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 flex items-center justify-center">
                      {!loadedImages[index] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                      )}

                      <img
                        src={imageSrc}
                        alt={item.title_per}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                          e.currentTarget.src = DefaultImage.src;
                          handleImageLoad(index);
                        }}
                        className={`w-full h-full object-contain transition-all duration-500 ${
                          loadedImages[index]
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                        }`}
                      />
                    </div>

                    <span className="text-sm md:text-base font-semibold text-gray-700 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title_per}
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryContentPage;
