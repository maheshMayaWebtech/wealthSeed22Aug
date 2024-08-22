import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { toastError, toastSuccess, toastWarning } from "@/utils/toast";

const CategoryPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [editOrAdd, setEditOrAdd] = useState({
    title: "Add New",
    button: "Add",
  });
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/categories");
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post("/api/categories", {
        category: newCategory,
        description,
      });
      setShowModal(false);
      setNewCategory("");
      setDescription("");
      toastSuccess("Added Category");

      fetchCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const request = await axios.post("/api/categories/delete", { id });
      if (request.status) {
        fetchCategories();
      }
      toastSuccess("Deleted Successfully");
    } catch (error: any) {
      const message = error?.response?.data?.message;
      message ? toastWarning(message) : toastError("Something went wrong");
    }
  };

  const handleEditClick = (item: any) => {
    setEditOrAdd({ title: "Edit", button: "Save" });
    setShowModal(true);
    setNewCategory(item.category);
    setDescription(item.description);
    setEditItem(item);
  };
  const handleAddCategoryButton = () => {
    setShowModal(true);
    setNewCategory("");
    setDescription("");
    setEditOrAdd({ title: "Add New", button: "Add" });
  };
  const handleEditCategory = async () => {
    try {
      await axios.post("/api/categories/edit", {
        ...editItem,
        category: newCategory,
        description,
      });
      setShowModal(false);
      setNewCategory("");
      setDescription("");
      toastSuccess("Category Edited Successfully");

      fetchCategories();
    } catch (error) {
      console.error("Failed to Edit category:", error);
    }
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    editOrAdd.button === 'Add' ? handleAddCategory() : handleEditCategory()
  }

  return (
    <div className="category-container">
      <button className="category-add-button" onClick={handleAddCategoryButton}>
        Add Category
      </button>
      <div className="category-content">
        {categories.map((item, index) => (
          <div key={item._id} className="category-card">
            <div className="category-title-main">
              <div className="category-card-header">
                <div className="category-item-number">{index + 1}.</div>
                <div className="category-item-title">{item.category}</div>
              </div>
              <div className="deleteButtonCategory">
                <button
                  className="deleteButtonSmall editButtonCat"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="deleteButtonSmall"
                >
                  {"Delete"}
                </button>
              </div>
            </div>
            <div className="category-item-description">{item.description}</div>
          </div>
        ))}
      </div>
      {showModal && (
        <form onSubmit={handleFormSubmit}>
          <div className="category-modal">
            <div className="category-modal-content">
              <h2>{editOrAdd.title} Category</h2>
              <label>
                Category Name:
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="categoryAddTextArea"
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={description}
                  style={{ height: "100px" }}
                  onChange={(e) => setDescription(e.target.value)}
                  className="categoryAddTextArea categoryAddTextAreaPara"
                  required
                />
              </label>
              <div className="category-modal-buttons">
                <button
                  className="category-modal-button category-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="category-modal-button" type="submit">
                  {editOrAdd.button}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CategoryPage;
