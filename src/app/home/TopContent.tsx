import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppDispatch } from "@/src/store/hook";
import { setCurrentProduct } from "@/src/store/slices/main";

const TopContent: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleRedirect = (data: any) => {
    dispatch(setCurrentProduct(data));
    router.push(`/category/${data?.subcategoryId}/products/${data.id}`);
  };

  const handleGetMainCover = async () => {
    const products: any = await productService.getMainCover();
    setMainProduct(products.data);
  };

  useEffect(() => {
    handleGetMainCover();
  }, []);

  return (
    <div className="gap-5 relative">
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
          const imageUrl = `${StringHelpers.baseURL}/${item?.imageAttachment}/${item?.imageFileName}${item?.imageExt}`;
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={imageUrl}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      loadedImages[index]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    loading="lazy"
                    crossOrigin="anonymous"
                    style={{
                      transition:
                        "opacity 1s ease-in-out, transform 1s ease-in-out",
                    }}
                  />
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400">Loading...</div>
                    </div>
                  )}
                  <div className="absolute max-w-[40vh] top-10 left-10 p-5 bg-[rgba(0,0,0,0.4)] z-10 transform">
                    <h1 className="font20 font-bold text-white transform transition-all duration-1000 delay-500">
                      {item?.productName}
                    </h1>
                    <p className="font15 text-white my-10 transform transition-all duration-1000 delay-700">
                      {item?.features?.slice(0, 2)?.map((item: any) => {
                        return (
                          <div className="flex">
                            <div className="me-2 inline justify-center items-center ">
                              <span className="border px-2  rounded-full">
                                +
                              </span>
                            </div>
                            <span className="space-y-2 font-light">{item}</span>
                          </div>
                        );
                      })}
                    </p>
                    <div className="flex justify-end transform transition-all duration-1000 delay-900">
                      <Button
                        onClick={() => handleRedirect(item)}
                        style={{ backgroundColor: "#0068b1" }}
                        className="rounded-none px-10 h-12 font15 transform transition-transform hover:scale-105"
                        color="primary"
                        variant="solid"
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
