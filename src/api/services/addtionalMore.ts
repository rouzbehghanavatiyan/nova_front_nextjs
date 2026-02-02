"use client";
import { useCallback, useEffect, useState } from "react";
import { addtionalService } from "./addtionalService";
import { useAppDispatch } from "@/src/store/hook";
import { RsetGetMoreImage } from "@/src/store/slices/main";

export function useAdditionalService(autoFetch = true) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const dispatch = useAppDispatch();

  const fetchAdditional = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await addtionalService.getMoreImages();
      setData(res);
      dispatch(RsetGetMoreImage(res?.data));
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
