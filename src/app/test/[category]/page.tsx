"use client";
import Loader from "@/shared-components/loader";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../globals.css";

const TestCategoryWiseData = () => {
  const param = useParams();
  const [modules, setModules] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/test-module");
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
        const { data } = await axios.get("/api/test-categories");
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

  const handleButtonClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="maxWidthContainer">
      <div className="text-3xl my-10 uppercase">{title}</div>
      <div className="test-edit-container">
        {isLoading ? (
          <Loader />
        ) : modules.length === 0 ? (
          <div className="text-center text-gray-500 text-3xl">No data to show</div>
        ) : (
          <div>
            {modules.map((testModule) => (
              <div key={testModule.categoryId} className="test-edit-card">
                <div className="test-edit-card-content">
                  <h2 className="test-edit-title">{testModule.title}</h2>
                  <p className="test-edit-description">
                    {testModule.description}
                  </p>
                </div>
                <div className="test-edit-buttons">
                  <button
                    onClick={() => handleButtonClick(testModule.url)}
                    className="test-edit-button test-edit-open-button"
                  >
                    Open Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCategoryWiseData;
