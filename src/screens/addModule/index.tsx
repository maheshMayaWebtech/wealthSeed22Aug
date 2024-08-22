"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from 'next/dynamic';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Dynamically import ReactQuill with no SSR 
// ----   Dont delete   -----
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { toastError, toastSuccess } from "@/utils/toast";

const AddModule: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get("/api/categories");
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
    formData.append('content', content);
    formData.append('categoryId', categoryId);
    if (image) {
      formData.append('image', image);
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/modules/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setTitle("");
        setCategory("");
        setDescription("");
        setContent("");
        setImage(null);
      }
      setIsLoading(false);
      toastSuccess("Module added successfully");
    } catch (error) {
      console.error("Failed to create module:", error);
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
          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
              ],
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "align",
              "color",
              "background",
            ]}
            theme="snow"
          />
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  );
};

export default AddModule;
