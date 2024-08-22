"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import "../globals.css";
import Loader from "@/shared-components/loader";

export default function PageTestCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get("/api/test-categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/test/${id}`);
  };

  return (
    <div className="maxWidthContainer min-h-screen mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-10 mt-10">All Test Categories</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleCardClick(category._id)}
                  className="group bg-white shadow-lg rounded-lg p-6 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {category.category}
                    </h2>
                    <FaArrowRight className="text-blue-500 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-32 text-xl sm:text-3xl">
              Currently No Test Category To Show
            </div>
          )}
        </>
      )}
    </div>
  );
}
