"use client"
import { FC, useEffect, useState } from 'react';
import './EducationVideo.css';
import axios from 'axios';
import VideosScreen from '@/screens/videos';

const EducationVideo: FC = () => {
    const [videodata, setVideoData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/videos');
                setVideoData(response.data);
            } catch (error) {
                console.log('Error fetching video data:', error);
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <VideosScreen data={videodata.slice(0,4)} type={"home-video"} loading={false} />
        </>
    )
}

export default EducationVideo;