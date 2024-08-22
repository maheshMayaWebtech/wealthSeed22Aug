import axios from "axios";
import "./Blog.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";

const Blog = ({
  data,
  type,
  handleModuleSelect,
}: {
  data: any;
  type?: string;
  handleModuleSelect?: any;
}) => {
  const router = useRouter();
  const [moduleData, setModuleData] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryColors = [
    "#77b4f2",
    "#f2c8ca",
    "#f0b32a",
    "#b6adf4",
    "#b2d8e6",
    "#b2e6bc",
  ];

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
    setModuleData(data);
  }, [data]);

  const handleClick = (id: number) => {
    router.push(`/blogs/${id}`);
  };
  const handleDelete = async (id: number) => {
    const request = await axios.post("/api/modules/delete", { id });
    const filteredData = moduleData?.filter((item: any) => item._id !== id);
    if (request.status) {
      setModuleData(filteredData);
      toastSuccess("Deleted Successfully");
    } else {
      toastError("Something went wrong");
    }
  };
  const transformedData: { [key: string]: string } = {};
  categories.forEach((item: any) => {
    transformedData[item._id] = item.category;
  });


  return (
    <div className={`moduleCategoryCards ${type === 'dashboard' && 'moduleCardAdmin'}`}>
      {moduleData?.map((item: any, id: number) => {
        return (
          <section className="moduleCategoryCardSection" key={id}>
            <Image src={item.image} width={600} height={100} alt="image" className="moduleImage" />
            <h3
              className="blogTitle"
            >
              <div onClick={() => handleClick(item._id)} className="titleLink">
                {item.title}{" "}
                <span style={{ fontSize: "15px", fontWeight: "500" }}>
                  {type === "dashboard" &&
                    `( ${transformedData[`${item.categoryId}`]} )`}
                </span>
              </div>
            </h3>
            <p className="blogContent">{item.description}</p>
            <div className="bothButtons">
              <button
                onClick={() => handleClick(item._id)}
                className="moduleReadMore"
                style={{
                  color: `${categoryColors[id % 6]}`,
                  border: `2px solid ${categoryColors[id % 6]}`,
                }}
              >
                Read More
              </button>
              {type === "dashboard" && (
                <div className="dashboardButtons">
                  <button
                    onClick={() => handleModuleSelect(item)}
                    className="moduleReadMore moduleDelete moduleEdit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="moduleReadMore moduleDelete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Blog;
