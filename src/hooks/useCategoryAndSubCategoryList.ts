import { useCallback, useEffect, useState } from "react";
import { categoryServices } from "../api/services/categoryServices";
import { RsetCategories } from "../store/slices/main";
import { useAppDispatch } from "../store/hook";

export const useCategoryAndSubCategoryList = (autoFetch = true) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const dispatch = useAppDispatch();

  const fetchAdditional = useCallback(async () => {
    setLoading(true);
    try {
      const resGetAllCategories = await categoryServices.getAllCategories();
      console.log(resGetAllCategories?.data);
      dispatch(RsetCategories(resGetAllCategories?.data));
      setData(resGetAllCategories);
      return resGetAllCategories;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdditional();
  }, []);

  return {
    data,
    loading,
    refetch: fetchAdditional,
  };
};
