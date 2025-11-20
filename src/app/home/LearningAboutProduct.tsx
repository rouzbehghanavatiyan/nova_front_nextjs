import React from "react";
import { useAppDispatch } from "@/src/store/hook";
import { setCurrentProduct } from "@/src/store/slices/main";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const LearningAboutProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRedirect = (data: any) => {
    dispatch(setCurrentProduct(data));
    router.push(`/category/${data?.subcategoryId}/products/${data.id}`);
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="mx-5">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          آشنایی با محبوبترین ها
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="mySwiper"
        >
          {/* {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white overflow-hidden border border-gray-300 transition-all duration-300 transform h-full flex flex-col">
                <div className="relative overflow-hidden flex-shrink-0">
                  <img
                    src={product.image.src}
                    alt={product.title}
                    className="w-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify flex-grow">
                    {product.description}
                  </p>
                  <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => handleRedirect(product)}
                      className="text-white"
                      style={{ backgroundColor: "#0068b1" }}
                    >
                      اطلاعات بیشتر
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>
    </div>
  );
};

export default LearningAboutProduct;
