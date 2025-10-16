import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_NEST_BASE_URI;

if (!baseURL) {
  console.warn("NEXT_PUBLIC_NEST_BASE_URI is not defined");
}

console.log(
  "baseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURLbaseURL",
  baseURL
);

export const baseClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

baseClient.interceptors.request.use(
  (config) => {
    // افزودن توکن اگر وجود دارد
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || error.message || "خطای ناشناخته";

    if (error.response?.status === 401) {
      console.error("Unauthorized access");
      // redirect to login page
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
