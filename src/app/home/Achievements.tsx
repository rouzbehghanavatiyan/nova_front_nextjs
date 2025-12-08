import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { productService } from "@/src/api/services/productService";
import MainTitle from "@/src/components/mainTitle";
import ChildLoading from "@/src/components/childLoading";
import Img1 from "../../assets/3048.jpg";
import Img2 from "../../assets/5251.jpg";
import Img3 from "../../assets/5355.jpg";
import Img4 from "../../assets/5548.jpg";

const Achievements: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(9).fill(false)
  );

  const allImage = [
    {
      src: Img1,
    },
    {
      src: Img2,
    },
    {
      src: Img3,
    },
    {
      src: Img4,
    },
  ];

  const [popularProduct, setPopularProduct] = useState(false);
  const fixedHeight = "40vh";
  const fixedWidth = "100%";

  const preloadImages = async () => {
    try {
      const res: any = await productService.getPopular();
      setPopularProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  if (!popularProduct) {
    return (
      <div className="grid grid-cols-5 gap-5 mb-10">
        <div className="col-span-3">
          <div className="w-full h-40vh bg-gray-200 animate-pulse  flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-blue-main"></div>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full p-8"></div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <MainTitle title="درخشش به سبک نووا" />
      <div className="grid grid-cols-5 gap-5 mb-10">
        <div className="col-span-3">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper shadow-small w-full h-full"
          >
            {allImage.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  {!loadedImages[index] && <ChildLoading />}
                  <img
                    width={1500}
                    height={1500}
                    src={image.src.src}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages[index] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    loading={index < 2 ? "eager" : "lazy"}
                    style={{
                      height: fixedHeight,
                      width: fixedWidth,
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full p-8">
            <div className="prose prose-lg max-w-none text-justify text-gray-700 leading-8">
              <div className="space-y-6">
                <section className="p-6 border-r-1 border-blue-main">
                  <ul className="list-disc list-inside space-y-3 mr-4">
                    <li>
                      کسب <strong>گواهینامه ISO 9001</strong> در زمینه مدیریت
                      کیفیت
                    </li>
                    <li>
                      اخذ <strong>تندیس برند برتر</strong> در سه سال متوالی
                    </li>
                    <li>
                      عقد قرارداد با <strong>۵۰۰ شرکت صنعتی بزرگ</strong> کشور
                    </li>
                    <li>
                      صادرات به <strong>۱۵ کشور</strong> در منطقه خاورمیانه
                    </li>
                    <li>
                      تولید بیش از <strong>۲۰۰۰ محصول</strong> تخصصی
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
