"use client";
import React, { useEffect, useState } from "react";
import StringHelpers from "@/src/config/StringHelpers";
import { productService } from "@/src/api/services/productService";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon, MinusIcon } from "@heroicons/react/16/solid";

interface ProductPageProps {
  params: Promise<{
    categoryId: string;
    productId: string;
  }>;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [product, setProduct] = useState<any>(null);
  const [features, setFeatures] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  const [openSection, setOpenSection] = useState<string | null>("features");
  const [resolvedParams, setResolvedParams] = useState<{
    categoryId: string;
    productId: string;
  } | null>(null);

  const getProductFromStorage: any = sessionStorage?.getItem("currentProduct");
  const currentProduct = JSON.parse(getProductFromStorage);

  const resolveParams = async () => {
    const resolved = await params;
    setResolvedParams(resolved);
  };

  useEffect(() => {
    resolveParams();
  }, [params]);

  const handleGetProductDescription = async () => {
    if (!resolvedParams) return;
    try {
      const res = await productService.getDescription(
        Number(resolvedParams.productId)
      );

      const { code, data }: any = res;
      if (code === 0) setDescription(data?.content || "");
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  };

  const handleGetFeaturesFromProduct = async () => {
    if (!resolvedParams) return;
    try {
      const res = await productService.getFeaturesFromProduct(
        Number(resolvedParams.productId)
      );
      const { code, data }: any = res;
      if (code === 0) setFeatures(data);
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  };

  const fetchProduct = async () => {
    if (!resolvedParams) return;
    try {
      setProduct({
        id: resolvedParams.productId,
        name: `محصول ${resolvedParams.productId}`,
        description: "توضیحات محصول...",
        category: `دسته‌بندی ${resolvedParams.categoryId}`,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string = "features") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    if (resolvedParams) {
      fetchProduct();
      handleGetFeaturesFromProduct();
      handleGetProductDescription();
    }
  }, [resolvedParams]);

  if (!resolvedParams || loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-10 items-start">
        <div className="sticky bottom-40  justify-center">
          <img
            src={StringHelpers.getProfile(
              currentProduct?.attachments?.[0],
              currentProduct?.code
            )}
            alt={currentProduct?.name}
            crossOrigin="anonymous"
          />
        </div>
        <div className="p-2 shadow">
          <div className="mb-8  border-gray-300 flex justify-between text-center">
            <h1 className="text-xl flex space-y-5 items-start font-bold text-gray-800 mb-2">
              {currentProduct?.name || product?.name}
            </h1>
            <span className="text-gray-600 flex font-bold items-center">
              مدل: {currentProduct?.code || "—"}
            </span>
          </div>
          <div className="mb-6">
            <button
              onClick={() => toggleSection("features")}
              className="flex justify-between w-full px-4 py-3 text-right text-gray-700 border-b-1 border-gray-200 transition-colors hover:bg-gray-50"
            >
              <h2 className="font15 font-semibold">ویژگی‌ها</h2>
              {openSection !== "features" ? (
                <PlusIcon className="h-5 w-5" />
              ) : (
                <MinusIcon className="h-5 w-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === "features"
                  ? "max-h-[100vh] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pt-4 pb-2 text-gray-600">
                <div className="space-y-3 grid grid-cols-2">
                  {features?.length > 0 ? (
                    features.map((item: any, index: number) => (
                      <div
                        key={item.id || index}
                        className="pb-1 last:border-b-0 flex gap-1"
                      >
                        <span>
                          <CheckCircleIcon className="text-white bg-gray-400 rounded-full font10 h-5 w-5" />
                        </span>
                        <span className="font13 text-gray">{item?.title}</span>
                        {item.value && (
                          <span className="text-gray-600 mr-2">
                            : {item.value}
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      ویژگی‌ای برای این محصول ثبت نشده است.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <button
              onClick={() => toggleSection("description")}
              className="flex justify-between w-full px-4 py-3 text-right text-gray-700 border-b-1 border-gray-200 transition-colors hover:bg-gray-50"
            >
              <h2 className="font15 font-semibold">توضیحات:</h2>
              {openSection !== "description" ? (
                <PlusIcon className="h-5 w-5" />
              ) : (
                <MinusIcon className="h-5 w-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSection === "description"
                  ? "max-h-[100vh] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pt-4 pb-2 text-gray-600">
                <p className="leading-8 whitespace-pre-line break-words font14 text-justify">
                  {description ||
                    product?.description ||
                    "توضیحی برای این محصول ثبت نشده است."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
