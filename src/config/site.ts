import { ArchiveBoxIcon, ChartBarIcon, HomeIcon, PhoneIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "خانه",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "محصولات",
      href: "/products",
      icon: ArchiveBoxIcon,
      hasDropdown: true, // اضافه کردن این ویژگی
    },
    {
      label: "درباره ما",
      href: "/about",
      icon: ChartBarIcon,
    },
    {
      label: "ارتباط‌ با‌ما",
      href: "/connectToUs",
      icon: PhoneIcon,
    },
  ],
  productCategories: [
    {
      label: "تمام محصولات",
      href: "/products",
    },
    {
      label: "دسته‌بندی ۱",
      href: "/products?category=1",
    },
    {
      label: "دسته‌بندی ۲",
      href: "/products?category=2",
    },
    {
      label: "دسته‌بندی ۳",
      href: "/products?category=3",
    },
    {
      label: "پرفروش‌ها",
      href: "/products?sort=bestseller",
    },
  ],
};