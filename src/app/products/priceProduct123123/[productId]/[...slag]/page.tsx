"use client";
import { productService } from "@/src/api/services/productService";
import StringHelpers from "@/src/config/StringHelpers";
import { useAppSelector } from "@/src/store/hook";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";

const Page: React.FC<any> = ({ params }) => {
  const handleDownloadPDF = async () => {
    const domtoimage = (await import("dom-to-image-more")).default;
    const node = document.getElementById("pdf-content");
    if (!node) return;
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const A4_WIDTH_PX = 794;
    const A4_HEIGHT_PX = 1123;
    const dataUrl = await domtoimage.toPng(node, {
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      quality: 1,
      style: {
        backgroundColor: "white",
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    });
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = A4_WIDTH_MM;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const finalHeight = pdfHeight > A4_HEIGHT_MM ? A4_HEIGHT_MM : pdfHeight;

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      pdfWidth,
      finalHeight,
      undefined,
      "FAST",
    );
    pdf.save(product.name);
  };

  const [product, setProduct] = useState<any>(null);
  const [features, setFeatures] = useState<any>([]);
  const main: any = useAppSelector((state) => state.product);
  const logo: any = main?.moreImages?.find(
    (item: any) => item?.fileName === "6262",
  );
  const imageFix = `${StringHelpers.baseURL}/${logo?.attachmentType}/${logo?.fileName}${logo?.ext}`;
  const [resolvedParams, setResolvedParams] = useState<{
    categoryId: string;
    productId: string;
  } | null>(null);

  const resolveParams = async () => {
    const resolved = await params;
    setResolvedParams(resolved);
  };

  useEffect(() => {
    resolveParams();
  }, [params]);

  const handleGetProduct = async () => {
    if (!resolvedParams) return;
    try {
      const res = await productService.getProduct(
        Number(resolvedParams.productId),
      );
      console.log("vvvvvv", res);
      const { code, data }: any = res;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  };

  const handleGetFeaturesProduct = async () => {
    if (!resolvedParams) return;
    try {
      const res = await productService.getFeaturesFromProduct(
        Number(resolvedParams.productId),
      );
      const { code, data }: any = res;
      if (code === 0) setFeatures(data);
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  };

  useEffect(() => {
    if (resolvedParams) {
      handleGetFeaturesProduct();
      handleGetProduct();
    }
  }, [resolvedParams]);

  console.log(product);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          #pdf-content * {
            border-style: none;
          }
          #pdf-content .border,
          #pdf-content .border-y,
          #pdf-content hr {
            border-style: solid !important;
          }
        `,
        }}
      />

      <button
        onClick={handleDownloadPDF}
        className="fixed top-24 left-12 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-lg z-50 cursor-pointer"
      >
        دانلود PDF
      </button>

      <div
        id="pdf-content"
        style={{
          width: "794px",
          height: "1123px",
          background: "white",
          padding: "20px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
        className="border-1"
      >
        <div className="flex w-full h-full">
          <div className="w-[70%] pr-4 flex flex-col overflow-hidden">
            <p className="w-1/4 p-1 font20 text-white bg-blue-600">
              بهمن / 1404
            </p>
            <p className="font20 font-light text-gray-500">
              این یک ابزار واقعیست
            </p>
            <hr className="my-2 border-blue-600" />
            <p className="font20 font-light text-gray-500">لیست قیمت</p>
            <p className="font20 font-light text-gray-500 mb-6">
              {product?.en_name}
            </p>

            <div className="flex border border-gray-300">
              <div className="w-1/4 bg-blue-600 text-white flex flex-col items-center justify-center ">
                <span className="text-lg font-light">MODEL</span>
                <span
                  className="text-3xl font-bold p-1"
                  style={{ fontFamily: "inherit", direction: "ltr" }}
                >
                  {product?.code}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-gray-500 text-white p-1 font-medium">
                  {product?.name}
                </div>
                <div className="flex border-y border-gray-300">
                  <div className="w-1/2 bg-gray-500 text-white p-1 text-center">
                    تعداد داخل کارتن
                  </div>
                  <div className="w-1/2 bg-red-500 text-white p-1 text-center">
                    قیمت (ریال)
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 p-1 border border-gray-300 text-center">
                    2
                  </div>
                  <div className="w-1/2 p-1 border border-red-500 text-center">
                    {StringHelpers.formatPrice(product?.priceProduct)}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 overflow-hidden">
              {features?.length > 0 ? (
                features.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-700 pb-1"
                  >
                    <CheckCircleIcon className="text-blue-600 h-5 w-5 mr-1" />
                    <span className="text-sm font-light">{item.title}</span>
                    {item.value && (
                      <span className="mr-1 text-sm">: {item.value}</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  ویژگی‌ای برای این محصول ثبت نشده.
                </p>
              )}
            </div>
          </div>
          <div className="w-[30%] flex flex-col items-center justify-start p-3">
            <img src={imageFix} className=" mb-2" />
            {product?.attachments
              ?.slice(0, 2)
              .map((item: any, i: number) => (
                <img
                  key={i}
                  src={StringHelpers.getProfile(
                    item,
                    item?.fileName || product?.code,
                  )}
                  className="mb-2"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
