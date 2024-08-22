"use client";

import React, { useEffect, useState } from "react";
import Modules from "@/screens/module";
import axios from "axios";
import '../globals.css'

export default function ModulesRoute() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="maxWidthContainer">
        <Modules data={categories} isLoading={isLoading} />
    </div>
  );
}
