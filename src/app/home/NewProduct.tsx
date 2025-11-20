import React, { useState, useEffect } from "react";
import img1 from "@/src/assets/newProduct/محصولات جدید1.jpg";
import img2 from "@/src/assets/newProduct/محصولات جدید2.jpg";
import img3 from "@/src/assets/newProduct/محصولات جدید3.jpg";
import img4 from "@/src/assets/newProduct/محصولات جدید4.jpg";
import img5 from "@/src/assets/newProduct/محصولات جدید5.jpg";
import img6 from "@/src/assets/newProduct/محصولات جدید6.jpg";
import img7 from "@/src/assets/newProduct/محصولات جدید7.jpg";
import img8 from "@/src/assets/newProduct/محصولات جدید8.jpg";
import img9 from "@/src/assets/newProduct/محصولات جدید9.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { useRouter } from "next/navigation";

const NewProduct: React.FC = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(4).fill(false)
  );
  const [newProduct, setNewProduct] = useState<any>([]);

  // const preloadImages = async () => {
  //   const imagePromises = images.map((image, index) => {
  //     return new Promise((resolve, reject) => {
  //       const img = new Image();
  //       img.src = image.src.src;
  //       img.onload = () => {
  //         setLoadedImages((prev) => {
  //           const newLoaded = [...prev];
  //           newLoaded[index] = true;
  //           return newLoaded;
  //         });
  //         resolve(true);
  //       };
  //       img.onerror = () => {
  //         setLoadedImages((prev) => {
  //           const newLoaded = [...prev];
  //           newLoaded[index] = true;
  //           return newLoaded;
  //         });
  //         resolve(false);
  //       };
  //     });
  //   });
  //   await Promise.all(imagePromises.slice(0, 2));
  //   setImagesReady(true);
  // };

  const handleGetNewProduct = async () => {
    try {
      const res: any = await productService.getNewProduct();
      setNewProduct(res?.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleImageClick = (data: any) => {
    const productId = data.id;
    sessionStorage.setItem("currentProduct", JSON.stringify(data));
    router.push(`/products/${productId}`);
  };

  useEffect(() => {
    handleGetNewProduct();
  }, []);

  return (
    <div className="w-full  py-8 bg-red">
      <div className="max-w-full mx-auto">
        <div className="mx-16">
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {newProduct.map((item: any, index: number) => {
              const fixImageUrl = `${StringHelpers.baseURL}/${item?.attachmentType}/${item?.fileName}${item?.ext}`;

              return (
                <SwiperSlide key={index}>
                  <div
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleImageClick(item)}
                  >
                    <div className="overflow-hidden shadow-lg">
                      {!loadedImages[index] && (
                        <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center z-10">
                          <div className="animate-spin h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                      <img
                        src={fixImageUrl}
                        alt={item.alt}
                        className={`h-[50vh] w-full object-cover transition-all duration-300 ease-in-out ${
                          hoveredIndex === index
                            ? "scale-105 brightness-110"
                            : "scale-100 brightness-100"
                        } ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageLoad(index)}
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                      <span className="absolute top-0 text-white m-5 p-3 bg-red-500 z-20">
                        جدید
                      </span>
                    </div>

                    <div
                      className={`absolute inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-40 transition-opacity duration-300 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>

                    <div
                      className={`absolute bottom-4 left-4 right-4 text-white transition-all duration-300 z-20 ${
                        hoveredIndex === index
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="text-sm opacity-90">مشاهده جزئیات →</p>
                    </div>

                    <div
                      className={`absolute inset-0 border-2 border-blue-500 transition-all duration-300 ${
                        hoveredIndex === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    ></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
