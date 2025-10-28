"use client";
import React, { useEffect, useState } from "react";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppSelector } from "@/src/store/hook";

interface ProductPageProps {
  params: {
    categoryId: string;
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { categoryId, productId } = params;
  const { currentProduct }: any = useAppSelector((state) => state.product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProduct({
          id: productId,
          name: `محصول ${productId}`,
          description: "توضیحات محصول...",
          category: `دسته‌بندی ${categoryId}`,
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, categoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-4xl font-bold mb-4">{product.name}</h1> */}
      <span className="text-gray-500 ">مدل: {currentProduct.code}</span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <img
          src={StringHelpers.getProfile(currentProduct?.attachments[0])}
          // alt={currentProduct.name}
          className="w-8/9 h-8/9"
          crossOrigin="anonymous"
        />
        <h1 className="font-bold font30"> {currentProduct?.name} </h1>
        {/* <div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            افزودن به سبد خرید
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductPage;
