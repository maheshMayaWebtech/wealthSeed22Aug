"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./index.css";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toast";
import "react-toastify/dist/ReactToastify.css";

const VideoForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    chapter: "",
    description: "",
    image: null as File | null,
    youtubeUrl: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    youtubeUrl: "",
  });

  const validate = () => {
    const newErrors = { ...errors };
    let hasErrors = false;

    if (!formData.title) {
      newErrors.title = "Title is required";
      hasErrors = true;
    } else {
      newErrors.title = "";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      hasErrors = true;
    } else {
      newErrors.description = "";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
      hasErrors = true;
    } else {
      newErrors.image = "";
    }

    if (!formData.youtubeUrl) {
      newErrors.youtubeUrl = "YouTube URL is required";
      hasErrors = true;
    } else {
      newErrors.youtubeUrl = "";
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validate();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      validate();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const form = new FormData();

      form.append("title", formData.title);
      form.append("chapter", formData.chapter);
      form.append("description", formData.description);
      form.append("youtubeUrl", formData.youtubeUrl);

      if (formData.image) {
        form.append("image", formData.image);
      }
      try {
        const response = await axios.post("/api/videos/upload", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = response.data;
        toastSuccess("Video uploaded successfully!")
        setFormData({
          title: "",
          chapter: "",
          description: "",
          image: null,
          youtubeUrl: "",
        });
        setErrors({
          title: "",
          description: "",
          image: "",
          youtubeUrl: "",
        });
      } catch (error) {
        toastError('Something went wrong')
        console.error("Error uploading video:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="chapter">Chapter:</label>
            <input
              type="text"
              id="chapter"
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="youtubeUrl">YouTube URL:</label>
            <input
              type="text"
              id="youtubeUrl"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
            />
            {errors.youtubeUrl && <p className="error">{errors.youtubeUrl}</p>}
          </div>
        </div>

        <button className="buttonVideoUpload" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
