import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import EditTestModule from "../editTestModule";
import { toastSuccess } from "@/utils/toast";
import "react-toastify/dist/ReactToastify.css";

const TestModulesShow = () => {
  const [testData, setTestData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchTestModules() {
      try {
        const { data } = await axios.get("/api/test-module");
        setTestData(data);
      } catch (error) {
        console.error("Failed to fetch test modules:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTestModules();
  }, [showModal]);

  const handleButtonClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleEdit = (testModule: any) => {
    setSelectedData(testModule);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.post(`/api/test-module/delete`, {
        id
      });
      setTestData((prevData) => prevData.filter((module) => module._id !== id));
      toastSuccess("Test Deleted successfully");
    } catch (error) {
      console.error("Failed to delete test module:", error);
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!testData.length) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <div className="test-edit-container">
      {testData.map((testModule,idx) => (
        <div key={idx} className="test-edit-card">
          <div className="test-edit-card-content">
            <h2 className="test-edit-title">{testModule.title}</h2>
            <p className="test-edit-description">{testModule.description}</p>
          </div>
          <div className="test-edit-buttons">
            <button
              onClick={() => handleButtonClick(testModule.url)}
              className="test-edit-button test-edit-open-button"
            >
              Open Test
            </button>
            <button
              onClick={() => handleEdit(testModule)}
              className="test-edit-button test-edit-edit-button"
              style={{backgroundColor: '#ca8a04'}}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(testModule._id)}
              className="test-edit-button test-edit-delete-button "
              style={{backgroundColor: 'maroon'}}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {showModal && (
        <EditTestModule
          handleCancel={() => setShowModal(false)}
          data={selectedData}
        />
      )}
    </div>
  );
};

export default TestModulesShow;
