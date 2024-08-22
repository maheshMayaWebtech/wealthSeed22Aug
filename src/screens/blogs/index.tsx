"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Blog from "./blogcontent/Blog";
import "./index.css";
import Loader from "@/shared-components/loader";

const BlogsData = ({ modules, title }: { modules: any; title: string }) => {
  return (
    <>
      <div className="container-fluid">
        <section className="blogsComment">
          <div>
            <h1 className="blogsInfoHead mb-5">
              {title}
              {title && <div></div>}
            </h1>
          </div>
          <div>
            <Blog data={modules} />
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsData;
