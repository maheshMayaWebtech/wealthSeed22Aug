import React from "react";
import "./index.css";
import Image from "next/image";
import Link from "next/link";
import playButtonSvg from "../../../public/Images/playbutton.svg";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoEditModule from '../../screens/videoEditModule'
import "react-toastify/dist/ReactToastify.css";

import { toastSuccess } from "@/utils/toast";
import { usePathname } from "next/navigation";

export const SharedComp = ({ type, data }: { type?: string; data: any }) => {
  const pathname = usePathname();
  const homePath = pathname === "/";
  const [tempdata, setTempData] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({})
  const colorArr = [
    "magenta",
    "#2BEE14",
    "#F4F80C",
    "#0CB8F8",
    "#7D00DE",
    "#002CDC",
  ];
  useEffect(() => {
    fetchData()
  }, [data, openModal]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/videos");
      setTempData(response.data);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const deleteItem = async (id: any) => {
    try {
      const response = await axios.delete(`/api/videos/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id },
      });

      if (response.status === 200) {
        const newTodos = tempdata.filter(
          (item: { _id: any }) => item._id !== id
        );
        setTempData(newTodos);
        toastSuccess("Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };
  const handleEditClick = (val: any) => {
    setSelectedData(val);
    setOpenModal(true)
  }

  return (
    <>
      {(type === "home-video" ? data : tempdata)?.map((values: any, id: number) => {
        const youtubeUrl = values.youtubeUrl || "https://youtube.com";
        const chapterLength = values.chapter.length
        return (
          <div
            className={`col-lg-4 mb-5 ${homePath && `cardHomePageStyle`}`}
            key={values._id}
          >
            <div
              className="upperCountingArea"
              style={{ borderTopColor: `${colorArr[id % 6]}` }}
            >
              {type !== "modules" && (
                <div className="box video-thumb">
                  <Link
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={values.image}
                      alt="videothumb"
                      className={`operationlogo ${type === 'home-video' && 'operationLogoHomePage'}`}
                      width={500}
                      height={500}
                    />
                    <Image
                      src={playButtonSvg}
                      alt="playbutton"
                      className="playButtonLogo"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              )}
              <h3 className="moduleTitle">
                {!homePath && <span className="moduleNumber">{id + 1}</span>}
                <Link
                  href={youtubeUrl}
                  className="areaIntro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {values.title}
                </Link>
              </h3>
              {!homePath && (
                <>
                {chapterLength ? <p className="chapterCount">{values.chapter} Chapters</p> : null}
                </>
              )}
              {!homePath && (
                <p className="discription mb-3">{values.description}</p>
              )}
              <p className="modulesOpts">
                <Link
                  href={youtubeUrl}
                  className="innerModuleCont"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Module
                </Link>
              </p>
            </div>
            {type === 'admin' && <div className="adminSectionButtons">
              <FaTrash
                className="trashData"
                onClick={() => deleteItem(values._id)}
              />
              <button onClick={()=> handleEditClick(values)}>Edit</button>
            </div>}
          </div>
        );
      })}
    {
      openModal && (
        <VideoEditModule handleCancel={()=> setOpenModal(false)} data={selectedData} />
      )
    }
    </>
  );
};
