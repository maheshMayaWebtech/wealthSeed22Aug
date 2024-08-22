"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { toastError, toastSuccess } from "@/utils/toast";
import { IoMdClose } from "react-icons/io";

const EditTestModule = ({ data, handleCancel }: { data: any, handleCancel: any }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState(data?.title || "");
  const [category, setCategory] = useState(data?.category || "");
  const [description, setDescription] = useState(data?.description || "");
  const [url, setUrl] = useState(data?.url || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(data?.title);
    setCategory(data?.category);
    setDescription(data?.description);
    setUrl(data?.url);
    async function fetchCategories() {
      try {
        const { data } = await axios.get("/api/test-categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const categoryId = category.split(" ")[0];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("url", url);
    formData.append("_id", data._id);

    setIsLoading(true);
    try {
      const response = await axios.post("/api/test-module/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        setTitle("");
        setCategory("");
        setDescription("");
        setUrl("");
        handleCancel()
      }
      setIsLoading(false);
      toastSuccess("Module added successfully");
    } catch (error) {
      console.error("Failed to create module:", error);
      toastError("Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="testeditmodule-main">
      <div className="add-module-container">
      <div className="edit-form-top-section">
          <h2>Edit Test</h2>
          <p onClick={() => handleCancel()}>
            <IoMdClose style={{ fontSize: "25px" }} />
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Module Title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((item: any) => (
                <option key={item._id} value={`${item._id} ${item.category}`}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Google Form URL</label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Google Form URL"
              required
            />
          </div>
          <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default EditTestModule;
