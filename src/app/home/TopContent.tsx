import React from "react";
import BaseImage from "@/src/assets/img/0190913001731762145.jpg";
import BaseImage2 from "@/src/assets/img/0115050001757841132.jpg";
import BaseImage3 from "@/src/assets/img/0812690001731762156.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TopContent: React.FC = () => {
  return (
    <div>
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
        className="mySwiper rounded-2xl shadow-small w-full max-w-6xl"
      >
        <SwiperSlide>
          <img
            width={1500}
            height={1500}
            src={BaseImage.src}
            alt="Slide 1"
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            width={1500}
            height={1500}
            src={BaseImage2.src}
            alt="Slide 2"
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            width={1500}
            height={1500}
            src={BaseImage3.src}
            alt="Slide 2"
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TopContent;
