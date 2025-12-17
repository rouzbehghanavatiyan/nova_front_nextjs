"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import NewProduct from "./home/NewProduct";
import PopularProduct from "./home/PopularProduct";
import CategoryContentPage from "./categoryContent/page";
import { categoryServices } from "../api/services/categoryServices";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RsetCategories } from "../store/slices/main";
import Achievements from "./home/Achievements";

const TopContent = dynamic(() => import("./home/TopContent"), {
  ssr: false,
});

export default function Home() {
  const main = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleGetAllCategories = async () => {
    const res: any = await categoryServices.getAllCategories();
    dispatch(RsetCategories(res?.data));
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <section className="flex flex-col">
      <Suspense
        fallback={
          <div className="w-full max-w-6xl h-64 bg-gray-200 animate-pulse  rounded-lg"></div>
        }
      >
        <TopContent />
        {/* <CompanyRecords /> */}
        <CategoryContentPage categories={main?.categories || []} />
        <NewProduct />
        {/* <MainTitle /> */}
        <PopularProduct />
      </Suspense>
    </section>
  );
}