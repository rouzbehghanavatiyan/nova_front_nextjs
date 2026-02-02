 import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/store/hook";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { productService } from "@/src/api/services/productService";
import MainTitle from "@/src/components/mainTitle";
import { Button } from "@heroui/react";
import StringHelpers from "@/src/config/StringHelpers";
import Loading from "@/src/components/Loading";

const PopularProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRedirect = (data: any) => {
    console.log(data);
    router.push(`/products/${data?.productid}/${data?.name}`);
  };

  const [popularProduct, setPopularProduct] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const preloadImages = async () => {
    try {
      setShowLoading(true);
      const res: any = await productService.getPopular();
      setShowLoading(false);
      setPopularProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const groupProductsInPairs = (products: any[]) => {
    const pairs = [];
    for (let i = 0; i < products.length; i += 2) {
      pairs.push(products.slice(i, i + 2));
    }
    return pairs;
  };

  const productPairs = groupProductsInPairs(popularProduct);

  return (
    <>
      <Loading active={showLoading ? true : false} />
      <div className=" bg-white">
        <div className=" p-10">
          <MainTitle title="پربازدید‌ترین‌های نووا" />
          <Swiper
            slidesPerView={2}
            spaceBetween={18}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {popularProduct.map((product: any) => {
              return (
                <SwiperSlide key={product.id} className="flex">
                  <div className="bg-gray-100 overflow-hidden h-full flex flex-col">
                    <div className="relative hover:brightness-110 transition-all duration-300 transform">
                      <img
                        src={StringHelpers.getProfile(
                          product?.attachments?.[0],
                          product.code,
                        )}
                        alt={product.name}
                        className="w-full object-cover"
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow ">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 text-start">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 font13 text-justify leading-6 font-light line-clamp-3">
                        {product.content}
                      </p>
                      <div className="flex justify-end mt-6 pt-4 border-gray-200">
                        <Button
                          onClick={() => handleRedirect(product)}
                          className="text-white bg-main hover:bg-black"
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
      </div>
    </>
  );
};

export default PopularProduct;
