"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MainTitle from "@/src/components/mainTitle";
import { useAppSelector } from "@/src/store/hook";
import StringHelpers from "@/src/config/StringHelpers";
import { categoryServices } from "@/src/api/services/categoryServices";

interface CategoryItem {
  id: number;
  title_per: string;
}

interface CategoryContentPageProps {
  categories?: CategoryItem[] | { data?: CategoryItem[] } | null;
}

const CategoryContentPage: React.FC<CategoryContentPageProps> = ({}) => {
  const swiperRef = useRef<any>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const main = useAppSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, safeCategories] = useState([]);
  const getImageByIndex = (index: number) => {
    const imagesForCategory = main?.moreImages?.filter(
      (img: any) => img.ext === ".png",
    );
    return imagesForCategory && imagesForCategory.length > 0
      ? imagesForCategory[0]
      : null;
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const handleGetCategories = async () => {
    try {
      setIsLoading(true);
      const res: any = await categoryServices.getAllCategories();
      setIsLoading(false);
      safeCategories(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

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
          loop={categories.length > 5}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 10 },
          }}
        >
          {categories.map((item: any, index) => {
            const image = `${StringHelpers.baseURL}/${item?.attachmentType}/${item?.code}${item?.ext}`;
            return (
              <SwiperSlide key={item.id}>
                <div className="h-full flex flex-col items-center">
                  <Link
                    href={`/category/${item.categoryid}`}
                    className="group w-full h-full flex flex-col items-center p-4 bg-white border border-gray-200 transition-all duration-300"
                  >
                    <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 flex items-center justify-center">
                      {!loadedImages[index] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                      )}
                      <img
                        src={image}
                        alt={item.categoryname}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
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
                      {item.categoryname}
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
