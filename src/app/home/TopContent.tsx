import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation"; // اضافه کردن استایل نویگیشن
import { Button, Spinner } from "@heroui/react"; // ایمپورت Spinner
import { useRouter } from "next/navigation";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";

const TopContent: React.FC<any> = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);  
  const router = useRouter();
  const swiperRef = useRef<HTMLDivElement>(null);

  const handleRedirect = (data: any) => {
    if (!!data?.redirect) {
      return router.push(`${data?.redirect}`);
    } else if (!!data?.categoryId && !data?.subcategoryId) {
      return router.push(`/category/${data?.categoryId}`);
    } else if (!!data?.categoryId && !!data?.subcategoryId) {
      return router.push(
        `/category/${data?.categoryId}/subCategory/${data?.subcategoryId}`,
      );
    } else {
      router.push(`/products/${data?.id}`);
    }
  };

  const handleGetMainCover = async () => {
    try {
      setIsDataLoading(true);
      const products: any = await productService?.getMainCover();

      if (products?.data) {
        setMainProduct(products?.data);
        setLoadedImages(Array(products.data.length).fill(false));
      }
    } catch (error) {
      console.error("Error loading main cover:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  useEffect(() => {
    handleGetMainCover();
  }, []);

  if (isDataLoading) {
    return (
      <div className="h-[94vh] w-full flex items-center justify-center bg-gray-100">
        <Spinner size="lg" label="در حال دریافت اطلاعات..." />
      </div>
    );
  }

  if (!isDataLoading && mainProduct.length === 0) {
    return null; 
  }

  return (
    <div ref={swiperRef} className="gap-5 relative h-[94vh]">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // بهتر است وقتی موس روی اسلاید است متوقف شود
        }}
        speed={1000}
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        className="mySwiper w-full h-full"
        loop={mainProduct.length > 1} // اگر فقط یک آیتم بود لوپ نزند
      >
        {mainProduct.map((item: any, index) => {
          const imageUrl = StringHelpers.getProfile(
            item?.attachments?.[0],
            item?.attachments?.[0]?.fileName || item?.code,
          );
          const fixHeadTitle = item?.title?.split("n/")[0];
          const fixPharaphTitle = item?.title?.split("n/")[1];
          const isImageLoaded = loadedImages[index];

          return (
            <SwiperSlide key={index} className="relative bg-gray-200">
              {/* 2. نمایش لودر داخل خود اسلاید تا زمانی که عکس لود شود.
                 این دیو پشت عکس قرار دارد و وقتی عکس لود شود، عکس روی آن می‌آید
              */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                   <Spinner color="primary" size="lg" />
                </div>
              )}

              <div className="relative w-full h-full">
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  // برای عکس اول eager میگذاریم تا سریع لود شود، بقیه lazy
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)} // اگر ارور داد هم لودینگ را برداریم
                  crossOrigin="anonymous"
                />

                {/* محتوای متنی - حتی اگر عکس لود نشود، متن نمایش داده می‌شود (UX بهتر) */}
                <div
                  className={`w-[300px] md:w-[400px] absolute top-10 left-10 p-5 bg-[rgba(255,255,255,0.7)] backdrop-blur-sm z-10 transition-all duration-1000 rounded-lg ${
                    isImageLoaded // می‌توانید شرط بگذارید که متن هم با عکس بیاید یا همیشه باشد
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <h2 className="text-2xl font-bold text-gray-950 my-5">
                    {fixHeadTitle}
                  </h2>
                  <span className="text-gray-800"> {fixPharaphTitle} </span>
                  {(item?.categoryId || !!item?.redirect) && (
                    <div className="flex justify-end mt-5">
                      <Button
                        onPress={() => handleRedirect(item)} // در هیرو یو‌آی بهتر است از onPress استفاده شود
                        className="cursor-pointer text-white bg-main hover:bg-black px-10 h-12 font-medium transition-all duration-300"
                      >
                        اطلاعات بیشتر
                      </Button>
                    </div>
                  )}
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