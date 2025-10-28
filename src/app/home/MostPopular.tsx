import React, { useState } from "react";
import BaseImage from "@/src/assets/img/0928976001757762909.jpg";
import BaseImage2 from "@/src/assets/img/PROFSSIONAL PLIERS 8003-8009 -8017-8051.png";
import BaseImage3 from "@/src/assets/img/ANGEL GRlNDER.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MostPopular: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const images = [BaseImage, BaseImage2, BaseImage3];

  const fixedHeight = "40vh"; 
  const fixedWidth = "100%";

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div className="grid grid-cols-5 gap-5 mb-10">
      <div className="col-span-3">
        {" "}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper shadow-small w-full h-full  "
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {!loadedImages[index] && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center  ">
                    <div className="animate-spin   h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
                <img
                  width={1500}
                  height={1500}
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  className={`w-full h-full object-cover   transition-opacity duration-300 ${
                    loadedImages[index] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                  loading="lazy"
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
              <section className="p-6 border-r-4 border-blue-600">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  دستاوردهای کلیدی
                </h2>
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
  );
};

export default MostPopular;
