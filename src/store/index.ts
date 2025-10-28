import { configureStore } from '@reduxjs/toolkit';
import mainSlice from './slices/main';
// سایر sliceها را اینجا import کنید

export const makeStore = () => {
  return configureStore({
    reducer: {
      product: mainSlice,
      // سایر reducerها اینجا اضافه شوند
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];