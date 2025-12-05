import { projects as apiProjects } from "../../../services/apiReq";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import FileRow from "../../../Components/form/FileRow";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  // One simple state for all form fields
  const [formData, setFormData] = useState({
    start_date: "",
    duration: "",
    area: "",
    location_details: "",
    description: "",
    building_no: "",
    project_type_id: "",
  });

  const [filesData, setFilesData] = useState([    
  ]);
  
  // Generic input handler
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selected, name) => {
    setFormData({ ...formData, [name]: selected });
  };

  // File row handlers
  const handleFileChange = (i, e) => {
    const updated = [...filesData];
    updated[i].file = e.target.files[0];
    setFilesData(updated);
  };

  const handleFileMeta = (i, e) => {
    const { name, value } = e.target;
    const updated = [...filesData];
    updated[i][name] = value;
    setFilesData(updated);
  };

  const handleFileType = (i, selected) => {
    const updated = [...filesData];
    updated[i].type = selected;
    setFilesData(updated);
  };

  const removeFileRow = (index) => {
  setFilesData((prev) => prev.filter((_, i) => i !== index));
};

  const addFileInput = () =>
    setFilesData([...filesData, { file: null, type: "", description: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare FormData
    const fd = new FormData();

    // Convert select objects to IDs
    fd.append("project_type_id", formData.project_type_id?.id || null);

    Object.keys(formData).forEach((key) => {
      if (key !== "project_type_id") {
        fd.append(key, formData[key]);
      }
    });

    // Fake nested documents[]
    filesData.forEach((f, i) => {
      if (f.file) {
        fd.append(`documents[${i}][file]`, f.file);
        fd.append(`documents[${i}][type]`, f.type?.id || null);
        fd.append(`documents[${i}][description]`, f.description);
      }
    });

    const response = await apiProjects.add(fd);

    if (response.success && response.status === 200) {
      alert("تم إضافة مشروعك بنجاح");
      navigate("/provider/projects/1");
    } else {
      console.log(response.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    async function load() {
      const types = await apiProjects.types();
      if (types.success) setProjectTypes(types.data);

      const docs = await apiProjects.documentTypes();
      if (docs.success) setDocumentTypes(docs.data);
    }
    load();
  }, []);

  return (
    <div className="container bg-primary newsletter pt-5">
      <div className="row g-0">
        <div className="col-md-5 p-5">
          <img className="img-fluid w-100" src="/images/request.jpg" />
        </div>

        <div className="col-md-7 py-5">
          <form onSubmit={handleSubmit} className="p-4 mb-5">
            <h3 className="text-white text-center fs-3">
              بدء مشروع جديد مع
              <span className="text-secondary px-2">منصة بناءك</span>
            </h3>

            <div className="row">
              <MyInput
                name="start_date"
                type="date"
                placeholder="تاريخ البدء"
                onChange={handleChange}
              />
              <MyInput
                name="duration"
                type="number"
                placeholder="المدة بالأشهر"
                onChange={handleChange}
              />
              <MyInput
                name="area"
                type="number"
                placeholder="المساحة (km)"
                onChange={handleChange}
              />
              <MyInput
                name="location_details"
                placeholder="العنوان"
                onChange={handleChange}
              />
              <MyInput
                name="building_no"
                placeholder="رقم البناء"
                onChange={handleChange}
              />

              <div className="col-6 pt-.5 pe-2.5 text-black">
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="project_type_id"
                  value={formData.project_type_id}
                  options={projectTypes}
                  getOptionLabel={(o) => o.name}
                  getOptionValue={(o) => o.id}
                  onChange={(selected) =>
                    handleSelectChange(selected, "project_type_id")
                  }
                  placeholder="اختر نوع المشروع"
                />
              </div>

              <div className="col-12 mt-1">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="وصف المشروع..."
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={addFileInput}
            >
              <i className="fa fa-plus"></i> إضافة ملف
            </button>

            {filesData.map((file, i) => (
              <FileRow
                key={i}
                index={i}
                data={file}
                documentTypes={documentTypes}
                onFileChange={handleFileChange}
                onMetaChange={handleFileMeta}
                onTypeChange={handleFileType}
                onRemove={removeFileRow} 
              />
            ))}

            <div className="text-center">
              <button className="btn btn-secondary mt-3" type="submit">
                {loading ? "جاري الإضافة..." : "إضافة مشروع"}
              </button>

              <Link className="btn btn-primary mt-3 me-2" to="/">
                عودة
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
