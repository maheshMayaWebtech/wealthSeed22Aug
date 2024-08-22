"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "@/utils/toast";


const HomePageEdit: React.FC = () => {
  const [homeData, setHomeData] = useState<any>({});
  const [mainLogo, setMainLogo] = useState<File | string | null>();
  const [homeRightImage, setHomeRightImage] = useState<File | string | null>();
  const [homeSubtitle, setHomeSubtitle] = useState("");
  const [homeDescription, setHomeDescription] = useState("");
  const [homeTitle, setHomeTitle] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resp = await axios.get("/api/home");
        const responseData = resp?.data?.[0];
        setHomeData(responseData);
        setMainLogo(responseData?.mainLogo);
        setHomeRightImage(responseData?.homeRightImage);
        setHomeSubtitle(responseData?.homeSubtitle);
        setHomeDescription(responseData?.homeDescription);
        setHomeTitle(responseData?.homeTitle);
      } catch (error) {}
    };
    fetchDetails();
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    if (mainLogo) formData.append("mainLogo", mainLogo);
    if (homeRightImage) formData.append("homeRightImage", homeRightImage);
    formData.append("homeSubtitle", homeSubtitle);
    formData.append("homeDescription", homeDescription);
    formData.append("homeTitle", homeTitle);
    formData.append("_id", homeData?._id);

    try {
      await axios.post("/api/home", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastSuccess("Updated successfully")
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="edit-home-main-container">
      <form onSubmit={handleSubmit} className="home-edit-form">
        <div className="form-group">
          <label htmlFor="mainLogo">Main Logo</label>
          <input
            type="file"
            id="mainLogo"
            onChange={(e) => e.target.files && setMainLogo(e.target.files[0])}
          />
          {typeof mainLogo === "string" && (
            <Image
              style={{ marginTop: "10px" }}
              src={mainLogo}
              alt="logo"
              height={100}
              width={200}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="homeTitle">Home Title</label>
          <input
            type="text"
            id="homeTitle"
            value={homeTitle}
            onChange={(e) => setHomeTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="homeSubtitle">Home Subtitle</label>
          <input
            type="text"
            id="homeSubtitle"
            value={homeSubtitle}
            onChange={(e) => setHomeSubtitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="homeDescription">Home Description</label>
          <textarea
            id="homeDescription"
            value={homeDescription}
            onChange={(e) => setHomeDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="homeRightImage">Home Right Image</label>
          <input
            type="file"
            id="homeRightImage"
            onChange={(e) =>
              e.target.files && setHomeRightImage(e.target.files[0])
            }
          />
          {typeof homeRightImage === "string" && (
            <Image
              style={{ marginTop: "10px" }}
              src={homeRightImage}
              alt="logo"
              height={100}
              width={200}
            />
          )}
        </div>

        <button className="edithomeButton" type="submit">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default HomePageEdit;
