import React, { useState } from "react";
import BaseImage from "@/src/assets/img/5515-04.jpeg";
import BaseImage2 from "@/src/assets/img/5522- .jpg";
import BaseImage3 from "@/src/assets/img/5531 .jpg";
import BaseImage4 from "@/src/assets/img/5530.jpg";

const MainProduct: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    { src: BaseImage, alt: "ANGEL GRINDER", link: "/products/angel-grinder" },
    { src: BaseImage2, alt: "ابزار روشنایی", link: "/products/lighting-tools" },
    { src: BaseImage3, alt: "ابزار صنعتی", link: "/products/industrial-tools" },
    { src: BaseImage4, alt: " صنعتی", link: "/products/industrial-tools" },
    
  ];

  const handleImageClick = (link: string) => {
    // می‌توانید از next/link برای routing استفاده کنید
    window.location.href = link;
    // یا با next/link:
    // router.push(link);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mx-16">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleImageClick(image.link)}
            >
              <div className="overflow-hidden shadow-lg">
                <img
                  src={image.src.src}
                  alt={image.alt}
                  className={` h-[50vh] w-[40vw] object-cover transition-all duration-300 ease-in-out ${
                //   className={` h-[50vh] w-[calc(100vw-100px)] object-cover transition-all duration-300 ease-in-out ${
                    hoveredIndex === index
                      ? "scale-105 brightness-110"
                      : "scale-100 brightness-100"
                  }`}
                  loading="lazy"
                />
                <span className="absolute top-0 text-white m-5 p-3 bg-red-500 z-50" >
                  جدید
                </span>
              </div>
              <div
                className={`absolute inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-40 transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              ></div>

              <div
                className={`absolute bottom-4 left-4 right-4 text-white transition-all duration-300 ${
                  hoveredIndex === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <h3 className="text-lg font-bold mb-1">{image.alt}</h3>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainProduct;
