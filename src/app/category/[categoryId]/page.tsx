"use client";

import React, { useEffect, useState } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useRouter } from "next/navigation";
import StringHelpers from "@/src/config/StringHelpers";

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
        const res = await categoryServices.getCategoryById(
          Number(categoryId)
        );
        console.log(res);

        setProductCategories(res?.data?.[0]?.subCategory || []);
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
    router.push(`/category/${categoryId}/products/${data.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">دسته‌بندی‌ها</h1>

      {productCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productCategories.map((category: any, index: number) => {
            const imageUrl = StringHelpers.getProfile(
              category?.attachments?.[0]
            );
            console.log(category);
            return (
              <div
                key={category.id}
                onClick={() => handleShowProduct(category)}
                className="bg-white p-4 border border-gray-200 cursor-pointer hover:shadow-lg"
              >
                <span className="text-xl text-gray-600 font-semibold">
                  {category.title}
                </span>
                {/* <img
                  src={imageUrl}
                  width={400}
                  height={400}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageLoad(index)}
                /> */}
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
