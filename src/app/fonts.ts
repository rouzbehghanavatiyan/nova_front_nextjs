import localFont from "next/font/local";

export const iransans = localFont({
  src: [
    {
      path: "../assets/fonts/IRANSansWebFaNum_Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansWebFaNum_Medium.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansWebFaNum_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANSansWeb_Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});
