"use client";
import React, { useEffect, useState } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useRouter, useSearchParams } from "next/navigation";
import StringHelpers from "@/src/config/StringHelpers";

interface Category {
  id: number;
  name: string;
  slug: string;
  code: string;
  attachments: any[];
  en_name: string;
}

const CategoryPage: React.FC = () => {
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // دریافت categoryId از query parameters
  const categoryId = searchParams.get('categoryId');

  const handleGetAllCategories = async () => {
    try {
      if (categoryId) {
        const res = await categoryServices.getProductCategory(Number(categoryId));
        setProductCategories(res?.data || []);
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

  const handleShowProduct = (data: Category) => {
    router.push(`/category/${categoryId}/products/${data.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">دسته‌بندی‌ها</h1>
      {productCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productCategories.map((category, index) => {
            const imageUrl = StringHelpers.getProfile(category?.attachments[0]);
            return (
              <div
                onClick={() => handleShowProduct(category)}
                key={category.id}
                className="bg-white p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <span className="flex items-start justify-between">
                  <img
                    src={imageUrl}
                    alt={`Slide ${index + 1}`}
                    height={400}
                    width={400}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                  <span>کد: {category.code}</span>
                </span>
                <h3 className="text-xl mb-3 font-semibold">{category.name}</h3>
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
};

export default CategoryPage;