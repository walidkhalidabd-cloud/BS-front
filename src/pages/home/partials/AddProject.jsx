import { projects as apiProjects } from "../../../services/api";
import Select from "react-select";
import MyInput from "../../../components/form/MyInput";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProject() {
  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start_date: "",
    duration: "",
    area: "",
    location: "",
    description: "",
    building_no: "",
    project_type_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);    
    // console.log(formData);
    try {
      const data = await apiProjects.add(formData);
      alert('تم إضافة مشروعك بنجاح')
      navigate("/");
    } catch (err) {
      alert("register failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const types = await apiProjects.type();
        console.log(types);
        setProjectTypes(types);
      } catch (err) {
        console.error(err);
        setError(err.message || "خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container bg-primary newsletter py-5">
      <div className="row g-0 align-items-center">
        <div className="col-md-5 ps-lg-0 text-start">
          <img className="img-fluid w-100" src="/images/request.jpg" alt="" />
        </div>
        <div className="col-md-7 py-5 newsletter-text" >
          <form
            onSubmit={handleSubmit}
            className=" p-4 mb-5 mt-100"
          >
            <h3 className="text-white text-center fs-3">
              بدء مشروع جديد مع
              <span className="text-uppercase text-primary text-secondary px-2 me-2">
                .منصة بناءك.
              </span>
            </h3>

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
              placeholder="المساحة"
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
            <MyInput
              placeholder="العنوان"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <div style={{ marginBottom: "10px" }}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="وصف المشروع..."
                // style={{ width: "100%", padding: "8px", minHeight: "80px" }}
              />
            </div>

            <MyInput
              placeholder="رقم البناء"
              name="building_no"
              value={formData.building_no}
              onChange={handleChange}
            />

            <Select
              className="text-muted fs-6"
              name="project_type_id"
              value={formData.project_type_id}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={projectTypes}
              onChange={handleSelectChange}
              placeholder="اختر نوع المشروع"
            />
            <div className="text-center">
              <button
                className="mt-3 btn btn-secondary "
                type="submit"
                disabled={loading}
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
