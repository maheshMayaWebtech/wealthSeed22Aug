"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./index.css";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { categoryColors } from "@/constants/constant";
import Loader from "@/shared-components/loader";

const Modules = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(`/modules/${url}`);
  };

  return (
    <>
      <div className="container-fluid moduleHeader">
        <section className="modulesOperation">
          <div>
            <h1 className="modulesInfoHead mb-5">Modules</h1>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="categoryAllCards">
              {data.map((item: any, idx: number) => {
                return (
                  <div onClick={() => handleClick(item._id)} key={item._id}>
                    <CategoryCard
                      title={item.category}
                      description={item.description}
                      color={`${categoryColors[idx % 6]}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Modules;

export const CategoryCard = ({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="categoryMain" style={{ boxShadow: `0 0 2px 0 ${color}` }}>
      <div className="categoryTitle" style={{ backgroundColor: color }}>
        <BiSolidCategoryAlt />
        {title}
      </div>
      <div className="categoryDesc">{description}</div>
    </div>
  );
};
