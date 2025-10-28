import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { siteConfig } from "@/src/config/site";
import { Header } from "../layout/Header";
import Footer from "../layout/Footer";
import { iransans } from "./fonts";
import { ProductProvider } from "../context/ContextProvider";
import { Provider } from "react-redux";
import StoreProvider from "../store/storeProvider";

export const metadata: Metadata = {
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${iransans.variable} ${iransans.className}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <StoreProvider>
            <Header />
            {children}
            <Footer />
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
