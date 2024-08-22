import Blog from "@/screens/blogs/blogcontent/Blog";
import EditModule from "@/screens/moduleEditForm";
import axios from "axios";
import { useEffect, useState } from "react";

const Modules: React.FC = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get("/api/modules/get");
        setModules(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchModules();
  }, [openModal]);

  const handleModuleSelect = (item: any) => {
    setOpenModal(true);
    setSelectedModule(item);
  };

  const handleCancel = () => {
    setOpenModal(false)
  }

  return (
    <div className="settings-panel">
      <h3
        style={{ marginLeft: "10px", marginBottom: "30px", fontSize: "40px" }}
      >
        All Modules
      </h3>
      <Blog
        data={modules}
        type={"dashboard"}
        handleModuleSelect={handleModuleSelect}
      />
      {openModal && <EditModule data={selectedModule} handleCancel={handleCancel} />}
    </div>
  );
};

export default Modules;
