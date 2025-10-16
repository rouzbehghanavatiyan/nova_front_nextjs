"use client";
import React, { useEffect, useState } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
}

const CategoryPage: React.FC = () => {
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const params = useParams();
  console.log(params);
  const slug = Number(params.slag);
  console.log(  slug, "slug");

  const handleGetAllCategories = async () => {
    try {
      const res = await categoryServices.getProductCategory(slug);
      setProductCategories(res?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setProductCategories([]);
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">دسته‌بندی‌ها</h1>
      {productCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-gray-600">Slug: {category.slug}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>در حال بارگذاری دسته‌بندی‌ها...</p>
      )}
    </div>
  );
};

export default CategoryPage;
