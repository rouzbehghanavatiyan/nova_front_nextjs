import React from "react";
import BaseImage from "@/src/assets/img/5515-04.jpeg";
import BaseImage2 from "@/src/assets/img/5522- .jpg";
import BaseImage3 from "@/src/assets/img/5531 .jpg";
import { Button } from "@heroui/button";

const LearningAboutProduct = () => {
  const products = [
    {
      id: 1,
      image: BaseImage,
      title: "محصول اول",
      description: "توضیحات مختصر درباره محصول اول و ویژگی‌های منحصر به فرد آن",
    },
    {
      id: 2,
      image: BaseImage2,
      title: "محصول دوم",
      description: "توضیحات مختصر درباره محصول دوم و مزایای استفاده از آن",
    },
    {
      id: 3,
      image: BaseImage3,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          آشنایی با محبوبترین ها
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image.src}
                  alt={product.title}
                  className="w-full h-150 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                  {product.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {product.description}
                </p>
                <div className="flex justify-end mt-6">
                  <Button
                    className="text-white"
                    style={{ backgroundColor: "#0068b1" }}
                  >
                    اطلاعات بیشتر
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* نسخه جایگزین با طراحی متفاوت */}
        {/* 
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="flex-1 min-w-[300px] max-w-[400px]"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img 
                  src={product.image.src}
                  alt={product.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        */}
      </div>
    </div>
  );
};

export default LearningAboutProduct;
