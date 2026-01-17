import { useEffect, useState } from "react";
import { client } from "../../../services/api";
import { documentTypes as apiDocumentTypes } from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import FileRow from "../../../Components/form/FileRow";

export default function AddOffer() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [filesData, setFilesData] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  const navigate = useNavigate();           

  const [form, setForm] = useState({
    title: "",
    description: "",
  });


  const handleGoBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    
    filesData.forEach((f, i) => {
      // append file (may be null -> append empty string)
      formData.append(`documents[${i}][file]`, f?.file ?? "");
      // append type id or empty
      formData.append(`documents[${i}][type]`, f?.type?.id ?? "");
      // append description or empty
      formData.append(`documents[${i}][description]`, f?.description ?? "");
    });
    if (form.file) {
      formData.append("file", form.file);
    }

    const { success, data, msg, status } = await client.addStep(
      projectId,
      formData
    );
    if (success) {
      toast.success(msg);
      setForm({ cost: "", duration: "", details: "", file: null });
    } else if (status == 422) {
      setValidationErrors(data || []);
      toast.error(msg);
    } else toast.error(msg);
    setForm({ title: "", description: "" });
    setLoading(false);
  };

  useEffect(() => {
    async function load() {
      setLoading(true);    
      // fetch document types
      const docs = await apiDocumentTypes.list();
      if (docs.success) setDocumentTypes(docs.data);
      else toast.error(docs.msg || "تعذر جلب أنواع المستندات.");

      setLoading(false);
    }
    load();
  }, []);
  return (
    <div className="container-fluid bg-primary newsletter pt-5 mt-3 min-vh-100">
      <div className="row">
        <div className="col-md-3"></div>
        <form onSubmit={handleSubmit} className="col-md-6   p-5 ">
          <h3 className="mt-3 title fs-4 my-0 text-warning pb-3">إضافة خطوة</h3>

          <div className="mb-3">
            <label className="form-label text-white d-block">العنوان</label>
            <input
              name="title"
              min="0"
              value={form.title}
              onChange={handleChange}
            />
            {validationErrors.title && (
              <small className="text-warning">{validationErrors.title[0]}</small>
            )}
          </div>
          
          <div className="mb-3">
            <label className="form-label text-white">وصف </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
            />
            {validationErrors.description && (
              <small className="text-warning">
                {validationErrors.description[0]}
              </small>
            )}
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
              errors={validationErrors[`documents.${i}`]} // pass per-row errors
            />
          ))}

          <div className="text-center">
            <button
              className="btn btn-secondary fw-bold fs-6"
              type="submit"
              disabled={loading}
            >
              {loading ? "جاري الإرسال..." : "حفظ الخطوة"}
            </button>

            <button
              type="button"
              className="btn btn-primary me-2 fw-bold fs-6 "
              onClick={handleGoBack}
            >
              عودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
