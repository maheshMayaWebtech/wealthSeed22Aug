"use client";
import VideosScreen from "@/screens/videos";
import axios from 'axios';
import { useEffect, useState } from "react";

const Videos: React.FC = () => {
    const [videodata, setVideoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/videos');
                setVideoData(response.data);
            } catch (error) {
                console.log('Error fetching video data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <VideosScreen data={videodata} type={"admin"} />
        </>
    );
};

export default Videos;
