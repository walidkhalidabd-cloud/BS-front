import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../services/api";
import { documentTypes as apiDocumentTypes } from "../../../services/api";
import { roles as apiRoles } from "../../../services/api";

import FileRow from "../../../Components/form/FileRow";

import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import Radio from "../../../components/form/Radio";
import { toast } from "react-toastify";
import Loading from "../../../Components/shared/Loading";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [filesData, setFilesData] = useState([]);

  const userTypes = {
    customer: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      type: "customer",
    },
    client: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      type: "client",
      experience_start: "",
      role_id: null,
    },
  };
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState(userTypes[userType]);

  const userTypesRadio = [
    { label: "زبون", value: "customer" },
    { label: "مزود", value: "client" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    setFormData(userTypes[selectedType]); // إعادة تعيين البيانات بناءً على النوع الجديد
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
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

  /********* Submit ***********/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    const fd = new FormData();

    if(userType == "client")
      fd.append("role_id", formData.role_id?.id ?? "");

    Object.keys(formData).forEach((key) => {
      if (key !== "role_id") {
        fd.append(key, formData[key] ?? "");
      }
    });

    // fd.forEach((value, key) => {
    //       console.log(key, value);
    //     });

    filesData.forEach((f, i) => {
      fd.append(`documents[${i}][file]`, f?.file ?? "");
      fd.append(`documents[${i}][type]`, f?.type?.id ?? "");
      fd.append(`documents[${i}][description]`, f?.description ?? "");
    });

    const { status, success, data, msg } = await auth.register(fd);
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      if (data.type == "client") navigate("/client");
      else navigate("/");
    } else if (status == 422) {
      toast.warn("بعص الحقول غير صحيحة");
      console.log(data);
      setValidationErrors(data);

      console.log(data);
    } else toast.error(msg);

    setLoading(false);
  };
  //تحميل
  useEffect(() => {
    setLoading(true);

    async function loadRoles() {
      const { success, data, msg } = await apiRoles.list();
      if (success) setRoles(data);
      else toast.error(msg);
    }
    async function loadDocumentTypes() {
      const docs = await apiDocumentTypes.list();
      if (docs.success) setDocumentTypes(docs.data);
      else toast.error(docs.msg || "تعذر جلب أنواع المستندات.");

      setLoading(false);
    }
    loadRoles();
    loadDocumentTypes();
  }, []);

  return (
    <div className="container auth-container">
      <div className="row auth-row w-100 mt-5">
        <div className="col-6 p-5 d-flex align-items-center">
          <form className="w-100" onSubmit={handleSubmit}>
            {loading && <Loading />}
            <h3 className="mb-3 text-secondary text-center">إنشاء حساب</h3>
            <Radio
              label="نوع المستخدم"
              tuples={userTypesRadio}
              name="type"
              formDataValue={formData.type}
              onChange={handleUserTypeChange}
            />
            <MyInput
              type="email"
              placeholder="البريد الالكتروني"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
              col="12"
            />
            <MyInput
              placeholder="الاسم"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={validationErrors.name}
              col="12"
            />
            <MyInput
              type="password"
              placeholder=" كلمة السر"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
              col="12"
            />
            <MyInput
              type="password"
              placeholder=" تأكيد كلمة السر"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              error={validationErrors.password_confirmation}
              col="12"
            />

            {formData.type === "client" && (
              <>
                <MyInput
                  placeholder="تاريخ بدءالعمل"
                  type="date"
                  name="experience_start"
                  value={formData.experience_start}
                  onChange={handleChange}
                  error={validationErrors.experience_start}
                  col="12"
                />

                <div className="mb-3">
                  <div className="text-bg-dark select-multiple">
                    <Select
                      name="role_id"
                      value={formData.role_id}
                      options={roles}
                      onChange={handleSelectChange}
                      getOptionLabel={(o) => o.name}
                      getOptionValue={(o) => o.id}
                      placeholder="اختر دورك"
                    />
                  </div>
                  {validationErrors.role_id && (
                    <small className="text-warning">
                      {validationErrors.role_id[0]}
                    </small>
                  )}
                </div>
              </>
            )}
            {formData.type === "client" && (
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={addFileInput}
              >
                <i className="fa fa-plus"></i> إضافة ملف
              </button>
            )}

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

            <div className="text-center mt-3 ">
              <button
                className="btn btn-secondary fs-5"
                type="submit"
                disabled={loading}
              >
                {loading ? "[جاري إنشاء الحساب...]" : "إنشاء حساب"}
              </button>
              <Link className="me-2 btn bg-success-subtle fs-5" to="/">
                عودة
              </Link>
            </div>
            <div className="text-center mt-3">
              <Link to="/login" className="text-warning">
                لديك حساب
              </Link>
            </div>
          </form>
        </div>

        <div className="col-6 d-flex d-flex align-items-center img-container">
          <img className="w-100 rounded-5" src="/images/login.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
