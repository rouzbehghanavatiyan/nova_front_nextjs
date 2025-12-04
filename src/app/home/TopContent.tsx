import React, { useEffect, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { RsetIsOpenMegaMenu } from "@/src/store/slices/main";
import { useAppDispatch } from "@/src/store/hook";

interface TopContentProps {
  setIsProductsPanelOpen?: (isOpen: boolean) => void;
}

const TopContent: React.FC<TopContentProps> = ({ setIsProductsPanelOpen }) => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const swiperRef = useRef<HTMLDivElement>(null);

  const handleImageClick = useCallback(() => {
    dispatch(RsetIsOpenMegaMenu(false));
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleRedirect = (data: any) => {
    if (data?.categoryId !== null) {
      const productId = data.product_id;
      const updatedData = {
        ...data,
        attachments: [
          {
            ext: data?.ext,
            fileName: data?.fileName,
            attachmentType: "img",
          },
        ],
      };
      console.log(data);
      sessionStorage.setItem("currentProduct", JSON.stringify(updatedData));
      router.push(`/products/${productId}`);
    } else {
      router.push(`/category/${data?.subcategoryId}`);
    }
  };

  const handleGetMainCover = async () => {
    const products: any = await productService.getMainCover();
    setMainProduct(products.data);
  };

  useEffect(() => {
    handleGetMainCover();
  }, []);

  return (
    <div
      ref={swiperRef}
      className="gap-5 relative"
      data-ignore-click-outside="true"
    >
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        className="mySwiper h-[94vh]"
        effect="fade"
      >
        {mainProduct.map((item: any, index) => {
          const imageUrl = `${StringHelpers.baseURL}/${item?.attachmentType}/${item?.fileName}${item?.ext}`;
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full">
                  <span
                    data-menu-image
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("close-mega-menu"));
                    }}
                    className="forImage"
                  >
                    <img
                      src={imageUrl}
                      alt={`Slide ${index + 1}`}
                      className={`w-full h-full object-cover transition-all duration-1000 ease-in-out cursor-pointer ${
                        loadedImages[index]
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageLoad(index)}
                      onClick={handleImageClick}
                      loading="lazy"
                      crossOrigin="anonymous"
                      data-ignore-click-outside="true"
                      style={{
                        transition:
                          "opacity 1s ease-in-out, transform 1s ease-in-out",
                      }}
                    />
                  </span>
                  {!loadedImages[index] && (
                    <div
                      className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center cursor-pointer"
                      onClick={handleImageClick} 
                    >
                      <div className="text-gray-400">Loading...</div>
                    </div>
                  )}
                  <div
                    className="absolute max-w-[40vh] top-10 left-10 p-5 bg-[rgba(0,0,0,0.4)] z-10 transform"
                    data-ignore-click-outside="true"
                  >
                    <p className="font30 font-bold text-white my-5 transform transition-all duration-1000 delay-700">
                      {item?.title}
                    </p>
                    <div className="flex justify-end transform transition-all duration-1000 delay-900">
                      <Button
                        onClick={() => handleRedirect(item)}
                        style={{ backgroundColor: "#0068b1" }}
                        className="rounded-none px-10 h-12 font15 transform transition-transform hover:scale-105"
                        color="primary"
                        variant="solid"
                        data-ignore-click-outside="true"
                      >
                        اطلاعات بیشتر
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopContent;
