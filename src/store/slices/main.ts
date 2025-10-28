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
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  currentProduct: null,
  recentProducts: [],
  loading: false,
  error: null,
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
          (p) => p.id === action.payload?.id
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
        (p) => p.id === action.payload.id
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
        (product) => product.id !== action.payload
      );
    },
    clearRecentProducts: (state) => {
      state.recentProducts = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
  setError,
} = mainSlice.actions;

export default mainSlice.reducer;
