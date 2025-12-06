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
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MainTitle from "@/src/components/mainTitle";

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

// interface CategoryContentPageProps {
//   categories: CategoryItem[] | null | undefined;
// }

const CategoryContentPage: React.FC<any> = ({ categories }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    // شبیه‌سازی لود داده‌ها
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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

  const handleRedirectSubCategory = (item: any) => {
    console.log("Redirecting to category:", item);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  // مقداردهی اولیه loadedImages
  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      setLoadedImages(new Array(categories.length).fill(false));
    }
  }, [categories]);

  if (!isClient || isLoading) {
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
          <h2 className="font25 font-bold text-center mb-10 text-gray-800">
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
    <div className="flex justify-center items-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl px-4">
        <MainTitle title="دسته‌بندی‌ها" />
        <Swiper
          navigation={true}
          fadeEffect={{
            crossFade: true,
          }}
          ref={swiperRef}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={500}
          loop={categories.length > 5}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
          }}
        >
          {categories.map((item, index) => {
            const image = getImageByIndex(index);
            const imageSrc = image?.src || DefaultImage.src;
            return (
              <SwiperSlide key={item.id || index}>
                <div className="h-full flex flex-col items-center justify-center">
                  <Link
                    // href={`/category/${item?.id}`}
                    href={`/#`}
                    onClick={() => handleRedirectSubCategory(item)}
                    className="group w-full flex flex-col items-center justify-center p-4 bg-white 
                      shadow-lg transition-all duration-300 
                      transform border border-gray-100 cursor-pointer
                      h-full"
                  >
                    <div className="w-36 h-36 md:w-44 md:h-44 flex items-center justify-center mb-4 p-2 relative">
                      {!loadedImages[index] && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg"></div>
                      )}
                      <img
                        src={imageSrc}
                        alt={item.title_per || `Category ${index + 1}`}
                        className={`w-full h-full object-contain transition-all duration-500 ${
                          loadedImages[index]
                            ? "opacity-100 scale-100 group-hover:scale-110"
                            : "opacity-0 scale-95"
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                          console.error(
                            `Error loading image for category: ${item.title_per}`
                          );
                          e.currentTarget.src = DefaultImage.src;
                          handleImageLoad(index);
                        }}
                        crossOrigin="anonymous"
                      />
                    </div>

                    <span className="text-sm md:text-base font-semibold text-gray-700 text-center line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
                      {item?.title_per || `دسته ${index + 1}`}
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
