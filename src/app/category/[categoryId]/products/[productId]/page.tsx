"use client";
import React, { useEffect, useState } from "react";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppSelector } from "@/src/store/hook";
import { productService } from "@/src/api/services/productService";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
  const [isOpen, setIsOpen] = useState({
    features: true,
    description: false,
  });
  const [resolvedParams, setResolvedParams] = useState<{
    categoryId: string;
    productId: string;
  } | null>(null);

  const { currentProduct }: any = useAppSelector((state) => state.product);
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

  const toggleSection = (section: string) => {
    setIsOpen((prev: any) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
            src={StringHelpers.getProfile(currentProduct?.attachments?.[0])}
            alt={currentProduct?.name}
            crossOrigin="anonymous"
          />
        </div>
        <div className="p-2 shadow">
          <div className="mb-8  border-gray-300 flex justify-between text-center">
            <h1 className="text-3xl items-start font-bold text-gray-800 mb-2">
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
              <h2 className="text-xl font-semibold">ویژگی‌ها</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  isOpen.features ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen.features ? " opacity-100" : "max-h-0 opacity-0"
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
                        <span className=" text-gray">{item?.title}</span>
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
              <h2 className="text-xl font-semibold">توضیحات:</h2>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  isOpen.description ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen.description
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pt-4 pb-2 text-gray-600">
                <p className="leading-8 whitespace-pre-line break-words text-justify">
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
