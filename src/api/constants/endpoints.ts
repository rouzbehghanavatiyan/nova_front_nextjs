export const ENDPOINTS = {
  CATEGORY: {
    CONFIRM_PAYMENT: (paymentId: number) => `/api/store/confirmPayment/${paymentId}`,
  },
  PRODUCT: {
    MAIN_COVER: `/cover/mainProduct`,
  },
} as const;