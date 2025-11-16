import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppDispatch } from "@/src/store/hook";
import { setCurrentProduct } from "@/src/store/slices/main";
import img1 from "@/src/assets/cover/5544.jpg";
import img2 from "@/src/assets/cover/2751 - 2753 - 2755.jpg";
import img3 from "@/src/assets/cover/5380.jpg";

const TopContent: React.FC = () => {
  const coverAlbum = [
    {
      src: img1,
      code: "5544",
      name: "اره زنجیری شارژی 200 میلیمتری 20 ولت براشلس با کیف BMC",
      des: "اره زنجیری شارژی 200 میلیمتری 20 ولت براشلس نووا مدل 5544، ابزاری قدرتمند و حرفه‌ای برای برش انواع چوب و انجام کارهای باغبانی و صنعتی سبک است. این دستگاه با موتور براشلس 600 وات و سرعت زنجیر 6 متر بر ثانیه، قدرت و سرعتی عالی را در اختیار کاربران قرار می‌دهد. وجود سیستم تنظیم کشش زنجیر بدون نیاز به آچار و محافظ تیغه با قابلیت چرخش 90 درجه، کاربری ساده و ایمن را تضمین می‌کند. علاوه بر این، کلید ایمنی دستگاه از روشن شدن ناگهانی جلوگیری کرده و سطح ایمنی کار را بالا می‌برد. این اره زنجیری با طراحی ارگونومیک، سبک و بدنه ضد ضربه، برای استفاده طولانی‌مدت بسیار مناسب است. دسته نرم و ضد تعریق، راحتی کاربر را افزایش داده و صدای پایین دستگاه شرایطی مطلوب برای کار طولانی فراهم می‌کند. سیستم محافظت در برابر اضافه‌بار و سیستم گردش هوای منحصر‌به‌فرد، دوام موتور را بالا برده و عملکردی بی‌نقص ارائه می‌دهند. اره نووا مدل 5544 همراه با دو باتری 4 آمپر، شارژر سریع و کیف مقاوم BMC عرضه می‌شود و انتخابی ایده‌آل برای باغ‌ها، مزارع، پارک‌ها و گلخانه‌ها به شمار می‌رود.",
    },
    { src: img2, code: "5544", name: "", des: "" },
    { src: img3, code: "5544", name: "", des: "" },
  ];

  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [mainProduct, setMainProduct] = useState<any[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const imageAspectRatio = 16 / 9;

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };
  const handleRedirect = (data: any) => {
    dispatch(setCurrentProduct(data));
    router.push(`/category/${data?.subcategoryId}/products/${data.id}`);
  };

  const handleGetMainCover = async () => {
    const products: any = await productService.getMainCover();
    setMainProduct(products.data);
  };

  useEffect(() => {
    handleGetMainCover();
  }, []);

  console.log(mainProduct);

  return (
    <div className="gap-5 relative">
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        className="mySwiper h-[94vh]"
        effect="fade"
      >
        {mainProduct.map((item: any, index) => {
          const imageUrl = `${StringHelpers.baseURL}/${item?.imageAttachment}/${item?.imageFileName}${item?.imageExt}`;
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={imageUrl}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      loadedImages[index]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    loading="lazy"
                    crossOrigin="anonymous"
                    style={{
                      transition:
                        "opacity 1s ease-in-out, transform 1s ease-in-out",
                    }}
                  />
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400">Loading...</div>
                    </div>
                  )}
                  <div className="absolute top-10 left-10 p-5 bg-[rgba(0,0,0,0.4)] z-10 transform">
                    <h1 className="font30 font-bold text-white transform transition-all duration-1000 delay-500">
                      {item?.productName}
                    </h1>
                    <p className="font20 text-white my-10 transform transition-all duration-1000 delay-700">
                      {item?.features?.slice(0, 2)?.map((item: any) => {
                        return (
                          <div>
                            <span className="me-2 ">+</span>
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </p>
                    <div className="flex justify-end transform transition-all duration-1000 delay-900">
                      <Button
                        onClick={() => handleRedirect(item)}
                        style={{ backgroundColor: "#0068b1" }}
                        className="rounded-none px-10 h-12 font20 transform transition-transform hover:scale-105"
                        color="primary"
                        variant="solid"
                      >
                        اطلاعات بیشتر
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopContent;
