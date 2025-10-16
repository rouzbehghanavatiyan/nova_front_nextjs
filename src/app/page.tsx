"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import CompanyRecords from "./home/CompanyRecords";
import MostPopular from "./home/MostPopular";
import MainProduct from "./home/MainProduct";
import LearningAboutProduct from "./home/LearningAboutProduct";

const TopContent = dynamic(() => import("./home/TopContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <section className="flex flex-col  gap-4">
      <Suspense
        fallback={
          <div className="w-full max-w-6xl h-64 bg-gray-200 animate-pulse  rounded-lg"></div>
        }
      >
        <TopContent />
        <CompanyRecords />
        <MainProduct />
        <MostPopular />
        <LearningAboutProduct />
        {/* <LatestProduct /> */}
      </Suspense>
    </section>
  );
}
