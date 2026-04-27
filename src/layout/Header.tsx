"use client";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { siteConfig } from "../config/site";
import { usePathname, useRouter } from "next/navigation";
import MegaMenu from "./megaMenu/page";
import SearchField from "./SearchField";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  RsetFilteredProduct,
  RsetIsOpenMegaMenu,
  RsetSubCategoryProducts,
} from "../store/slices/main";
import ResponsiveMaker from "../components/ResponsiveMaker";
import StringHelpers from "../config/StringHelpers";
import { useEffect, useState } from "react";
import { productService } from "../api/services/productService";
import { ComboBox } from "../components/ComboBox";
import { Button } from "@mui/material";
import Loading from "../components/Loading";
import { useToast } from "../components/Toastify";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const main: any = useAppSelector((state) => state.product);
  const logo: any = main?.moreImages?.find(
    (item: any) => item?.fileName === "6262",
  );
  const [subDetailes, setSubDetailes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allSubDetailes, setAllSubDetailes] = useState([]);
  const [allDetail, setAllDetail] = useState([]);
  const [detail, setDetail] = useState<any>({}); // single
  const imageFix = `${StringHelpers.baseURL}/${logo?.attachmentType}/${logo?.fileName}${logo?.ext}`;
  const router = useRouter();
  const handleRedirect = (data: any) => {
    router.push(`/`);
  };
  const pathname = usePathname();

  const showFiltered =
    pathname.includes("/category") ||
    /^\/category\/\d+\/subCategory\/\d+$/.test(pathname);

  const handleGetAllDetails = async () => {
    try {
      const res = await productService.getAllDetails();
      const { data, code, message }: any = res;
      if (code === 0) {
        setAllDetail(data);
      } else {
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleGetAllSubDetails = async () => {
    try {
      console.log(detail);
      const resAllProduct: any = await productService.allSubDetails(detail?.id);
      console.log(resAllProduct?.data);
      setAllSubDetailes(resAllProduct?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFiltered = async () => {
    try {
      const fixSubDetails = subDetailes?.map(
        (item: { id: string | number }) => item?.id,
      );
      setIsLoading(true);
      const postData = {
        subDetailes: fixSubDetails,
        subCategoryId: Number(pathname?.split("subCategory/")?.[1]),
      };
      const resAllProduct: any = await productService.filterProduct(postData);
      if (resAllProduct?.data?.length > 0) {
        const productIds = resAllProduct.data.map((p: any) => p.name);
        console.log(resAllProduct.data);
        dispatch(RsetSubCategoryProducts(resAllProduct.data || []));
        // router.push(`/filteredProduct?products=${productIds.join(",")}`);
        setIsLoading(false);
      } else {
        toast.error("محصولی برای نمایش وجود ندارد");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllDetails();
  }, []);

  useEffect(() => {
    if (!!detail?.id) {
      handleGetAllSubDetails();
    }
  }, [detail?.id]);

  return (
    <>
      <Loading active={isLoading} />
      <header className="bg-white w-full border-gray-200 border-b-[1px] sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <ResponsiveMaker visibleWidth={768}>
            <nav className="flex py-5 space-x-12">
              {siteConfig.navItems.map((item: any, index: number) => {
                if (item.hasDropdown) {
                  return (
                    <button
                      key={`dropdown-${item.label}-${index}`}
                      onClick={() =>
                        dispatch(RsetIsOpenMegaMenu(!main?.isOpenMegaMenu))
                      }
                      className="flex items-center cursor-pointer space-x-1 text-blue-main duration-200 font-medium transition-all hover:text-main hover:scale-105"
                    >
                      <span className="font15">{item.label}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${main?.isOpenMegaMenu ? "rotate-180" : ""}`}
                      />
                    </button>
                  );
                }
                return (
                  <Link
                    key={`link-${item.label}-${index}`}
                    href={item.href || "#"}
                    className="flex items-start transform transition-all hover:text-main hover:scale-105 text-blue-main space-x-1 duration-200 font-medium"
                  >
                    <span className="font15">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </ResponsiveMaker>
          <SearchField />
          <img
            onClick={handleRedirect}
            className="w-36 cursor-pointer"
            src={imageFix}
            alt="logo"
          />
        </div>
        {main?.isOpenMegaMenu && <MegaMenu categories={main?.categories} />}
      </header>
      {showFiltered && (
        <div className="bg-gray-100 flex gap-3 py-2">
          <span className="ms-5 flex items-center justify-center">
            <FunnelIcon className="text-gray-400 w-5 h-5" />
          </span>
          <ComboBox
            optionLabel="title"
            optionValue="id"
            label="مشخصات"
            options={allDetail}
            value={detail}
            onChange={(e: any) => setDetail(e)}
          />
          {detail?.id && (
            <ComboBox
              multiple
              label="زیرمشخصات"
              value={subDetailes}
              onChange={(e: any) => setSubDetailes(e)}
              options={allSubDetailes}
              optionLabel="title"
              optionValue="id"
            />
          )}
          {subDetailes.length !== 0 && (
            <span className="flex items-center">
              <Button
                color="success"
                variant="contained"
                onClick={handleFiltered}
              >
                تایید
              </Button>
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
