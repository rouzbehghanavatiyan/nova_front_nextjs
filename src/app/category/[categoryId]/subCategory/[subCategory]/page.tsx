"use client";
import React, { useEffect, useState } from "react";
import { categoryServices } from "@/src/api/services/categoryServices";
import { useParams, useRouter } from "next/navigation";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppDispatch, useAppSelector } from "@/src/store/hook";
import { RsetSubCategoryProducts } from "@/src/store/slices/main";
import Loading from "@/src/components/Loading";
import { useToast } from "@/src/components/Toastify";

interface SubCategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const SubCategoryPage: React.FC<SubCategoryPageProps> = ({ params }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const main = useAppSelector((state) => state.product);
  const subCategoryProducts = main?.subCategoryProducts || [];
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<any>(null);
  const router = useRouter();

  const resolveParams = async () => {
    const resolved = await params;
    setResolvedParams(resolved);
  };

  const fetchCategoryData = async () => {
    if (!resolvedParams) return;
    try {
      setLoading(true);
      const res = await categoryServices.getSubCategoryById(
        resolvedParams.subCategory,
      );
      if (res?.data) {
        dispatch(RsetSubCategoryProducts(res?.data || []));
        setCategory({
          id: resolvedParams.categoryId,
        });
        setLoading(false);
      } else {
        toast.error("محصولی برای نمایش وجود ندارد");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: any) => {
    if (!resolvedParams) return;
    console.log("product", product);
    // router.push(`/category/${resolvedParams.categoryId}/products/${product.id}`);
    router.push(
      `/products/${product?.productid || product?.id}/${product.name}`,
    );
  };

  useEffect(() => {
    if (resolvedParams) {
      fetchCategoryData();
    }
  }, [resolvedParams]);

  useEffect(() => {
    resolveParams();
  }, [params]);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <Loading active={loading ? true : false} />}
        {subCategoryProducts?.map((product: any) => {
          const imgUrl = StringHelpers.getProfile(
            product.attachments?.[0],
            product.code,
          );
          if (product?.categoryId !== null) {
            return (
              <div
                key={product.code}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer group border border-gray-200 p-4 transition-shadow hover:shadow-lg"
              >
                <div className="flex">
                  <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-cover rounded mb-4 transition-all duration-300 ease-out group-hover:scale-110"
                    crossOrigin="anonymous"
                  />
                  <span className="text-gray-400">مدل:</span>
                  <span className="text-gray-400">{product.code}</span>
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
};

export default SubCategoryPage;
