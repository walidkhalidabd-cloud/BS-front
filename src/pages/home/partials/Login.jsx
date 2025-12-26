import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "../../../components/form/MyInput";
import { auth } from "../../../services/api";
import { toast } from "react-toastify";
import Loading from "../../../Components/shared/Loading";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});
    const { status, success, data, msg } = await auth.login({
      email,
      password,
    });
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("type", data.type);
      if (data.type == "admin") navigate("/admin");
      else if (data.type == "provider") navigate("/provider");
      else navigate("/");
    } else if (status === 400) {
      toast.error("بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.");
    } else if (status === 422) {
      toast.warn(msg);
      setValidationErrors(data);
    } else toast.error(msg);

    setLoading(false);
  };

  return (
    <div className="container auth-container">
      <div className="row w-100 mt-5">
        <div className="col-6 p-5 d-flex align-items-center">
          <form className="w-100"
            onSubmit={handleSubmit}            
          >
                      {loading && <Loading />}            

            <h3 className="mb-3 text-secondary text-center">تسجيل دخول</h3>
            <MyInput
              placeholder="البريد الالكتروني"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={validationErrors.email}
              col="12"
            />

            <MyInput
              type="password"
              placeholder="كلمة المرور"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={validationErrors.password}
              col="12"
            />

            <div className="text-center mt-3 ">
              <button
                className="btn btn-secondary fs-5"
                type="submit"
                disabled={loading}
              >
                {loading ? "[جاري تسجيل الدخول...]" : "تسجيل دخول"}
              </button>
              <Link className="me-2 btn bg-success-subtle fs-5" to="/">
                عودة
              </Link>
            </div>
          </form>
        </div>

        <div className="img-container col-6 d-flex d-flex align-items-center">
          <img className="w-100 rounded-5 " src="/images/login.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
