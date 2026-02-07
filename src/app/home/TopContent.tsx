import React, { useEffect, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { RsetIsOpenMegaMenu } from "@/src/store/slices/main";
import { useAppDispatch } from "@/src/store/hook";
import Loading from "@/src/components/Loading";

interface TopContentProps {
  setIsProductsPanelOpen?: (isOpen: boolean) => void;
}

const TopContent: React.FC<TopContentProps> = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const swiperRef = useRef<HTMLDivElement>(null);

  const handleRedirect = (data: any) => {
    console.log(data);
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
      setIsLoading(true);
      const products: any = await productService?.getMainCover();

      setMainProduct(products?.data);
      setLoadedImages(Array(products?.data?.length).fill(false));
    } catch (error) {
      console.error("Error loading main cover:", error);
    } finally {
      setIsLoading(false);
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

  return (
    <>
      <Loading active={isLoading ? true : false} />
      <div ref={swiperRef} className="gap-5 relative">
        <Swiper
          // onSwiper={(swiper) => (swiperInstance.current = swiper)}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={1000}
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          className="mySwiper h-[94vh]"
          loop
        >
          {mainProduct.map((item: any, index) => {
            const imageUrl = StringHelpers.getProfile(
              item?.attachments?.[0],
              item?.attachments?.[0]?.fileName || item?.code,
            );
            const fixHeadTitle = item?.title?.split("n/")[0];
            const fixPharaphTitle = item?.title?.split("n/")[1];
            return (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={imageUrl}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover cursor-pointer transition-all duration-1000 ease-in-out ${
                      loadedImages[index]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                  <div
                    className={`w-[300px] md:w-[400px] absolute top-10 left-10 p-5 bg-[rgba(255,255,255,0.56)] z-10 transition-all duration-1000 ${
                      loadedImages[index]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <h2 className="font25 font-bold text-gray-950 my-5 transition-all duration-1000 delay-300">
                      {fixHeadTitle}
                    </h2>
                    <span> {fixPharaphTitle} </span>
                    {(item?.categoryId || !!item?.redirect) && (
                      <div className="flex justify-end mt-5">
                        <Button
                          onClick={() => handleRedirect(item)}
                          className={` cursor-pointer text-white bg-main hover:bg-black px-10  h-12 font15 transition-all duration-300`}
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
    </>
  );
};

export default TopContent;
