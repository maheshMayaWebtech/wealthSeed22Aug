"use client";
import "./Footer.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = ({ logo }: { logo: string }) => {
  let date = new Date();
  let orgdate = date.getFullYear();
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
  const [currentYear, setCurrentYear] = useState(orgdate);
  useEffect(() => {
    const homeLocalState = JSON.parse(
      localStorage.getItem("homeItem") || "null"
    );
    setHomeLocalData(homeLocalState);
    const interval = setInterval(() => {
      setCurrentYear(currentYear);
    }, 60000);

    return () => clearInterval(interval);
  }, [currentYear]);
  return (
    <>
      <footer className="footBar">
        <div className="row">
          <div className="footBarLeftLogoSection col-lg-3 mb-4">
            <label>
              <Image
                height={100}
                width={150}
                src={logo ? logo : homeLocalData.mainLogo}
                alt="logo"
                className="mainlogo"
              />
            </label>
            <div className="SocialIcon">
              <FaFacebook className="mediaHandleIcon" />
              <Link
                href={"https://www.instagram.com/financewith_arnav"}
                target="_blank"
              >
                <FaInstagram className="mediaHandleIcon" />
              </Link>
              <FaLinkedin className="mediaHandleIcon" />
            </div>
          </div>
          <div className="col-lg-3 mb-3">
            <div>
              <h2 className="QuickLinkHead">Quick Links</h2>
              <span className="lineShow"></span>
              <ul className="footLinkInfo">
                <li>
                  <Link href="/home" className="footNavCont">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/modules" className="footNavCont">
                    Modules
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="footNavCont">
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="/aboutus" className="footNavCont">
                    About us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <h1 className="disclaimInfoCont">Disclaimer</h1>
              <span className="lineShow"></span>
              <p className="disclaimCont">
                We do not provide investment advice or tips to buy/sell
                securities. We promote independent research and decision-making.
                We are not SEBI registered and do not guarantee any financial
                returns. Our organization is not affiliated with any specific
                company or financial institution unless otherwise stated.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="outerBoxWrapper">
        <h2 className="copyRightSection">
          Copyright © {currentYear} The WealthSeed. All rights reserved.
        </h2>
      </div>
    </>
  );
};

export default Footer;
