"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Logo from "@/src/assets/img/logo.png";
import { siteConfig } from "../config/site";
import { useRouter } from "next/navigation";
import { categoryServices } from "../api/services/categoryServices";
import MegaMenu from "./megaMenu/page";
import SearchField from "./SearchField";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RsetIsOpenMegaMenu } from "../store/slices/main";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state.product);
  const router = useRouter();
  const handleRedirect = (data: any) => {
    router.push(`/`);
  };

  return (
    <>
      <header className="bg-white w-full border-gray-200 border-b-[1px] sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <nav className="flex py-5 space-x-12">
            {siteConfig.navItems.map((item: any, index: number) => {
              const Icon = item.icon;
              if (item.hasDropdown) {
                return (
                  <button
                    key={`dropdown-${item.label}-${index}`}
                    onClick={(e) => {
                      dispatch(RsetIsOpenMegaMenu(!main?.isOpenMegaMenu));
                    }}
                    className="flex items-center cursor-pointer space-x-1 text-blue-main transition-colors duration-200 font-medium "
                  >
                    <span className="font15">{item.label}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4  transition-transform ${main?.isOpenMegaMenu ? "rotate-180" : ""}`}
                    />
                  </button>
                );
              }
              return (
                <Link
                  key={`link-${item.label}-${index}`}
                  href={item.href || "#"}
                  className="flex items-start text-blue-main space-x-1 transition-colors duration-200 font-medium  "
                >
                  <span className="font15">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <SearchField />
          <img
            onClick={handleRedirect}
            className="w-36 h-auto cursor-pointer"
            src={Logo.src}
            alt="Logo"
          />
        </div>
        {main?.isOpenMegaMenu && <MegaMenu categories={main?.categories} />}
      </header>
    </>
  );
};

export default Header;
