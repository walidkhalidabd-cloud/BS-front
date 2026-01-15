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
    cost: "",
    duration: "",
    details: "",
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
    formData.append("cost", form.cost);
    formData.append("duration", form.duration);
    formData.append("details", form.details);
    
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

    const { success, data, msg, status } = await client.addOffer(
      projectId,
      formData
    );
    if (success) {
      toast.success("تم إضافة العرض");
      setForm({ cost: "", duration: "", details: "", file: null });
    } else if (status == 422) {
      setValidationErrors(data || []);
      toast.error(msg);
    } else toast.error(msg);
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
    <div className="container-fluid bg-primary newsletter pt-5 min-vh-100">
      <div className="row">
        <div className="col-md-3"></div>
        <form onSubmit={handleSubmit} className="col-md-6  p-5 ">
          <h3 className="mt-3 title fs-4 my-0 text-warning ">إضافة عرض</h3>

          <div className="mb-3">
            <label className="form-label text-white">التكلفة</label>
            <input
              type="number"
              name="cost"
              min="0"
              value={form.cost}
              onChange={handleChange}
            />
            {validationErrors.cost && (
              <small className="text-warning">{validationErrors.cost[0]}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-white">المدة (بالأيام)</label>
            <input
              type="number"
              name="duration"
              min="1"
              value={form.duration}
              onChange={handleChange}
            />
            {validationErrors.duration && (
              <small className="text-warning">
                {validationErrors.duration[0]}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label text-white">تفاصيل العرض</label>
            <textarea
              name="details"
              rows="4"
              value={form.details}
              onChange={handleChange}
            />
            {validationErrors.details && (
              <small className="text-warning">
                {validationErrors.details[0]}
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
              {loading ? "جاري الإرسال..." : "إرسال العرض"}
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
