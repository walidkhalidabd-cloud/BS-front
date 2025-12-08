import { projects as apiProjects } from "../../../services/apiReq";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import FileRow from "../../../Components/form/FileRow";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../Components/shared/Loading";
import { toast } from "react-toastify";

export default function AddProject() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

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

  const [filesData, setFilesData] = useState([]);

  // Helpers
  const normalizeValidationErrors = (errors) => {
    // errors is expected like: { "start_date": [...], "documents.0.type": [...], ... }
    // We convert documents.*.* into grouped objects: validationErrors["documents.0"] = { type: [...], file: [...] }
    const normalized = {};
    if (!errors || typeof errors !== "object") return normalized;

    Object.entries(errors).forEach(([key, value]) => {
      // key like: documents.0.type  OR start_date
      if (key.startsWith("documents.")) {
        // split into parts
        const parts = key.split("."); // ["documents","0","type"]
        if (parts.length >= 3) {
          const groupKey = `${parts[0]}.${parts[1]}`; // "documents.0"
          const field = parts.slice(2).join("."); // in case deeper, usually "type" or "file" or "description"
          if (!normalized[groupKey]) normalized[groupKey] = {};
          normalized[groupKey][field] = value;
        } else {
          // fallback, put as top-level
          normalized[key] = value;
        }
      } else {
        normalized[key] = value; // other fields remain
      }
    });

    return normalized;
  };

  // Generic input handler
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected, name) => {
    setFormData((prev) => ({ ...prev, [name]: selected }));
  };

  // File row handlers
  const handleFileChange = (i, e) => {
    const updated = [...filesData];
    updated[i] = { ...(updated[i] || {}), file: e.target.files[0] || null };
    setFilesData(updated);
  };

  const handleFileMeta = (i, e) => {
    const { name, value } = e.target;
    const updated = [...filesData];
    updated[i] = { ...(updated[i] || {}), [name]: value };
    setFilesData(updated);
  };

  const handleFileType = (i, selected) => {
    const updated = [...filesData];
    updated[i] = { ...(updated[i] || {}), type: selected };
    setFilesData(updated);
  };

  const removeFileRow = (index) => {
    setFilesData((prev) => prev.filter((_, i) => i !== index));
  };

  const addFileInput = () =>
    setFilesData((prev) => [
      ...prev,
      { file: null, type: "", description: "" },
    ]);

    /** **************** handleSubmit **********************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setValidationErrors({});

    // Prepare FormData
    const fd = new FormData();

    // Convert select objects to IDs (send empty string if none)
    fd.append("project_type_id", formData.project_type_id?.id ?? "");

    Object.keys(formData).forEach((key) => {
      if (key !== "project_type_id") {
        fd.append(key, formData[key] ?? "");
      }
    });

    // Always append documents fields (even if empty) so Laravel sees the keys
    // This ensures validation rules like 'documents.*.type' will trigger.
    filesData.forEach((f, i) => {
      // append file (may be null -> append empty string)
      fd.append(`documents[${i}][file]`, f?.file ?? "");
      // append type id or empty
      fd.append(`documents[${i}][type]`, f?.type?.id ?? "");
      // append description or empty
      fd.append(`documents[${i}][description]`, f?.description ?? "");
    });

    // Call API
    const response = await apiProjects.add(fd);

    if (response.success && response.status === 200) {
      toast.success("تم إضافة مشروعك بنجاح");
      navigate("/");

      // If validation errors
    } else if (response.status === 422) {
      // response.data is expected to be the errors object
      const normalized = normalizeValidationErrors(response.data || {});
      setValidationErrors(normalized);
      toast.error(response.msg);
      // Other errors
    } else
      toast.error(response.msg);
    
      setLoading(false);
  };

    /** **************** loading initial values for lists **********************/
  useEffect(() => {
    async function load() {
      setLoading(true);
      // fetch project types
      const types = await apiProjects.types();
      if (types.success) setProjectTypes(types.data);
      else toast.error(types.msg || "تعذر جلب أنواع المشاريع.");

      // fetch document types
      const docs = await apiProjects.documentTypes();
      if (docs.success) setDocumentTypes(docs.data);
      else toast.error(docs.msg || "تعذر جلب أنواع المستندات.");

      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="container-fluid bg-primary newsletter pt-5">
      <div className="row g-0">
        <div className="col-md-5 p-5">
          <img
            className="img-fluid w-100"
            src="/images/request.jpg"
            alt="cover"
          />
        </div>

        <div className="col-md-7 py-5 position-relative">
          {loading && <Loading />}

          <form onSubmit={handleSubmit} className="p-4 mb-5" noValidate>
            <h3 className="text-white text-center fs-3">
              بدء مشروع جديد مع
              <span className="text-secondary px-2"> منصة بناءك </span>
            </h3>

            <div className="row">
              <MyInput
                name="start_date"
                type="date"
                placeholder="تاريخ البدء"
                onChange={handleChange}
                error={validationErrors.start_date}
              />
              <MyInput
                name="duration"
                type="number"
                placeholder="المدة بالأشهر"
                onChange={handleChange}
                error={validationErrors.duration}
              />
              <MyInput
                name="area"
                type="number"
                placeholder="المساحة (km)"
                onChange={handleChange}
                error={validationErrors.area}
              />
              <MyInput
                name="location_details"
                placeholder="العنوان"
                onChange={handleChange}
                error={validationErrors.location_details}
              />
              <MyInput
                name="building_no"
                placeholder="رقم البناء"
                onChange={handleChange}
                error={validationErrors.building_no}
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
                {validationErrors.project_type_id && (
                  <small className="text-warning">
                    {validationErrors.project_type_id[0]}
                  </small>
                )}
              </div>

              <div className="col-12 mt-1">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="وصف المشروع..."
                  onChange={handleChange}
                />
                {validationErrors.description && (
                  <small className="text-warning">
                    {validationErrors.description[0]}
                  </small>
                )}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={addFileInput}
            >
              <i className="fa fa-plus"></i> إضافة ملف
            </button>

            {/* Files rows */}
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
                errors={validationErrors[`documents.${i}`]} // pass per-row errors
              />
            ))}

            <div className="text-center">
              <button
                className="btn btn-secondary mt-3"
                type="submit"
                disabled={loading}
              >
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
