import { projects as apiProjects } from "../../../services/apiReq";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject() {
  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  const [validationErrs, setValidationErrs] = useState([]);
  const [filesData, setFilesData] = useState([
    { file: null, type: "", description: "" },
  ]); // State for multiple files

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start_date: "",
    duration: "",
    area: "",
    location_details: "",
    description: "",
    building_no: "",
    project_type_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (index, e) => {
    const newFilesData = [...filesData];
    newFilesData[index].file = e.target.files[0]; // Capture the file
    setFilesData(newFilesData);
  };

  const handleFileDataChange = (index, e) => {
    const { name, value } = e.target;
    const newFilesData = [...filesData];
    newFilesData[index][name] = value; // Update the specific field for the file at the given index
    setFilesData(newFilesData);
  };

  const handleFileDataSelect = (index, selectedOption, { name }) => {
    const newFilesData = [...filesData];
    newFilesData[index][name] = selectedOption; // Update the specific field for the file at the given index
    // console.log(newFilesData)
    setFilesData(newFilesData);
  };

  const addFileInput = () => {
    setFilesData([...filesData, { file: null, type: "", description: "" }]); // Add a new file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.project_type_id = formData.project_type_id
      ? formData.project_type_id.id
      : null;

    const newFilesData = [...filesData];
    newFilesData.forEach((f) => {
      f.type = f.type ? f.type.id : null;
    });
    setFilesData(newFilesData);

    setLoading(true);

    // Create a FormData object and append the form data
    console.log(formData);
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });
    // Append each file along with its type and description
    filesData.forEach((fileData, index) => {
      if (fileData.file) {
        dataToSend.append(`documents[${index}][file]`, fileData.file);
        dataToSend.append(`documents[${index}][type]`, fileData.type);
        dataToSend.append(
          `documents[${index}][description]`,
          fileData.description
        );
      }
    });
    const { success, status, data } = await apiProjects.add(dataToSend); // Send FormData
    console.log(status);
    if (success && status == 200) {
      alert("تم إضافة مشروعك بنجاح");
      navigate('/provider/projects/1')
    }
    else if (status == 422)
      // console.log("data", data);
      console.log("بيانات غير صحيحة", data.errors);
    else console.log(data);

    setLoading(false);
  };

  useEffect(() => {
    async function load() {
      const { success, status, data } = await apiProjects.types();
      if (success && status == 200) setProjectTypes(data);
      else console.log(data);

      const result = await apiProjects.documentTypes();
      if (result.success && result.status == 200) setDocumentTypes(result.data);
      else console.log(result.data);
    }
    load();
  }, []);

  return (
    <div className="container bg-primary newsletter py-5">
      <div className="row g-0 align-items-center">
        <div className="col-md-5 ps-lg-0 text-start">
          <img className="img-fluid w-100" src="/images/request.jpg" alt="" />
        </div>
        <div className="col-md-7 py-5 newsletter-text">
          <form onSubmit={handleSubmit} className="p-4 mb-5 mt-100">
            <h3 className="text-white text-center fs-3">
              بدء مشروع جديد مع
              <span className="text-uppercase text-primary text-secondary px-2 me-2">
                .منصة بناءك.
              </span>
            </h3>
            <div className="row">
              <MyInput
                placeholder="تاريخ البدء"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
              <MyInput
                placeholder="المدة بالأشهر"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
              <MyInput
                placeholder="المساحة (km)"
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
              <MyInput
                placeholder="العنوان"
                name="location_details"
                value={formData.location_details}
                onChange={handleChange}
              />

              <MyInput
                placeholder="رقم البناء"
                name="building_no"
                value={formData.building_no}
                onChange={handleChange}
              />

              <div style={{ width: "50%" }}>
                <Select
                  className="text-muted fs-6"
                  name="project_type_id"
                  value={formData.project_type_id}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  options={projectTypes}
                  onChange={(selectedOption, { name }) =>
                    setFormData({ ...formData, [name]: selectedOption })
                  }
                  placeholder="اختر نوع المشروع"
                />
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="وصف المشروع..."
                className="col-12"
                style={{
                  padding: "10px",
                  margin: "2px 0.5% ",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  height: "2.3em",
                  width: "97%",
                }}
              />
            </div>

            <button
              type="button"
              className="m-3 btn btn-sm btn-outline-warning  border-warning "
              onClick={addFileInput}
            >
              <i className="fa fa-plus"></i>
              إضافة ملف
            </button>
            {/* File inputs for uploading multiple files */}
            {filesData.map((fileData, index) => (
              <div key={index}>
                <div className="row">
                  <div className="col-2">
                    <input
                      className="form-control my-1"
                      type="file"
                      // accept=".jpg,.jpeg,.png,.pdf" // Specify accepted file types
                      onChange={(e) => handleFileChange(index, e)}
                    />
                  </div>
                  <div className="col-3">
                    <Select
                      className="text-muted fs-6"
                      name="type"
                      value={fileData.type}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      options={documentTypes}
                      onChange={(selectedOption, { name }) => {
                        handleFileDataSelect(index, selectedOption, { name });
                      }}
                  placeholder=" نوع الملف"

                    />
                  </div>
                  <div className="col-7">
                    <input
                      className="form-control my-1"
                      type="text"
                      name="description"
                      placeholder="وصف الملف"
                      value={fileData.description}
                      onChange={(e) => handleFileDataChange(index, e)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center">
              <button
                className="mt-3 btn btn-secondary "
                type="submit"
                // disabled={loading}
              >
                {loading ? "[جاري إضافة مشروع ...]" : "إضافة مشروع"}
              </button>
              <Link className="me-2 mt-3 btn btn-primary" to="/">
                عودة
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
