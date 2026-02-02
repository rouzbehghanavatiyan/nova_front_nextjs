"use client";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/color-new-09.svg";
import { siteConfig } from "../config/site";
import { useRouter } from "next/navigation";
import MegaMenu from "./megaMenu/page";
import SearchField from "./SearchField";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RsetIsOpenMegaMenu } from "../store/slices/main";
import ResponsiveMaker from "../components/ResponsiveMaker";

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
          <ResponsiveMaker visibleWidth={768}>
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
                      className="flex items-center cursor-pointer space-x-1 text-blue-main duration-200 font-medium transition-all hover:text-main hover:scale-105"
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
            src={Logo.src}
          />
        </div>
        {main?.isOpenMegaMenu && <MegaMenu categories={main?.categories} />}
      </header>
    </>
  );
};

export default Header;
