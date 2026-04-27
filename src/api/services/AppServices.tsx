"use client";
import React from "react";
import { useAdditionalMoreImage } from "@/src/hooks/useAdditionalMoreImage";
import { useCategoryAndSubCategoryList } from "@/src/hooks/useCategoryAndSubCategoryList";

export default function AppServices({
  children,
}: {
  children: React.ReactNode;
}) {
  useAdditionalMoreImage(true);
  useCategoryAndSubCategoryList(true);

  return <>{children}</>;
}
