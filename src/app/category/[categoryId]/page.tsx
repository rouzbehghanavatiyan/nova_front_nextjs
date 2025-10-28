"use client";
import React, { useEffect, useState } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useParams, useRouter } from "next/navigation";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppDispatch } from "@/src/store/hook";
import { setCurrentProduct } from "@/src/store/slices/main";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { categoryId } = params;
  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const res = await categoryServices.getProductCategory(Number(categoryId));
      setProducts(res?.data || []);

      setCategory({
        id: categoryId,
        name: `دسته‌بندی ${categoryId}`,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  const handleProductClick = (product: any) => {
    dispatch(setCurrentProduct(product));
    router.push(`/category/${categoryId}/products/${product.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const imgUrl = StringHelpers.getProfile(product.attachments?.[0]);
          return (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="cursor-pointer border border-gray-200 p-4  transition-shadow"
            >
              <div className="flex">
                <img
                  src={imgUrl}
                  alt={product.name}
                  className="w-96 h-w-96 object-cover rounded mb-4"
                  crossOrigin="anonymous"
                />
                <span className="text-gray-400">مدل:</span>
                <span className="text-gray-400 ">{product.code}</span>
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.en_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
