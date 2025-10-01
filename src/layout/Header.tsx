import Link from "next/link";
import {
  HomeIcon,
  PhoneIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/src/assets/img/logo.svg";
import { siteConfig } from "../config/site";
import { Input } from "@heroui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Header: React.FC = () => {
  return (
    <header className="bg-black w-full shadow-2xl border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <nav className="flex space-x-8">
          {siteConfig.navItems.map((item: any) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-white hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex justify-around w-5xl gap-10">
          <Input
            // endContent={
            //   <MagnifyingGlassIcon style={{ fontSize: "10px !important" }} />
            // }
            variant="bordered"
            color="primary"
            className="text-white h-8 "
            placeholder="جستجو . . ."
            type="email"
          />
          <Link href="/" className="flex items-center space-x-2">
            <img className="w-36 h-auto" src={Logo.src} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="md:hidden bg-white border-t border-gray-200">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex flex-col space-y-4">
            {siteConfig.navItems.map((item: any) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 text-white hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Link
                href="/login"
                className="px-4 py-2 text-center text-white hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium"
              >
                ورود
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                ثبت‌نام
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
