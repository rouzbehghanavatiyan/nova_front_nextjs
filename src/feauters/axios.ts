import axios from "axios";
// import { store } from "../hooks/store";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor برای مدیریت خطاها
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config: any) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.url.toLowerCase().includes("/attachmentplay")) {
      config.headers["Content-Type"] = "video/mp4";
    } else if (config.url.toLowerCase().includes("/addattachment")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    const errorCodes = [0, 2, 5, 10, 11];
    if (!!response?.data?.code && !errorCodes.includes(response?.data?.code)) {
      //   store.dispatch(
      //     RsetMessageModal({
      //       show: true,
      //       title: "Internal server error",
      //       icon: "danger",
      //     })
      //   );
    }
    return response;
  },
  async function (error) {
    const status = error?.response?.status;

    if (status === 401) {
      //   store.dispatch(
      //     RsetMessageModal({
      //       show: true,
      //       title: error.response?.data?.message || "Unauthorized access",
      //       icon: "danger",
      //     })
      //   );

      console.log(error);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (status >= 400 && status < 500) {
      //   store.dispatch(
      //     RsetMessageModal({
      //       show: true,
      //       title: error.response?.data?.message || "Client error",
      //       icon: "danger",
      //     })
      //   );
      return Promise.reject(error);
    }

    // store.dispatch(
    //   RsetMessageModal({
    //     show: true,
    //     title: "An unexpected error occurred",
    //     icon: "danger",
    //   })
    // );
    return Promise.reject(error);
  }
);
