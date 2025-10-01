import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // می‌توانید توکن احراز هویت را اینجا اضافه کنید
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || "خطای ناشناخته";

    // مدیریت خطاهای مختلف
    if (error.response?.status === 401) {
      // redirect to login
      console.error("Unauthorized access");
    } else if (error.response?.status === 404) {
      console.error("Resource not found");
    } else if (error.response?.status >= 500) {
      console.error("Server error");
    }

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export const getCategories = async (paymentId: number) => {
  try {
    const response = await apiClient.patch(
      `/api/store/confirmPayment/${paymentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};
