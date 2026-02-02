"use client";
import React, { useEffect, useState } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useRouter } from "next/navigation";
import StringHelpers from "@/src/config/StringHelpers";
import Logo from "../../../assets/color-new-09.svg";
export default function CategoryMenuPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = React.use(params);
  const [productCategories, setProductCategories] = useState([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const router = useRouter();

  const handleGetAllCategories = async () => {
    try {
      if (categoryId) {
        const res = await categoryServices.getCategoryById(Number(categoryId));
        const { data, code, message }: any = res;
        if (code === 0) {
          setProductCategories(data);
          console.log("const res = ", res);
        } else {
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setProductCategories([]);
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, [categoryId]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleShowProduct = (data: any) => {
    router.push(`/category/${categoryId}/subCategory/${data.id}`);
  };

  console.log(productCategories);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">دسته بندی‌ها</h1>

      {productCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productCategories.map((category: any, index: number) => {
            const imageUrl = StringHelpers.getProfile(
              category?.attachments?.[0]
            );
            return (
              <div
                key={category.id}
                onClick={() => handleShowProduct(category)}
                className="bg-white p-4 grid grid-cols-3 border border-gray-200 cursor-pointer hover:shadow-lg"
              >
                <span className="text-xl  text-gray-600 col-span-3 font-semibold">
                  {category.title}
                </span>
                <span className=" flex col-span-3 justify-center">
                  <img
                    className="col-span-1"
                    src={Logo?.src}
                    width={300}
                    height={300}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                  />
                </span>
                <p className="text-gray-600">{category.en_name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>در حال بارگذاری دسته‌بندی‌ها...</p>
      )}
    </div>
  );
}
