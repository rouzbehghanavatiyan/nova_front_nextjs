import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { useRouter } from "next/navigation";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import MainTitle from "@/src/components/mainTitle";
import image1 from "@/src/assets/newProduct/1533-1.jpg";
import image2 from "@/src/assets/newProduct/1533.jpg";
import image3 from "@/src/assets/newProduct/1535-1.jpg";
import image4 from "@/src/assets/newProduct/1535.jpg";
import image5 from "@/src/assets/newProduct/2685G-01.jpg";
import image6 from "@/src/assets/newProduct/2685G.jpg";
import image7 from "@/src/assets/newProduct/7717-01.jpg";
import image8 from "@/src/assets/newProduct/7717.jpg";

const NewProduct: React.FC = () => {
  const allImages = [
    {
      id: 903,
      name: "سنباده لرزان اوربیتال 150 میلیمتر 450 وات",
      en_name: "450W 150mm Orbital Electric Sander",
      code: "5386",
      categoryId: 4,
      subcategoryId: 101,
      main_image: "5386",
      title: null,
      attachmentType: "new",
      fileName: "2685G-01",
      ext: ".png",
      product_id: 563,
      attachments: image5,
    },
    {
      id: 904,
      name: "دریل پیچ گوشتی شارژی 10 میلیمتری 16ولت براشلس با کیف BMC",
      en_name: "10mm Brushless Cordless Impact Drill",
      code: "5510",
      categoryId: 21,
      subcategoryId: 8,
      main_image: "5510",
      title: null,
      attachmentType: "new",
      fileName: "2685G",
      ext: ".png",
      product_id: 861,
      attachments: image6,
    },
    {
      id: 905,
      name: "دریل پیچ گوشتی شارژی 13 میلیمتری 20ولت براشلس با کیف BMC ",
      en_name: "13mm Brushless Cordless Impact Drill",
      code: "5524",
      categoryId: 21,
      subcategoryId: 8,
      main_image: "5524",
      title: null,
      attachmentType: "new",
      fileName: "7717-01",
      ext: ".png",
      product_id: 864,
      attachments: image7,
    },
    {
      id: 914,
      name: "بکس شارژی 20 ولت براشلس",
      en_name: "20V Brushless Cordless Impact Wrench",
      code: "7731",
      categoryId: 21,
      subcategoryId: 8,
      main_image: "7731",
      title: null,
      attachmentType: "new",
      fileName: "7717",
      ext: ".png",
      product_id: 849,
      attachments: image8,
    },
  ];

  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<any>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(4).fill(false)
  );
  const [loadedHoverImages, setLoadedHoverImages] = useState<boolean[]>(
    new Array(4).fill(false)
  );
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

  console.log(newProduct);

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
          {allImages.map((item: any, index: number) => {
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
                          // src={fixImageUrl}
                          src={item?.attachments.src}
                          alt={item.alt}
                          // className={`w-full h-full transition-all duration-300 ease-in-out ${
                          //   hoveredIndex === index
                          //     ? "scale-105 brightness-110"
                          //     : "scale-100 brightness-100"
                          // } ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          // onLoad={() => handleImageLoad(index)}
                          // onError={() => handleImageLoad(index)}
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
                    مدل: {item?.fileName}
                  </span>
                  <p className="text-gray-600 flex justify-end font13">
                    {/* {item?.name} */}
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
