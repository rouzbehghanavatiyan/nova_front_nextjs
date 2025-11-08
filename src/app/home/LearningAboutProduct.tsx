import React from "react";
import img1 from "@/src/assets/mostPopuler/محبوب ترینها 1.jpg";
import img2 from "@/src/assets/mostPopuler/محبوب ترینها 2.jpg";
import img3 from "@/src/assets/mostPopuler/محبوب ترینها 3.jpg";
import img4 from "@/src/assets/mostPopuler/محبوب ترینها 4.jpg";
import img5 from "@/src/assets/mostPopuler/محبوب ترینها 5.jpg";
import img6 from "@/src/assets/mostPopuler/محبوب ترینها 6.jpg";
import img7 from "@/src/assets/mostPopuler/محبوب ترینها 7.jpg";
import img8 from "@/src/assets/mostPopuler/محبوب ترینها 8.jpg";
import { Button } from "@heroui/button";
import { useAppDispatch } from "@/src/store/hook";
import { setCurrentProduct } from "@/src/store/slices/main";
import { useRouter } from "next/navigation";

const LearningAboutProduct = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = [
    {
      id: 1,
      image: img1,
      title: "محصول اول",
      description: "توضیحات مختصر درباره محصول اول و ویژگی‌های منحصر به فرد آن",
    },
    {
      id: 2,
      image: img2,
      title: "محصول دوم",
      description: "توضیحات مختصر درباره محصول دوم و مزایای استفاده از آن",
    },
    {
      id: 3,
      image: img3,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
    {
      id: 3,
      image: img4,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
    {
      id: 3,
      image: img5,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
    {
      id: 3,
      image: img6,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
    {
      id: 3,
      image: img7,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
    {
      id: 3,
      image: img8,
      title: "محصول سوم",
      description: "توضیحات مختصر درباره محصول سوم و کاربردهای مختلف آن",
    },
  ];

  const handleRedirect = (data: any) => {
    dispatch(setCurrentProduct(data));
    router.push(`/category/${data?.subcategoryId}/products/${data.id}`);
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className=" container mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          آشنایی با محبوبترین ها
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className=" overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
                    onClick={() => handleRedirect(product)}
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
      </div>
    </div>
  );
};

export default LearningAboutProduct;
