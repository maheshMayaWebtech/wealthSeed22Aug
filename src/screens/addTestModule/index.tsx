"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { toastError, toastSuccess } from "@/utils/toast";

const AddTestModule: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get("/api/test-categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const categoryId = category.split(' ')[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
    formData.append('url', url);

    setIsLoading(true);
    try {
      const response = await axios.post("/api/test-module/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setTitle("");
        setCategory("");
        setDescription("");
        setUrl("");
      }
      setIsLoading(false);
      toastSuccess("Test Module added successfully");
    } catch (error) {
      console.error("Failed to create test module:", error);
      toastError('Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="add-module-container">
      <h1>Add Module</h1>
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
  );
};

export default AddTestModule;
