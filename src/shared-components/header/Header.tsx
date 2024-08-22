"use client";
import "./Header.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FC, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { pathnameMap } from "@/constants/constant";
import axios from "axios";

const Header = ({ logo }: { logo: string }) => {
  const [isShow, setISShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [homeLocalData, setHomeLocalData] = useState<any>({
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
  const [categories, setCategories] = useState<any[]>([]);
  const [showModule, setShowModule] = useState<boolean>(false);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);

  useEffect(() => {
    const homeLocalState = JSON.parse(
      localStorage.getItem("homeItem") || "null"
    );
    setHomeLocalData(homeLocalState);
    async function fetchCategories() {
      setCategoryLoading(true);
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    }
    fetchCategories();
  }, [pathname]);

  const handleShow = () => {
    setISShow(!isShow);
  };

  const handleHide = () => {
    setISShow(false);
  };

  const isActive = (path: string) => pathname === path;

  const navigateTo = (path: string) => {
    setISShow(false);
    router.push(path);
  };

  const handleMouseEnter = () => {
    setShowModule(true);
  };

  const handleMouseLeave = () => {
    setShowModule(false);
  };

  return (
    <header>
      <div className="container-fluid">
        <nav className="navBar">
          <label>
            <Image
              src={logo ? logo : homeLocalData.mainLogo}
              alt="companylogo"
              width={400}
              height={150}
              className="mainLogo"
              onClick={() => router.push("/")}
            />
          </label>
          <ul className="webViewShow">
            <label className="crossCheck" onClick={handleHide}>
              <RxCross1 />
            </label>
            {Object.keys(pathnameMap).map((path) => (
              <li
                key={path}
                onMouseEnter={
                  path === "/modules" ? handleMouseEnter : undefined
                }
                onMouseLeave={
                  path === "/modules" ? handleMouseLeave : undefined
                }
              >
                <span
                  className={`${
                    isActive(path) ? "activeLinkItem" : "navLinkItem"
                  }`}
                  onClick={() => navigateTo(path)}
                  style={{ cursor: "pointer", textTransform: "capitalize" }}
                >
                  {pathnameMap[path]}
                </span>
                {path === "/modules" && showModule && !categoryLoading && (
                  <div
                    className="moduleCardMain"
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      width: "250px",
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                      // top: "80px",
                      transition: "opacity 0.3s ease-in-out",
                      zIndex: 1000,
                      opacity: showModule ? 1 : 0,
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {!categoryLoading && categories.length > 0 && (
                      <>
                        {categories?.map((item: any) => (
                          <div
                            key={item._id}
                            style={{
                              padding: "10px",
                              borderBottom: "1px solid #f0f0f0",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                            className="categoryModuleItems"
                            onClick={() => navigateTo(`/modules/${item._id}`)}
                          >
                            {item.category}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          {isShow && (
            <ul>
              <label className="crossCheck" onClick={handleHide}>
                <RxCross1 />
              </label>
              {Object.keys(pathnameMap).map((path) => (
                <li key={path}>
                  <span
                    className={`${
                      isActive(path) ? "activeLinkItem" : "navLinkItem"
                    }`}
                    onClick={() => navigateTo(path)}
                    style={{ cursor: "pointer" }}
                  >
                    {pathnameMap[path]}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <label className="MenuIcon" onClick={handleShow}>
            <GiHamburgerMenu />
          </label>
        </nav>
      </div>
    </header>
  );
};

export default Header;
