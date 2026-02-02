"use client";

import React from "react";
import { useAdditionalService } from "./addtionalMore";

export default function AppServices({
  children,
}: {
  children: React.ReactNode;
}) {

  useAdditionalService(true);

  return <>{children}</>;
}
