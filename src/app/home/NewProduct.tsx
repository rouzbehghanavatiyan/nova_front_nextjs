import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import MainTitle from "@/src/components/mainTitle";
const NewProduct: React.FC = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(4).fill(false)
  );

  const [loadedHoverImages, setLoadedHoverImages] = useState<boolean[]>(
    new Array(4).fill(false)
  );

  const [newProduct, setNewProduct] = useState<any>([]);
  const handleGetNewProduct = async () => {
    try {
      const res: any = await productService.getNewProduct();
      setNewProduct(res?.data);
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

  const handleHoverImageLoad = (index: number) => {
    setLoadedHoverImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleImageClick = (data: any) => {
    if (data?.categoryId !== null) {
      const productId = data.product_id;
      const updatedData = {
        ...data,
        attachments: data.attachments?.map((attachment: any) => ({
          ...attachment,
          attachmentType: "img",
        })),
      };
      sessionStorage.setItem("currentProduct", JSON.stringify(updatedData));
      router.push(`/products/${productId}`);
    } else {
      router.push(`/category/${data?.subcategoryId}`);
    }
  };

  useEffect(() => {
    handleGetNewProduct();
  }, []);

  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-center gap-4">
        <span className="ms-20">
          <MainTitle title="جدیدترین‌های نووا" />
        </span>
        <span>
          <ArrowLongLeftIcon className="text-blue-500 cursor-pointer h-10 w-10" />
        </span>
      </div>
      <div className="max-w-full mx-auto">
        <div className="mx-10 gap-4 flex ">
          {/* <Swiper
            slidesPerView={1}
            spaceBetween={5}
            loop={true}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            // }}
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
            modules={[]}
            className="mySwiper"
          > */}
          {newProduct.map((item: any, index: number) => {
            const fixImageUrl = `${StringHelpers.baseURL}/img/${item?.fileName}${item?.ext}`;
            const hoverImageUrl = StringHelpers.getProfile(
              item?.attachments?.[0]
            );
            return (
              <div className="hover:shadow-lg" key={index}>
                <div
                  className="relative group cursor-pointer flex   border border-gray-200"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleImageClick(item)}
                >
                  <div>
                    <div className="overflow-hidden   h-[50vh]">
                      <div className="relative w-full h-full">
                        <img
                          src={fixImageUrl}
                          alt={item.alt}
                          className={`w-full h-full transition-all duration-300 ease-in-out ${
                            hoveredIndex === index
                              ? "scale-105 brightness-110"
                              : "scale-100 brightness-100"
                          } ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          onLoad={() => handleImageLoad(index)}
                          onError={() => handleImageLoad(index)}
                          loading="lazy"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <span className="absolute top-0 text-white px-4 py-2 font-bold bg-red-500 z-20">
                        جدید
                      </span>
                      <div
                        className={`absolute inset-0 transition-all duration-500 ${
                          hoveredIndex === index
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="relative w-full h-full z-10">
                          <img
                            src={hoverImageUrl}
                            alt={`Hover ${item.alt}`}
                            className={`w-full h-full transition-all duration-300 ${
                              loadedHoverImages[index]
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            onLoad={() => handleHoverImageLoad(index)}
                            onError={() => handleHoverImageLoad(index)}
                            loading="lazy"
                            crossOrigin="anonymous"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b border-x p-5 border-gray-200">
                  <span className="text-gray-400 flex justify-end pb-1">
                    مدل: {item?.code}
                  </span>
                  <p className="text-gray-600 flex justify-end font13">
                    {item?.name}
                  </p>
                </div>
              </div>
            );
          })}
          {/* </Swiper> */}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;