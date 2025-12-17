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
import ChildLoading from "@/src/components/childLoading";

interface TopContentProps {
  setIsProductsPanelOpen?: (isOpen: boolean) => void;
}

const TopContent: React.FC<TopContentProps> = () => {
  const coverImages = [
    {
      id: 917,
      name: null,
      en_name: null,
      code: "1",
      categoryId: null,
      subcategoryId: 92,
      main_image: null,
      title: "صفر تا صد ابزار با نووا! n/ انواع ابزار دستی، برقی، شارژی و ...",
      attachmentType: "cov",
      fileName: "1",
      ext: ".png",
      product_id: 902,
    },
    {
      id: 920,
      name: "دریل پیچ گوشتی شارژی 13 میلیمتری 20ولت براشلس با کیف BMC ",
      en_name: "13mm Brushless Cordless Impact Drill",
      code: "5524",
      categoryId: 21,
      subcategoryId: 8,
      main_image: "5524",
      title: "ترکیبی از قدرت و دقت! n/  دریل پیچ گوشتی شارژی 5524 ",
      attachmentType: "cov",
      fileName: "5524",
      ext: ".png",
      product_id: 864,
    },
    {
      id: 921,
      name: null,
      en_name: null,
      code: "73-2",
      categoryId: 3,
      subcategoryId: 73,
      main_image: null,
      title: "انواع ست بیت و بکس‌های نووا n/ برتری، با یک ست کامل است!",
      attachmentType: "cov",
      fileName: "73-2",
      ext: ".png",
      product_id: 901,
    },
    {
      id: 902,
      name: "فارسی بر کشویی 210 میلیمتر 1500 وات دو طرفه",
      en_name: "1500W 210mm Sliding Miter Saw",
      code: "5723",
      categoryId: 4,
      subcategoryId: 99,
      main_image: "5723",
      title: "نهایت دقت در هر برش! n/ فارسی‌بر کشویی 5723",
      attachmentType: "cov",
      fileName: "5723",
      ext: ".png",
      product_id: 560,
    },
    {
      id: 899,
      name: "[null]",
      en_name: null,
      code: "73-2",
      categoryId: 3,
      subcategoryId: 73,
      main_image: null,
      title: "آماده برای سخت‌ترین کارها! n/ انواع جعبه بکس و متعلقات",
      attachmentType: "cov",
      fileName: "73-1",
      ext: ".png",
      product_id: 899,
    },
  ];

  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const swiperRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    dispatch(RsetIsOpenMegaMenu(false));
  };

  const handleRedirect = (data: any) => {
    console.log(data);

    if (data?.main_image !== null) {
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
      sessionStorage.setItem("currentProduct", JSON.stringify(updatedData));
      router.push(`/products/${productId}`);
    } else {
      router.push(
        `/category/${data?.categoryId}/subCategory/${data?.subcategoryId}`
      );
    }
  };

  const handleGetMainCover = async () => {
    try {
      setIsLoading(true);
      const products: any = await productService.getMainCover();

      setMainProduct(products.data);
      setLoadedImages(Array(products.data.length).fill(false));
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
      {isLoading && <ChildLoading />}
      <div ref={swiperRef} className="gap-5 relative">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          className="mySwiper h-[94vh]"
          loop
        >
          {coverImages.map((item: any, index) => {
            const imageUrl = `${StringHelpers.baseURL}/${item?.attachmentType}/${item?.fileName}${item?.ext}`;
            const fixHeadTitle = item?.title?.split("n/")[0];
            const fixPharaphTitle = item?.title?.split("n/")[1];
            console.log(item);

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
                    onClick={handleImageClick}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                  <div
                    className={`w-[400px] absolute top-10 left-10 p-5 bg-[rgba(255,255,255,0.56)] z-10 transition-all duration-1000 ${
                      loadedImages[index]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <h2 className="font25 font-bold text-gray-950 my-5 transition-all duration-1000 delay-300">
                      {fixHeadTitle}
                    </h2>
                    <span> {fixPharaphTitle} </span>
                    {item?.categoryId && (
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
