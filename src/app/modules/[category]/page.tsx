"use client";
import BlogsData from "@/screens/blogs";
import Loader from "@/shared-components/loader";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import '../../globals.css'

const CategoryData = () => {
  const param = useParams();
  const [modules, setModules] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/modules/get");
        const filteredData = response?.data?.filter((item: any) => {
          const categorySplit = item.category.split(" ");
          const categoryId = categorySplit[0];
          return categoryId === param.category;
        });
        setModules(filteredData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/categories");
        data?.filter((item: any) => {
          if (item._id === param.category) setTitle(item.category);
          return item._id === param.category;
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setIsLoading(false);
      }
    }

    fetchCategories();
    fetchModules();
  }, [param]);
  return (
    <div className="maxWidthContainer">
      {isLoading ? <Loader /> : <BlogsData modules={modules} title={title} />}
    </div>
  );
};

export default CategoryData;
