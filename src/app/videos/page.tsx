"use client";
import React, { useEffect, useState } from "react";
import VideosScreen from "@/screens/videos";
import axios from "axios";
import '../globals.css'

const Videos = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="maxWidthContainer">
      <VideosScreen data={videoData} type="videos" loading={loading} />;
    </div>
  )
};

export default Videos;
