import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  en_name: string;
  code: string;
  attachments?: any[];
  price?: number;
  description?: string;
}

interface ProductState {
  currentProduct: Product | null;
  recentProducts: Product[];
  moreImages: [];
  loading: boolean;
  error: string | null;
  isOpenMegaMenu: boolean;
  categories: any;
}

const initialState: ProductState = {
  currentProduct: null,
  recentProducts: [],
  moreImages: [],
  loading: false,
  error: null,
  isOpenMegaMenu: false,
  categories: {},
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
      if (action.payload) {
        // اضافه کردن به محصولات اخیر (بدون duplicate)
        const exists = state.recentProducts.some(
          (p) => p.id === action.payload?.id,
        );
        if (!exists) {
          state.recentProducts.unshift(action.payload);
          // محدود کردن به 10 محصول اخیر
          if (state.recentProducts.length > 10) {
            state.recentProducts.pop();
          }
        }
      }
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    addToRecentProducts: (state, action: PayloadAction<Product>) => {
      const exists = state.recentProducts.some(
        (p) => p.id === action.payload.id,
      );
      if (!exists) {
        state.recentProducts.unshift(action.payload);
        if (state.recentProducts.length > 10) {
          state.recentProducts.pop();
        }
      }
    },
    removeFromRecentProducts: (state, action: PayloadAction<number>) => {
      state.recentProducts = state.recentProducts.filter(
        (product) => product.id !== action.payload,
      );
    },
    clearRecentProducts: (state) => {
      state.recentProducts = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    RsetIsOpenMegaMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpenMegaMenu = action.payload;
    },
    RsetCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
    RsetGetMoreImage: (state, action: PayloadAction<any>) => {
      state.moreImages = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentProduct,
  clearCurrentProduct,
  addToRecentProducts,
  removeFromRecentProducts,
  clearRecentProducts,
  setLoading,
  RsetIsOpenMegaMenu,
  setError,
  RsetCategories,
  RsetGetMoreImage,
} = mainSlice.actions;

export default mainSlice.reducer;
