"use client";
import Loading from "@/src/components/Loading";
import StringHelpers from "@/src/config/StringHelpers";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/store/hook";

export default function FilteredProduct() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productIds = searchParams.get("products");
  const main = useAppSelector((state) => state.product);
  const idsArray = productIds ? productIds.split(",") : [];

  const handleProductClick = (product: any) => {
    if (!productIds) return;
    console.log(product);
    // router.push(`/category/${resolvedParams.categoryId}/products/${product.id}`);
    router.push(`/products/${product?.id}/${product.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {main?.filteredProducts.map((product: any) => {
          const imgUrl = StringHelpers.getProfile(
            product.attachments?.[0],
            product.code,
          );
          if (product?.categoryId !== null) {
            return (
              <div
                key={product.code}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer border border-gray-200 p-4 transition-shadow"
              >
                <div className="flex">
                  <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-cover rounded mb-4"
                    crossOrigin="anonymous"
                  />
                  <span className="text-gray-400">مدل:</span>
                  <span className="text-gray-400 ">{product.code}</span>
                </div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.en_name}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
