"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TopContent = dynamic(() => import("./home/TopContent"), {
  ssr: false,
});

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-6xl h-64 bg-gray-200 animate-pulse rounded-lg"></div>
        }
      >
        <TopContent />
      </Suspense>
    </section>
  );
}
