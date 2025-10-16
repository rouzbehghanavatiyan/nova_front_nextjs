import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { productService } from "@/src/api/services/MasterServices";
import StringHelpers from "@/src/config/StringHelpers";

const TopContent: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const router = useRouter();

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };
  const imageAspectRatio = 16 / 9;
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "" + "</span>";
    },
  };

  const handleRedirect = (data: any) => {
    console.log(data);
    router.push(`/product/detail/${data}`);
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
        pagination={pagination}
        modules={[Pagination]}
        style={{ height: "90vh" }}
        className="mySwiper"
      >
        {mainProduct.map((item: any, index) => {
          const imageUrl = StringHelpers.getProfile(item?.attachments[0]);
          console.log("Image URL:", imageUrl);
          return (
            <SwiperSlide key={index}>
              <div
                className="relative w-full"
                style={{ paddingBottom: `${(1 / imageAspectRatio) * 100}%` }}
              >
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    loadedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                  loading="lazy"
                  crossOrigin="anonymous"
                />
                <div className="bottom-1/4 left-1/12 max-w-[500px] p-5 bg-[rgba(0,0,0,0.4)] absolute z-10">
                  <h1 className="font40 font-bold text-white">{item?.name}</h1>
                  <p className="font20 text-white my-10">{item?.en_name}</p>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleRedirect(item?.code)}
                      style={{ backgroundColor: "#0068b1" }}
                      className="rounded-none px-10 h-12 font20"
                      color="primary"
                      variant="solid"
                    >
                      اطلاعات بیشتر
                    </Button>
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
