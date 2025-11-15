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

const NewProduct: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(4).fill(false));
  const [imagesReady, setImagesReady] = useState(false);

  const images = [
    { src: img1, alt: "ANGEL GRINDER", link: "/products/angel-grinder" },
    { src: img2, alt: "ابزار روشنایی", link: "/products/lighting-tools" },
    { src: img3, alt: "ابزار صنعتی", link: "/products/industrial-tools" },
    { src: img4, alt: "صنعتی", link: "/products/industrial-tools" },
    { src: img5, alt: "صنعتی", link: "/products/industrial-tools" },
    { src: img6, alt: "صنعتی", link: "/products/industrial-tools" },
    { src: img7, alt: "صنعتی", link: "/products/industrial-tools" },
    { src: img8, alt: "صنعتی", link: "/products/industrial-tools" },
    { src: img9, alt: "صنعتی", link: "/products/industrial-tools" },
  ];

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((image, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image.src.src;
          img.onload = () => {
            setLoadedImages(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve(true);
          };
          img.onerror = () => {
            setLoadedImages(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve(false);
          };
        });
      });

      await Promise.all(imagePromises.slice(0, 2));
      setImagesReady(true);
    };

    preloadImages();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleImageClick = (link: string) => {
    window.location.href = link;
  };

  if (!imagesReady) {
    return (
      <div className="w-full px-4 py-8">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mx-16">
            {images.map((_, index) => (
              <div key={index} className="relative">
                <div className="overflow-hidden shadow-lg">
                  <div className="h-[50vh] w-[40vw] bg-gray-300 animate-pulse flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  py-8 bg-red">
      <div className="max-w-full mx-auto">
        <div className="mx-16">
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
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
            navigation={true}
            modules={[Pagination, Autoplay , Navigation]}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleImageClick(image.link)}
                >
                  <div className="overflow-hidden shadow-lg">
                    {/* Loading State */}
                    {!loadedImages[index] && (
                      <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center z-10">
                        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                    
                    {/* Image */}
                    <img
                      src={image.src.src}
                      alt={image.alt}
                      className={`h-[50vh] w-full object-cover transition-all duration-300 ease-in-out ${
                        hoveredIndex === index
                          ? "scale-105 brightness-110"
                          : "scale-100 brightness-100"
                      } ${
                        loadedImages[index] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageLoad(index)}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    
                    <span className="absolute top-0 text-white m-5 p-3 bg-red-500 z-20">
                      جدید
                    </span>
                  </div>
                  
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-40 transition-opacity duration-300 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>

                  {/* Text Content */}
                  <div
                    className={`absolute bottom-4 left-4 right-4 text-white transition-all duration-300 z-20 ${
                      hoveredIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    <h3 className="text-lg font-bold mb-1">{image.alt}</h3>
                    <p className="text-sm opacity-90">مشاهده جزئیات →</p>
                  </div>

                  {/* Border Effect */}
                  <div
                    className={`absolute inset-0 border-2 border-blue-500 transition-all duration-300 ${
                      hoveredIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;