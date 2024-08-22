"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import CardBox from "./varsitycard/CardBox";
import EducationVideo from "./video/EducationVideo";
import axios from "axios";

const Homepage = () => {
  const [homeData, setHomeData] = useState<any>(null);
  const [homeLocalData, setHomeLocalData] = useState<any>({
    _id: "66b3687038621c01e209b71c",
    homeTitle: "Free and Open",
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
    const homeLocalState = JSON.parse(
      localStorage.getItem("homeItem") || "null"
    );
    if (homeLocalState) {
      setHomeLocalData(homeLocalState);
    }

    const fetchDetails = async () => {
      try {
        const resp = await axios.get("/api/home");
        const responseData = resp?.data?.[0];
        if (responseData) {
          localStorage.setItem("homeItem", JSON.stringify(responseData));
          setHomeData(responseData);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    };

    fetchDetails();
  }, []);

  const title = homeData?.homeTitle || homeLocalData?.homeTitle;
  const subtitle = homeData?.homeSubtitle || homeLocalData?.homeSubtitle;
  const description =
    homeData?.homeDescription || homeLocalData?.homeDescription;
  const imageSrc = homeData?.homeRightImage || homeLocalData?.homeRightImage;

  return (
    <div className="container-fluid mainHomeContainer">
      <section className="heroBanner mb-5">
        <div className="row">
          <div className="col-lg-7">
            <div>
              <h1 className="bannerMainHead">
                {title}
                <span className="innerMainHead mb-4">{subtitle}</span>
              </h1>
              <p className="bannerMainCont">{description}</p>
            </div>
          </div>
          <div className="col-lg-5">
            <label>
              <img src={imageSrc} alt="financiallogo" />
            </label>
          </div>
        </div>
      </section>

      <section className="ExploreVarsity mb-5">
        <div>
          <h2 className="varsityInnerHead mb-4">Explore WealthSeed</h2>
        </div>
        <div className="outerBox">
          <CardBox />
        </div>
      </section>

      <section className="videoBox mb-5">
        <div>
          <h2 className="educationVideo mb-5">Videos</h2>
        </div>
        <div className="videoWrapperBox">
          <EducationVideo />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
