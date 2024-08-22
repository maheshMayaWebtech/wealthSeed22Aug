"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "../roots.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "@/shared-components/header/Header";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
import Footer from "@/shared-components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = ["/login", "/dashboard"];
  const showHeaderFooter = hideNavbar.includes(pathname);
  const [homeData, setHomeData] = useState<any>({
    _id: "66b3687038621c01e209b71c",
    homeTitle: "Free and Open ",
    homeSubtitle: "Stock Market and Financial Education\r\n",
    homeDescription:
      "FinanceWithArnav is an extensive and in-depth collection of stock market and financial lessons created by Arnav. It is free and openly accessible to everyone and is one of the largest financial education resources on the web. No signup, no pay-wall, no ads.\r\n\r\n",
    homeRightImage:
      "https://res.cloudinary.com/dtanynxqy/image/upload/v1724233544/home_images/xtz1eapeexqolhjtnzcc.png",
    mainLogo:
      "https://res.cloudinary.com/dtanynxqy/image/upload/v1724233321/home_logos/defeesphcvzxkq0ttzey.png",
    __v: 0,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resp = await axios.get("/api/home");
        const responseData = resp?.data?.[0];
        localStorage.setItem("homeItem", JSON.stringify(responseData));
        setHomeData(responseData);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {!showHeaderFooter && <Header logo={homeData?.mainLogo} />}
        {children}
        {!showHeaderFooter && <Footer logo={homeData?.mainLogo} />}
        <ToastContainer />
      </body>
    </html>
  );
}
