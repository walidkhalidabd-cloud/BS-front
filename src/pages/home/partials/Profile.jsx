import React, { useState, useEffect } from "react";
import "../../../Components/form/MyInput";
import MyInput from "../../../Components/form/MyInput";
import Select from "react-select";

import { client } from "../../../services/api";
import { roles as apiRoles } from "../../../services/api";

import { toast } from "react-toastify";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience_start: "",
    role_id: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setLoading(true);
    formData.role_id = formData.role_id?.id ?? null;
  
    const { status, success, msg } = await client.profile(formData);
    if (success) toast.success(msg);
    else if (status == 422) {
      toast.warn("بعص الحقول غير صحيحة");
      setValidationErrors(data);

    } else toast.error(msg);
    setIsEditing(false);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { success, data, msg } = await client.getProfile();
      if (success) {
        console.log(data);
        setFormData(data);
      } else {
        toast.error(msg);
      }
    };
    fetchUserData();

    async function loadRoles() {
      const { success, data, msg } = await apiRoles.list();
      if (success) setRoles(data);
      else toast.error(msg);
    }

    loadRoles();
  }, []);

  return (
    <div className="profile container-fluid  newsletter pt-5 min-vh-100">
      <div className="profile-card row p-4 bg-white mx-auto w-50 mt-5">
        <h3 className="text-primary ">الملف الشخصي</h3>

        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-item">
              <label className="active">الاسم:</label>
              <p>{formData.name}</p>
            </div>
            <div className="profile-item">
              <label className="active">البريد الإلكتروني:</label>
              <p>{formData.email}</p>
            </div>
            <div className="profile-item">
              <label className="active">تاريخ بداية الخبرة:</label>
              <p>{formData.experience_start}</p>
            </div>
            <div className="profile-item">
              <label className="active">الدور</label>
              <p>{formData.role}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              تعديل الملف الشخصي
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">الاسم</label>
              <MyInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={validationErrors.name}
                placeholder="أدخل اسمك"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <MyInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={validationErrors.email}
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience_start">تاريخ بداية الخبرة</label>
              <MyInput
                id="experience_start"
                name="experience_start"
                type="date"
                value={formData.experience_start}
                onChange={handleChange}
                error={validationErrors.experience_start}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_id">معرف الدور</label>

              <Select
                name="role_id"
                value={
                  typeof formData.role_id === "object"
                    ? formData.role_id
                    : roles.find((r) => r.id === formData.role_id) || null
                }
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

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-cancel"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
