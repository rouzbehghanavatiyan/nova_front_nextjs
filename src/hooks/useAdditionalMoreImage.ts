"use client";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/src/store/hook";
import { RsetCategories, RsetGetMoreImage } from "@/src/store/slices/main";
import { addtionalService } from "../api/services/addtionalService";
import { categoryServices } from "../api/services/categoryServices";

export function useAdditionalMoreImage(autoFetch = true) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const dispatch = useAppDispatch();

  const fetchAdditional = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resGetMoreImage = await addtionalService.getMoreImages();
      dispatch(RsetGetMoreImage(resGetMoreImage?.data));
      setData(resGetMoreImage);
      return resGetMoreImage;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (autoFetch) {
      fetchAdditional();
    }
  }, [autoFetch, fetchAdditional]);

  return {
    data,
    loading,
    error,
    refetch: fetchAdditional,
  };
}
