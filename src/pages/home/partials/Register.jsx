import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../services/api";

import { roles as apiRoles } from "../../../services/api";
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
      experience_start: '',
      role_id: null,
    },
  };
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState(userTypes[userType]);

  const userTypesRadio = [
    { label: "زبون", value: "customer" },
    { label: "عميل", value: "client" },
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

  /********* Submit ***********/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});
    formData.role_id = formData.role_id?formData.role_id.id : null;
    console.log(formData);
    const { status, success, data, msg } = await auth.register(formData);
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      if (data.type == "client") navigate("/client");
      else navigate("/");
    } else if (status == 422) {
      toast.warn("بعص الحقول غير صحيحة");
      setValidationErrors(data);
      console.log(data);
    } else toast.error(msg);

    setLoading(false);
  };
  //تحميل
  useEffect(() => {
    async function loadRoles() {
      const { success, data, msg } = await apiRoles.list();
      if (success) setRoles(data);
      else toast.error(msg);
      setLoading(false);
    }
    loadRoles();
  }, []);

  return (
    <div className="container auth-container">
      <div className="row w-100 mt-5">
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
                      {validationErrors.role_id}
                    </small>
                  )}
                </div>
              </>
            )}
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
