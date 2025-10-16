"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArchiveBoxIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/src/assets/img/logo.png";
import { siteConfig } from "../config/site";
import { useRouter } from "next/navigation";
import { categoryServices } from "../api/services/categoryServices";

import MegaMenu from "./megaMenu/page";

export const Header: React.FC = () => {
  const [isProductsPanelOpen, setIsProductsPanelOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const router = useRouter();

  const handleRedirect = (data: any) => {
    console.log(data);
    router.push(`/product/detail/${data}`);
  };

  const handleGetAllCategories = async () => {
    const res: any = await categoryServices.getAllCategories();
    setCategories(res?.data);
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <>
      <header className="bg-white w-full border-gray-200 border-b-[1px] sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-5 px-6">
          <nav className="flex space-x-12">
            {siteConfig.navItems.map((item: any, index: number) => {
              const Icon = item.icon;
              if (item.hasDropdown) {
                return (
                  <button
                    key={`dropdown-${item.label}-${index}`}
                    onClick={() => setIsProductsPanelOpen(!isProductsPanelOpen)}
                    className="flex items-center space-x-1 text-blue-600 transition-colors duration-200 font-medium hover:text-blue-700"
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                    <span className="font20">{item.label}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${isProductsPanelOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                );
              }
              return (
                <Link
                  key={`link-${item.label}-${index}`}
                  href={item.href || "#"}
                  className="flex items-start space-x-1 text-blue-600 transition-colors duration-200 font-medium hover:text-blue-700"
                >
                  {Icon && <Icon className="w-6 h-6" />}
                  <span className="font20">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <img className="w-36 h-auto" src={Logo.src} alt="Logo" />
        </div>
        {isProductsPanelOpen && (
          <MegaMenu
            setIsProductsPanelOpen={setIsProductsPanelOpen}
            categories={categories}
          />
        )}
      </header>
      {isProductsPanelOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 mt-[calc(100%-1px)]"
          onClick={() => setIsProductsPanelOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
