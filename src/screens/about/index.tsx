import { FC } from "react";
import "./index.css";
import Image from "next/image";

const AboutUs: FC = () => {
  return (
    <div className="container-fluid">
      <section className="aboutCompany">
        <div>
          <h1 className="aboutInfoHead">About us</h1>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6">
              <label className="w-100 mt-2">
                <Image
                  src={
                    "https://res.cloudinary.com/dqcr5yn0b/image/upload/v1723612707/aboulogo_hs0jiz.webp"
                  }
                  alt="aboutCompnayLogo"
                  className="fincafeLogo"
                  width={500}
                  height={500}
                />
              </label>
            </div>
            <div className="col-lg-6">
              <div className="aboutCompanyInfo">
                <p className="innerInfoCont">Who We Are</p>
                <h2 className="innerInfoHead">Welcome to The WealthSeed</h2>
                <span className="lineShow mb-4"></span>
                <div>
                  <h4>About Me</h4>
                  <p className="subInnerCont mb-5">
                    Hi everyone, I am Arnav, a passionate educator and mentor in
                    the fields of stock market and personal finance. Since 2023,
                    I’ve had the privilege of guiding over 300 individuals on
                    their financial journeys, helping them understand the
                    complexities of the stock market and personal finance.
                  </p>
                  <h4>Our Mission</h4>
                  <p className="subInnerCont">
                    At The WealthSeed, our mission is to simplify financial
                    education and make it accessible to everyone. This website
                    is dedicated to both the trader community and the investor
                    community, aiming to provide the knowledge and tools needed
                    to start and succeed in the world of finance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
