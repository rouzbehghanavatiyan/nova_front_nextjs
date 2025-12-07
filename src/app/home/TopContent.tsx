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
import ChildLoading from "@/src/components/childLoading";

interface TopContentProps {
  setIsProductsPanelOpen?: (isOpen: boolean) => void;
}

const TopContent: React.FC<TopContentProps> = ({ setIsProductsPanelOpen }) => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const swiperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const handleImageClick = useCallback(() => {
    dispatch(RsetIsOpenMegaMenu(false));
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;

      // بررسی آیا تمام عکس‌ها لود شده‌اند
      const allImagesLoaded = newLoaded.every((loaded) => loaded === true);
      if (allImagesLoaded) {
        setImagesLoaded(true);
      }

      return newLoaded;
    });
  };

  const handleAllImagesLoaded = useCallback(() => {
    setTimeout(() => {
      setImagesLoaded(true);
    }, 300);
  }, []);

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
    try {
      setIsLoading(true);
      const products: any = await productService.getMainCover();
      setMainProduct(products.data);
      setIsDataLoaded(true);

      // تنظیم آرایه loadedImages بر اساس تعداد محصولات
      setLoadedImages(new Array(products.data.length).fill(false));

      // ریست رفرنس عکس‌ها
      imageRefs.current = new Array(products.data.length);
    } catch (error) {
      console.error("Error loading main cover:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // بررسی لود شدن تمام عکس‌ها
  useEffect(() => {
    if (isDataLoaded && loadedImages.length > 0) {
      const timer = setTimeout(() => {
        const allLoaded = loadedImages.every((loaded) => loaded);
        if (!allLoaded) {
          // اگر بعد از 5 ثانیه برخی عکس‌ها لود نشدند، باز هم نمایش دهیم
          console.warn(
            "Some images took too long to load, showing content anyway"
          );
          setImagesLoaded(true);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isDataLoaded, loadedImages]);

  // بررسی لود شدن تصاویر از cache
  useEffect(() => {
    if (mainProduct.length > 0) {
      let allCached = true;

      mainProduct.forEach((item, index) => {
        const imageUrl = `${StringHelpers.baseURL}/${item?.attachmentType}/${item?.fileName}${item?.ext}`;
        const img = new Image();
        img.src = imageUrl;

        if (img.complete) {
          // عکس در cache است
          handleImageLoad(index);
        } else {
          allCached = false;
        }
      });

      if (allCached) {
        handleAllImagesLoaded();
      }
    }
  }, [mainProduct, handleAllImagesLoaded]);

  useEffect(() => {
    handleGetMainCover();
  }, []);

  if (isLoading || !isDataLoaded) {
    return (
      <div className="w-full h-[94vh] flex items-center justify-center bg-gray-100">
        <ChildLoading />
      </div>
    );
  }

  if (!imagesLoaded && isDataLoaded) {
    return (
      <div className="w-full h-[94vh] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <ChildLoading />
        </div>
      </div>
    );
  }

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
          waitForTransition: true,
        }}
        speed={1000}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        className="mySwiper h-[94vh]"
        effect="fade"
        watchSlidesProgress={true}
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
                      ref={(el) => {
                        if (el) imageRefs.current[index] = el;
                      }}
                      src={imageUrl}
                      alt={`Slide ${index + 1}`}
                      className={`w-full h-full object-cover transition-all duration-1000 ease-in-out cursor-pointer ${
                        loadedImages[index]
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      }`}
                      onLoad={() => {
                        handleImageLoad(index);
                        if (index === mainProduct.length - 1) {
                          handleAllImagesLoaded();
                        }
                      }}
                      onError={(e) => {
                        console.error(`Error loading image: ${imageUrl}`);
                        handleImageLoad(index);
                        // نمایش تصویر جایگزین در صورت خطا
                        e.currentTarget.src = "/images/placeholder.jpg";
                      }}
                      onClick={handleImageClick}
                      loading="eager" // تغییر به eager برای اولویت بالاتر
                      crossOrigin="anonymous"
                      data-ignore-click-outside="true"
                      style={{
                        transition:
                          "opacity 1s ease-in-out, transform 1s ease-in-out",
                      }}
                      sizes="100vw"
                      decoding="async"
                    />
                  </span>

                  {/* Content Overlay */}
                  <div
                    className={`absolute max-w-[40vh] top-10 left-10 p-5 bg-[rgba(255,255,255,0.4)] z-10 transform transition-all duration-1000 ${
                      loadedImages[index]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    data-ignore-click-outside="true"
                  >
                    <p className="font30 font-bold text-gray-950 my-5 transform transition-all duration-1000 delay-300">
                      {item?.title}
                    </p>
                    <div className="flex justify-end transform transition-all duration-1000 delay-500">
                      <Button
                        onClick={() => handleRedirect(item)}
                        style={{ backgroundColor: "#0068b1" }}
                        className={`rounded-none px-10 h-12 font15 transform transition-all duration-300 ${
                          loadedImages[index]
                            ? "opacity-100 translate-y-0 hover:scale-105"
                            : "opacity-0 translate-y-4"
                        }`}
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
