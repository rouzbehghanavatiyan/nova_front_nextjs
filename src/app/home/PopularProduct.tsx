// import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "@/src/store/hook";
// import { setCurrentProduct } from "@/src/store/slices/main";
// import { useRouter } from "next/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { productService } from "@/src/api/services/productService";
// import { Button } from "@heroui/button";
// import StringHelpers from "@/src/config/StringHelpers";

// const PopularProduct = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const handleRedirect = (data: any) => {
//     const updatedData = {
//       ...data,
//       attachments: data.attachments?.map((attachment: any) => ({
//         ...attachment,
//         attachmentType: "img",
//       })),
//     };
//     sessionStorage.setItem("currentProduct", JSON.stringify(updatedData));
//     router.push(`/products/${data?.product_id}`);
//   };

//   const [popularProduct, setPopularProduct] = useState([]);

//   const preloadImages = async () => {
//     try {
//       const res: any = await productService.getPopular();
//       console.log(res);

//       setPopularProduct(res?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     preloadImages();
//   }, []);

//   return (
//     <div className="py-12 bg-gray-100">
//       <div className="mx-5">
//         <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
//           آشنایی با محبوبترین ها
//         </h2>
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={20}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           modules={[Pagination, Autoplay, Navigation]}
//           breakpoints={{
//             800: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 20,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 20,
//             },
//           }}
//           className="mySwiper"
//         >
//           {popularProduct.map((product: any, index) => {
//             return (
//               <SwiperSlide key={product.id}>
//                 <div className="bg-white overflow-hidden border border-gray-300 transition-all duration-300 transform h-full flex flex-col">
//                   <div className="relative overflow-hidden flex-shrink-0">
//                     <img
//                       src={StringHelpers.getProfile(product?.attachments?.[0])}
//                       alt={product.name}
//                       className="w-full object-cover"
//                       loading="lazy"
//                       crossOrigin="anonymous"
//                     />
//                   </div>
//                   {/* <div className="p-6 flex flex-col flex-grow">
//                     <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
//                       {product.name}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed text-justify flex-grow">
//                       {product.en_name}
//                     </p>
//                     <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
//                       <Button
//                         onClick={() => handleRedirect(product)}
//                         className="text-white"
//                         style={{ backgroundColor: "#0068b1" }}
//                       >
//                         اطلاعات بیشتر
//                       </Button>
//                     </div>
//                   </div> */}
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default PopularProduct;

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/store/hook";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { productService } from "@/src/api/services/productService";
import Img1 from "../../assets/B_001.png";
import Img2 from "../../assets/B_002.png";
import MainTitle from "@/src/components/mainTitle";

const PopularProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRedirect = (data: any) => {
    const updatedData = {
      ...data,
      attachments: data.attachments?.map((attachment: any) => ({
        ...attachment,
        attachmentType: "img",
      })),
    };
    sessionStorage.setItem("currentProduct", JSON.stringify(updatedData));
    router.push(`/products/${data?.product_id}`);
  };

  const allImage = [
    {
      src: Img1,
    },
    {
      src: Img2,
    },
  ];

  const [popularProduct, setPopularProduct] = useState([]);

  const preloadImages = async () => {
    try {
      const res: any = await productService.getPopular();
      console.log(res);
      setPopularProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // preloadImages();
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
    <div className=" bg-white">
      <div className="mx-10">
        <MainTitle title="پربازدید‌ترین‌های نووا" />
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {allImage.map((product: any) => (
            <SwiperSlide key={product.id} className="flex">
              <img
                src={product?.src?.src}
                alt={product.name}
                className="w-full h-full"
                loading="lazy"
                crossOrigin="anonymous"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularProduct;
